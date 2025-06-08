import {z} from "zod"

export const usernameSchema = z.object({
    username : z
    .string()
    .min(3,"username must be atleast of 3 characters!")
    .max(50,"username too long!")
    .regex(/^[a-zA-Z0-9]+$/, "username should only consist alphabets and numbers!")
})