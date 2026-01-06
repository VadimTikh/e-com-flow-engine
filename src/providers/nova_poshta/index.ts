import { NovaPoshtaTracking } from './tracking';

export default class NovaPoshta {
    public readonly tracking: NovaPoshtaTracking;

    constructor(apiKey: string) {
        this.tracking = new NovaPoshtaTracking(apiKey);
    }
}