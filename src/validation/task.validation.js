import z from "zod";

export const TaskSchema = z.object({
    title: z.string().min(3),
    position: z.string(),
    description: z.string().min(3)
});

export const MoveTaskSchema = z.object({
    new_id_column: z.int()
})