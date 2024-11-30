interface DBError extends Error {
    code?: string;
    message: string;
}