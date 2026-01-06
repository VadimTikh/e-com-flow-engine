/**
 * Splits an array into chunks of a specific size.
 * Useful for API batch limits (e.g., Nova Poshta 100 limit).
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Safely parses a string to a float, handling commas (European format)
 * and empty values.
 * e.g., "10,50" -> 10.5
 * e.g., "" -> 0
 */
export function parseSafeFloat(value: string | number | undefined | null): number {
    if (typeof value === 'number') return value;
    if (!value) return 0;

    // Replace comma with dot for JS parsing
    const cleanValue = value.toString().replace(',', '.');
    const parsed = parseFloat(cleanValue);

    return isNaN(parsed) ? 0 : parsed;
}