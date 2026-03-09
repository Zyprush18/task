import z from "zod";

export const TaskSchema = z.object({
    title: z.string().min(3),
    position: z.string().min(3),
    description: z.string().min(3)
})