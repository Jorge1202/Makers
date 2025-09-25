import { ZodError, type ZodSchema } from 'zod';


interface Response<T> {
    success: boolean; 
    data?: T; 
    errors?: Record<string, string>
}

export function validateFormData<T>(
  schema: ZodSchema<T>,
  formData: unknown
): Response<T> {
  try {
    console.log(formData)
    const validatedData = schema.parse(formData);
    return { success: true, data: validatedData };
  } catch (error) {
    // ...existing code...
    if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach(err => {
            if (err.path && err.path.length > 0) {
                errors[err.path[0].toString()] = err.message;
            }
        });
        return { success: false, errors };
    }
    console.error('Validation error:', error);
    return { success: false, errors: { general: 'Error de validación' } };
  }
}