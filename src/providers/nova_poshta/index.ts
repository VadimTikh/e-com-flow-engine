import { NovaPoshtaTracking } from './tracking';
import { NovaPoshtaRegisters } from './registers';

export default class NovaPoshta {
    public readonly tracking: NovaPoshtaTracking;
    public readonly registers: NovaPoshtaRegisters;

    constructor(apiKey: string) {
        this.tracking = new NovaPoshtaTracking(apiKey);
        this.registers = new NovaPoshtaRegisters(apiKey);
    }
}