import { z } from "zod";


export const bookingSchema = z.object({
    name : z.string().min(1, "name is required!"),
    email : z.string().min(1, "email is required!").email("Invalid email format!"),
    date : z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, "Invalid date format!"),
    time : z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format!"),
    additionalInfo : z.string().optional()
})