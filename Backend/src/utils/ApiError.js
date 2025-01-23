class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = message;
        this.errors = errors;
        this.stack = stack;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // toJSON() {
    //     return {
    //         statusCode: this.statusCode,
    //         message: this.message,
    //         errors: this.errors,
    //         stack: this.stack,
    //         success: this.success
    //     }
    // }
}

export { ApiError };