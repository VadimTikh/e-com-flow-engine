// ============================================================================
// Enums & Constants
// ============================================================================

export enum TrackingStatusCode {
    CREATED_NOT_SENT = 1,
    DELETED = 2,
    NOT_FOUND = 3,
    IN_CITY_INTERCITY = 4,
    IN_CITY_LOCAL = 41,
    EN_ROUTE_TO_CITY = 5,
    ARRIVED_AT_CITY = 6,
    ARRIVED_AT_WAREHOUSE = 7,
    LOADED_INTO_PARCEL_LOCKER = 8,
    RECEIVED = 9,
    RECEIVED_MONEY_TRANSFER_PENDING = 10,
    RECEIVED_MONEY_TRANSFER_PAID = 11,
    ASSEMBLING = 12,
    ON_THE_WAY_TO_RECIPIENT = 101,
    RETURN_REQUESTED = 102,
    REFUSED = 103,
    ADDRESS_CHANGED = 104,
    STORAGE_STOPPED = 105,
    RECEIVED_RETURN_EN_CREATED = 106,
    DELIVERY_FAILED_RECIPIENT_ABSENT = 111,
    DELIVERY_DATE_POSTPONED = 112,
}

export const TRACKING_STATUS_DESCRIPTIONS: Record<number, string> = {
    1: 'Відправник самостійно створив цю накладну, але ще не надав до відправки',
    2: 'Видалено',
    3: 'Номер не знайдено',
    4: 'Відправлення у місті (міжобласне)',
    41: 'Відправлення у місті (локальна доставка)',
    5: 'Відправлення прямує до міста призначення',
    6: 'Відправлення у місті призначення, очікуйте доставку',
    7: 'Прибув на відділення',
    8: 'Прибув на відділення (завантажено в Поштомат)',
    9: 'Відправлення отримано',
    10: 'Відправлення отримано, очікуйте грошовий переказ',
    11: 'Відправлення отримано, грошовий переказ видано',
    12: 'Нова Пошта комплектує ваше відправлення',
    101: 'На шляху до одержувача',
    102: 'Відмова від отримання (створено замовлення на повернення)',
    103: 'Відмова від отримання',
    104: 'Змінено адресу',
    105: 'Припинено зберігання',
    106: 'Одержано і створено ЕН зворотної доставки',
    111: 'Невдала спроба доставки (відсутній одержувач)',
    112: 'Дата доставки перенесена одержувачем',
};

export enum PayerType {
    SENDER = 'Sender',
    RECIPIENT = 'Recipient',
    THIRD_PERSON = 'ThirdPerson',
}

export enum ServiceType {
    WAREHOUSE_WAREHOUSE = 'WarehouseWarehouse',
    WAREHOUSE_DOORS = 'WarehouseDoors',
    DOORS_WAREHOUSE = 'DoorsWarehouse',
    DOORS_DOORS = 'DoorsDoors',
}

export enum CargoType {
    CARGO = 'Cargo',
    DOCUMENTS = 'Documents',
    TIRES_WHEELS = 'TiresWheels',
    PALLET = 'Pallet',
}

// ============================================================================
// Request Interfaces
// ============================================================================

export interface NovaPoshtaBaseRequest {
    apiKey: string;
    modelName: string;
    calledMethod: string;
    methodProperties: Record<string, unknown>;
}

export interface TrackingDocument {
    DocumentNumber: string;
    Phone?: string;
}

export interface TrackingRequestProperties {
    Documents: TrackingDocument[];
}

// ============================================================================
// Response Interfaces
// ============================================================================

export interface NovaPoshtaBaseResponse<T> {
    success: boolean;
    data: T[];
    errors: string[];
    warnings: string[];
    info: string[];
    messageCodes: string[];
    errorCodes: string[];
    warningCodes: string[];
    infoCodes: string[];
}

