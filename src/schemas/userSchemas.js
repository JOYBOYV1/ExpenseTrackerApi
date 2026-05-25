import { z } from 'zod';

export const userSchemas = z.object({
    id: z.string().optional(),
    username: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    created_at: z.date().optional(),
});

export const createUserSchema = userSchemas.omit({ id: true, created_at: true });

export const updateUserSchema = z.object({ 
    username: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(100).optional(),
 });
