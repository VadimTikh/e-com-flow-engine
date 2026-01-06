import { createLogger } from '@/shared/logger';
import { NovaPoshtaBaseRequest, NovaPoshtaBaseResponse } from '@/shared/types';

const logger = createLogger('nova-poshta-core');

export class NovaPoshtaBase {
    constructor(
        protected readonly apiKey: string,
        private readonly apiUrl: string = 'https://api.novaposhta.ua/v2.0/json/'
    ) {}

    protected async makeRequest<T>(
        modelName: string,
        calledMethod: string,
        methodProperties: Record<string, unknown>
    ): Promise<NovaPoshtaBaseResponse<T>> {
        const body: NovaPoshtaBaseRequest = {
            apiKey: this.apiKey,
            modelName,
            calledMethod,
            methodProperties,
        };

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = (await response.json()) as NovaPoshtaBaseResponse<T>;
            if (!data.success) {
                logger.error(`API Error [${modelName}.${calledMethod}]`, data.errors);
            }
            return data;
        } catch (error) {
            logger.error('Network Error', error);
            throw error;
        }
    }
}