export interface TrackingDocumentStatus {
    PossibilityCreateReturn: boolean;
    PossibilityCreateRefusal: boolean;
    PossibilityChangeEW: boolean;
    PossibilityCreateRedirecting: boolean;
    Number: string;
    Redelivery: string;
    RedeliverySum: string;
    RedeliveryNum: string;
    RedeliveryPayer: string;
    OwnerDocumentType: string;
    LastCreatedOnTheBasisDocumentType: string;
    LastCreatedOnTheBasisPayerType: string;
    LastCreatedOnTheBasisDateTime: string;
    LastTransactionStatusGM: string;
    LastTransactionDateTimeGM: string;
    LastAmountTransferGM: string;
    DateCreated: string;
    DocumentWeight: string;
    FactualWeight: string;
    VolumeWeight: string;
    CheckWeight: string;
    CheckWeightMethod: string;
    DocumentCost: string;
    CalculatedWeight: string;
    SumBeforeCheckWeight: string;
    PayerType: string;
    RecipientFullName: string;
    RecipientDateTime: string;
    ScheduledDeliveryDate: string;
    PaymentMethod: string;
    CargoDescriptionString: string;
    CargoType: string;
    CitySender: string;
    CityRecipient: string;
    WarehouseRecipient: string;
    CounterpartyType: string;
    AfterpaymentOnGoodsCost: string;
    ServiceType: string;
    UndeliveryReasonsSubtypeDescription: string;
    WarehouseRecipientNumber: string;
    LastCreatedOnTheBasisNumber: string;
    PhoneRecipient: string;
    RecipientFullNameEW: string;
    WarehouseRecipientInternetAddressRef: string;
    MarketplacePartnerToken: string;
    ClientBarcode: string;
    RecipientAddress: string;
    CounterpartyRecipientDescription: string;
    CounterpartySenderType: string;
    DateScan: string;
    PaymentStatus: string;
    PaymentStatusDate: string;
    AmountToPay: string;
    AmountPaid: string;
    Status: string;
    StatusCode: string;
    RefEW: string;
    BackwardDeliverySubTypesActions: string;
    BackwardDeliverySubTypesServices: string;
    UndeliveryReasons: string;
    DatePayedKeeping: string;
    InternationalDeliveryType: string;
    SeatsAmount: string;
    CardMaskedNumber: string;
    ExpressWaybillPaymentStatus: string;
    ExpressWaybillAmountToPay: string;
    PhoneSender: string;
    TrackingUpdateDate: string;
    WarehouseSender: string;
    DateReturnCargo: string;
    DateMoving: string;
    DateFirstDayStorage: string;
    RefCityRecipient: string;
    RefCitySender: string;
    RefSettlementRecipient: string;
    RefSettlementSender: string;
    SenderAddress: string;
    SenderFullNameEW: string;
    AnnouncedPrice: string;
    AdditionalInformationEW: string;
    ActualDeliveryDate: string;
    PostomatV3CellReservationNumber: string;
    OwnerDocumentNumber: string;
    LastAmountReceivedCommissionGM: string;
    DeliveryTimeframe: string;
    CreatedOnTheBasis: string;
    UndeliveryReasonsDate: string;
    RecipientWarehouseTypeRef: string;
    WarehouseRecipientRef: string;
    CategoryOfWarehouse: string;
    WarehouseRecipientAddress: string;
    WarehouseSenderInternetAddressRef: string;
    WarehouseSenderAddress: string;
    AviaDelivery: string;
    BarcodeRedBox: string;
    CargoReturnRefusal: string;
    DaysStorageCargo: string;
    Packaging: unknown[] | null;
    PartialReturnGoods: unknown[] | null;
    SecurePayment: string;
    PossibilityChangeCash2Card: boolean;
    PossibilityChangeDeliveryIntervals: boolean;
    PossibilityTermExtensio: boolean; // Retained typo from API docs
    StorageAmount: string;
    StoragePrice: string;
    FreeShipping: string;
    LoyaltyCardRecipient: string;
}

// ============================================================================
// Simplified Output Types (for cleaner API)
// ============================================================================

export interface TrackingResult {
    ttn: string;
    statusCode: TrackingStatusCode;
    status: string;
    statusDescription: string;
    dateCreated: string;
    scheduledDeliveryDate: string;
    actualDeliveryDate: string;
    citySender: string;
    cityRecipient: string;
    warehouseSender: string;
    warehouseRecipient: string;
    weight: number;
    cost: number;
    announcedPrice: number;
    redeliverySum: number;
    recipientFullName: string;
    recipientPhone: string;
    canReturn: boolean;
    canRefuse: boolean;
    canRedirect: boolean;
    canEdit: boolean;
    canExtendStorage: boolean;
    raw: TrackingDocumentStatus;
}

export interface FetchTrackingResponse {
    success: boolean;
    results: Map<string, TrackingResult>;
    errors: string[];
    notFound: string[];
}

// ============================================================================
// Client Options
// ============================================================================

export interface NovaPoshtaClientOptions {
    apiUrl?: string;
}

// ============================================================================
// ScanSheet (Registers) Interfaces
// ============================================================================

export interface ScanSheetInsertDocumentsRequest {
    DocumentRefs: string[];
    Ref?: string;
    Date?: string; // DD.MM.YYYY
}

export interface ScanSheetResponse {
    Description: string;
    Ref: string;
    Number: string;
    Date: string;
    Errors: string[];
    Warnings: string[];
    Data: unknown;
    Success: Array<{
        Ref: string;
        Number: string;
    }>;
}

export interface GetScanSheetRequest {
    Ref: string;
    CounterpartyRef?: string;
}

export interface ScanSheetInfo {
    Ref: string;
    Number: string;
    DateTime: string;
    Count: string;
    CitySenderRef: string;
    CitySender: string;
    SenderAddressRef: string;
    SenderAddress: string;
    SenderRef: string;
    Sender: string;
}

export interface ScanSheetListItem {
    Ref: string;
    Number: string;
    DateTime: string;
    Printed: string;
}

export interface DeleteScanSheetRequest {
    ScanSheetRefs: string[];
}

export interface ScanSheetDeleteInfo {
    Ref: string;
    Number: string;
    Error: string;
}

export interface RemoveDocumentsRequest {
    DocumentRefs: string[];
    Ref?: string;
}

export interface RemoveDocumentsResponse {
    DocumentRefs: {
        Errors: string[];
        Success: Array<{
            Ref: string;
            Number: string;
            Document: string;
        }>;
    };
}