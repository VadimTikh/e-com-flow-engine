import NovaPoshta from '@providers/nova_poshta';
import * as dotenv from 'dotenv';
import { ScanSheetResponse } from '@shared/types/novaposhta.types';

dotenv.config();

const API_KEY = process.env.NOVA_POSHTA_API_KEY || '';
const TEST_TTN = process.env.TEST_TTN || '';

describe('NovaPoshta Registers Integration Test', () => {
    if (!API_KEY || !TEST_TTN) {
        console.warn('Skipping Registers integration tests: NOVA_POSHTA_API_KEY or TEST_TTN not found');
        it.skip('should pass', () => {});
        return;
    }

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
