import z from "zod";

export const BoardSchema = z.object({
    name: z.string().min(3),
    workspace_id: z.int().optional()
});