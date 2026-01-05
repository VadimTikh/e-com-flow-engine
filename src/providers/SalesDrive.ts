// src/providers/SalesDrive.ts
export default class SalesDriveClient {
  constructor(private baseUrl: string, private apiKey: string) {}

  // Placeholder: fetch orders from CRM
  async listOrders(): Promise<Array<{ id: string; status: string }>> {
    // TODO: integrate with SalesDrive API
    return [];
  }
}
