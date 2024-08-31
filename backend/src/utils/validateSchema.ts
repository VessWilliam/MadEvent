import { ZodSchema } from "zod";

export const validateSchema = <T>(schema: ZodSchema<T>, data: any): T | string => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const validationErrors = result.error.errors;
    const errorMsg = validationErrors
      .map((error) => error.message)
      .join(", ");
    console.error(`Validation error: ${errorMsg}`);
    return errorMsg;
  }

  return result.data;
};