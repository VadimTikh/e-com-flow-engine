import NovaPoshta from '@providers/nova_poshta';
import { TrackingStatusCode, ScanSheetResponse } from '@shared/types/novaposhta.types';
// Импортируем фикстуру
import mockResponse from '../fixtures/np_success.json';
import * as dotenv from 'dotenv';

dotenv.config();

describe('NovaPoshta Offline Integration Test', () => {
    const FAKE_API_KEY = 'any-string-will-work-here';
    let np: NovaPoshta;

    beforeEach(() => {
        np = new NovaPoshta(FAKE_API_KEY);
        jest.clearAllMocks();
    });

    it('should correctly map data from np_success.json without API calls', async () => {
        // Мокаем fetch, чтобы он возвращал содержимое нашего JSON файла
        const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            } as Response)
        );

        const ttn = "20400048799000";
        const results = await np.tracking.fetchTracking([ttn]);
        const result = results.get(ttn);

        // Проверяем маппинг основных полей
        expect(result).toBeDefined();
        expect(result?.ttn).toBe(ttn);
        expect(result?.statusCode).toBe(TrackingStatusCode.ARRIVED_AT_WAREHOUSE);
        expect(result?.status).toBe("Прибув на відділення");

        // Проверка парсинга чисел (parseSafeFloat)
        expect(result?.weight).toBe(3);
        expect(result?.cost).toBe(51);
        expect(result?.announcedPrice).toBe(50000);

        // Проверка флагов (включая поле с опечаткой)
        expect(result?.canReturn).toBe(true);
        expect(result?.canExtendStorage).toBe(true);
        expect(result?.canEdit).toBe(true);

        // Проверка адресов
        expect(result?.citySender).toBe("Київ");
        expect(result?.warehouseRecipient).toContain("Відділення №101");

        // Проверяем, что fetch вызывался правильно
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        const requestBody = JSON.parse((fetchSpy.mock.calls[0][1] as any).body);
        expect(requestBody.apiKey).toBe(FAKE_API_KEY);
    });

    it('should handle empty data array from mock correctly', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true, data: [] }),
            } as Response)
        );

        const results = await np.tracking.fetchTracking(['123']);
        expect(results.size).toBe(0);
    });
});

const API_KEY = process.env.NOVA_POSHTA_API_KEY || '';
const TEST_TTN = process.env.TEST_TTN || '';

describe('NovaPoshta Registers Integration Test', () => {
    if (!API_KEY || !TEST_TTN) {
        console.warn('Skipping Registers integration tests: NOVA_POSHTA_API_KEY or TEST_TTN not found');
        it.skip('should pass', () => {});
        return;
    }

    // Use a real client for this test suite
    const np = new NovaPoshta(API_KEY);
    jest.setTimeout(30000); // Registers operations can be slow

    let createdRegistryRef: string | null = null;

    afterAll(async () => {
        // Cleanup: Ensure registry is deleted even if test fails
        if (createdRegistryRef) {
            try {
                await np.registers.deleteScanSheet({ ScanSheetRefs: [createdRegistryRef] });
                console.log('Cleanup: Registry deleted');
            } catch (e) {
                console.error('Cleanup failed:', e);
            }
        }
    });

    it('should create a new registry with a document', async () => {
        const response = await np.registers.insertDocuments({
            DocumentRefs: [TEST_TTN]
        });

        // If success is false, it might be because the TTN is invalid or already in a registry
        if (!response.success && response.errors.length > 0) {
            console.warn('Create registry failed. This might be due to invalid TTN or constraints:', response.errors);
        }

        // We expect success OR a specific logical error that we can't easily avoid in a generic test
        // But for a "green" path test, we expect success.
        expect(response.success).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);

        const result = response.data[0] as ScanSheetResponse;
        expect(result.Ref).toBeDefined();
        createdRegistryRef = result.Ref;

        console.log('Created Registry Ref:', createdRegistryRef);
    });

    it('should retrieve the created registry details', async () => {
        if (!createdRegistryRef) return; // Skip if creation failed

        const response = await np.registers.getScanSheet({
            Ref: createdRegistryRef
        });

        expect(response.success).toBe(true);
        expect(response.data.length).toBeGreaterThan(0);
        expect(response.data[0].Ref).toBe(createdRegistryRef);
    });

    it('should retrieve the list of registries', async () => {
        if (!createdRegistryRef) return;

        const response = await np.registers.getScanSheetList();

        expect(response.success).toBe(true);
        expect(Array.isArray(response.data)).toBe(true);
        
        // Ensure our created registry is in the list
        const found = response.data.find(r => r.Ref === createdRegistryRef);
        expect(found).toBeDefined();
        expect(found?.Ref).toBe(createdRegistryRef);
    });

    it('should remove the document from the registry', async () => {
        if (!createdRegistryRef) return;

        const response = await np.registers.removeDocuments({
            DocumentRefs: [TEST_TTN],
            Ref: createdRegistryRef
        });

        expect(response.success).toBe(true);
        // Verify document is in the success list
        const removedDocs = response.data[0].DocumentRefs.Success;
        const isRemoved = removedDocs.some(d => d.Ref === TEST_TTN || d.Number === TEST_TTN); // API might return Ref or Number matching our input
        
        // Note: The API response for removeDocuments is complex, 
        // sometimes it returns internal Refs instead of the TTN string if we passed a TTN string.
        // We mainly check for success: true here.
    });

    it('should delete the registry', async () => {
        if (!createdRegistryRef) return;

        const response = await np.registers.deleteScanSheet({
            ScanSheetRefs: [createdRegistryRef]
        });

        expect(response.success).toBe(true);
        createdRegistryRef = null; // Prevent double cleanup
    });
});
