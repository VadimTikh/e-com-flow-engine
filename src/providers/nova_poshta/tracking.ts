import { NovaPoshtaBase } from './client';
import { chunkArray, parseSafeFloat } from '../../shared/utils';
import {
    TrackingResult,
    TrackingDocumentStatus,
    TrackingStatusCode,
    TRACKING_STATUS_DESCRIPTIONS
} from '@/shared/types';
// Предполагаем, что схема создана в файле schemas.ts
import { TrackingStatusSchema } from './schemas';

export class NovaPoshtaTracking extends NovaPoshtaBase {
    private readonly MAX_BATCH = 100;

    /**
     * Получение данных трекинга.
     * Если передан phone, API отдаст полные данные (ФИО, суммы, флаги управления).
     */
    async fetchTracking(trackingNumbers: string[], phone?: string): Promise<Map<string, TrackingResult>> {
        const sanitizedPhone = phone?.replace(/\D/g, ''); // Только цифры
        const chunks = chunkArray(trackingNumbers, this.MAX_BATCH);
        const allResults = new Map<string, TrackingResult>();

        for (const chunk of chunks) {
            const documents = chunk.map(ttn => ({
                DocumentNumber: ttn,
                ...(sanitizedPhone && { Phone: sanitizedPhone })
            }));

            const response = await this.makeRequest<TrackingDocumentStatus>(
                'TrackingDocumentGeneral',
                'getStatusDocuments',
                { Documents: documents }
            );

            if (response.success && response.data) {
                response.data.forEach(item => {
                    // Валидация через Zod перед маппингом
                    const validation = TrackingStatusSchema.safeParse(item);

                    if (!validation.success) {
                        // Если структура данных изменилась, логируем, но продолжаем работу с остальными
                        console.error(`Validation failed for TTN ${item.Number}:`, validation.error.format());
                    }

                    const rawCode = parseInt(item.StatusCode, 10);
                    const statusCode: TrackingStatusCode = isNaN(rawCode)
                        ? TrackingStatusCode.NOT_FOUND
                        : (rawCode as TrackingStatusCode);

                    allResults.set(item.Number, this.mapToTrackingResult(item, statusCode));
                });
            }
        }
        return allResults;
    }

    private mapToTrackingResult(item: TrackingDocumentStatus, statusCode: TrackingStatusCode): TrackingResult {
        return {
            ttn: item.Number,
            statusCode: statusCode,
            status: item.Status || 'Invalid status',
            statusDescription: TRACKING_STATUS_DESCRIPTIONS[statusCode] ?? item.Status,

            dateCreated: item.DateCreated,
            scheduledDeliveryDate: item.ScheduledDeliveryDate,
            actualDeliveryDate: item.ActualDeliveryDate,

            citySender: item.CitySender,
            cityRecipient: item.CityRecipient,
            warehouseSender: item.WarehouseSender,
            warehouseRecipient: item.WarehouseRecipient,

            weight: parseSafeFloat(item.FactualWeight),
            cost: parseSafeFloat(item.DocumentCost),
            announcedPrice: parseSafeFloat(item.AnnouncedPrice),
            redeliverySum: parseSafeFloat(item.RedeliverySum),

            recipientFullName: item.RecipientFullName || '',
            recipientPhone: item.PhoneRecipient || '',

            // Эти флаги будут true только в Full Mode (при наличии телефона)
            canReturn: Boolean(item.PossibilityCreateReturn),
            canRefuse: Boolean(item.PossibilityCreateRefusal),
            canRedirect: Boolean(item.PossibilityCreateRedirecting),
            canEdit: Boolean(item.PossibilityChangeEW),

            // Поле с опечаткой из API
            canExtendStorage: Boolean(item.PossibilityTermExtensio),

            raw: item
        };
    }
}