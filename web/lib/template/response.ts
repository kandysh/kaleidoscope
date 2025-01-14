export const errorResponse = (message: string, code: number = 400): Response => Response.json({ error: message }, { status: code });
export const successResponse = (message: string, code: number = 200): Response => Response.json({ message: message }, { status: code });
