import NovaPoshta from '@providers/nova_poshta';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.NOVA_POSHTA_API_KEY || '';

describe('NovaPoshta Registers Smoke Test', () => {
    // Skip tests if no API key is provided
    if (!API_KEY) {
        console.warn('Skipping NovaPoshta Registers smoke tests: NOVA_POSHTA_API_KEY not found in env');
        it.skip('should pass', () => {});
        return;
    }

    const np = new NovaPoshta(API_KEY);
    jest.setTimeout(15000);

    it('should fetch the list of registries (ScanSheets)', async () => {
        const response = await np.registers.getScanSheetList();
        
        expect(response.success).toBe(true);
        expect(Array.isArray(response.data)).toBe(true);
        
        if (response.data.length > 0) {
            const registry = response.data[0];
            expect(registry).toHaveProperty('Ref');
            expect(registry).toHaveProperty('Number');
            expect(registry).toHaveProperty('DateTime');
        } else {
            console.log('No registries found (this is valid if the account has no history)');
        }
    });
});
