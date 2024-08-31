"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema, data) => {
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
exports.validateSchema = validateSchema;
