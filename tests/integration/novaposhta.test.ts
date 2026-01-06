import NovaPoshta from '@providers/nova_poshta';
import { TrackingStatusCode } from '@shared/types/novaposhta.types';
// Импортируем фикстуру
import mockResponse from '../fixtures/np_success.json';

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