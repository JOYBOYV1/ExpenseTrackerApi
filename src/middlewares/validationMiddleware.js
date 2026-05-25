import { ZodError } from "zod";

export function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.issues.map((issue) => ({
                    message: `${issue.path.join('.')} - ${issue.message}`,
                }))

                res.status(400).json({ errors: 'Invalid Data', details: errorMessage });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
}