import { z } from "zod";

export const TrackingStatusSchema = z.object({
    Number: z.string(),
    StatusCode: z.string(),
    Status: z.string(),
    // Поля, которые могут быть пустыми в публичном режиме
    RecipientFullName: z.string().optional().or(z.literal("")),
    DocumentCost: z.string().optional().or(z.literal("")),
    // Флаги управления
    PossibilityCreateReturn: z.boolean().default(false),
    PossibilityTermExtensio: z.boolean().default(false),
}).passthrough();