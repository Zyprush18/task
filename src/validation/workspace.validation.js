import z from "zod";

export const workspaceSchema = z.object({
    name: z.string().min(3)
});

export const workspaceMemSchema = z.object({
    user_id: z.int()
});