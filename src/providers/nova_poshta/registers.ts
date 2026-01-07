import { NovaPoshtaBase } from './client';
import {
    NovaPoshtaBaseResponse,
    ScanSheetInsertDocumentsRequest,
    ScanSheetResponse,
    GetScanSheetRequest,
    ScanSheetInfo,
    ScanSheetListItem,
    DeleteScanSheetRequest,
    ScanSheetDeleteInfo,
    RemoveDocumentsRequest,
    RemoveDocumentsResponse
} from '@/shared/types';

export class NovaPoshtaRegisters extends NovaPoshtaBase {
    private readonly modelName = 'ScanSheetGeneral';

    public async insertDocuments(properties: ScanSheetInsertDocumentsRequest): Promise<NovaPoshtaBaseResponse<ScanSheetResponse>> {
        return this.makeRequest<ScanSheetResponse>(
            this.modelName,
            'insertDocuments',
            properties as unknown as Record<string, unknown>
        );
    }

    public async getScanSheet(properties: GetScanSheetRequest): Promise<NovaPoshtaBaseResponse<ScanSheetInfo>> {
        return this.makeRequest<ScanSheetInfo>(
            this.modelName,
            'getScanSheet',
            properties as unknown as Record<string, unknown>
        );
    }

    public async getScanSheetList(): Promise<NovaPoshtaBaseResponse<ScanSheetListItem>> {
        return this.makeRequest<ScanSheetListItem>(
            this.modelName,
            'getScanSheetList',
            {}
        );
    }

    public async deleteScanSheet(properties: DeleteScanSheetRequest): Promise<NovaPoshtaBaseResponse<ScanSheetDeleteInfo>> {
        return this.makeRequest<ScanSheetDeleteInfo>(
            this.modelName,
            'deleteScanSheet',
            properties as unknown as Record<string, unknown>
        );
    }

    public async removeDocuments(properties: RemoveDocumentsRequest): Promise<NovaPoshtaBaseResponse<RemoveDocumentsResponse>> {
        return this.makeRequest<RemoveDocumentsResponse>(
            this.modelName,
            'removeDocuments',
            properties as unknown as Record<string, unknown>
        );
    }
}
