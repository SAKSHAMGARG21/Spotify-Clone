class ApiError extends Error{
    constructor(
        statuscode,
        message="Something went wrong",
        error=[],
        stack=""
    ){
        super(message),
        this.statuscode=statuscode,
        this.message=message,
        this.error=error,
        this.stack=stack,
        this.success=false

        if (stack){
            this.stack=stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export {ApiError};