// src/providers/NovaPoshta.ts
export default class NovaPoshtaClient {
  constructor(private apiKey: string) {}

  // Placeholder: track shipment by tracking number
  async track(ttn: string): Promise<{ ttn: string; status: string }> {
    // TODO: integrate with Nova Poshta API
    return { ttn, status: 'IN_TRANSIT' };
  }
}
