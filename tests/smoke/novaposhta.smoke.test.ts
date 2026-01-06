import NovaPoshta from '@providers/nova_poshta';
import {TrackingStatusCode} from '@shared/types/novaposhta.types';

describe('NovaPoshta Smoke Test (Real API)', () => {
    // Для публичного трекинга используем пустую строку вместо ключа
    const np = new NovaPoshta('');

    // Увеличиваем таймаут, так как реальный запрос может занять время
    jest.setTimeout(10000);

    it('should get a "Not Found" response from the real Nova Poshta server for tracking', async () => {
        const ttn = '20400048799001';
        const phone = '380600000000';

        try {
            const results = await np.tracking.fetchTracking([ttn], phone);
            const result = results.get(ttn);

            // Проверяем, что API ответило успешно
            expect(result).toBeDefined();

            // Согласно предоставленным вами данным, статус должен быть "Номер не найден" (Код 3)
            expect(result?.statusCode).toBe(TrackingStatusCode.NOT_FOUND);
            expect(result?.statusDescription).toContain('знайдено');

            console.log('Smoke test passed: API is reachable and responding correctly.');
        } catch (error) {
            console.error('Smoke test failed: API is unreachable.', error);
            throw error;
        }
    });

    it('should handle multiple requests to verify batch logic on real server for tracking', async () => {
        const ttns = ['20400048799001', '20400048799002'];
        const results = await np.tracking.fetchTracking(ttns);

        expect(results.size).toBeGreaterThan(0);
        expect(results.has('20400048799001')).toBe(true);
    });
});