class ErrorHandler extends Error{
    constructor(msg , status){
        super(msg);
        this.statusCode = status
    }
}

export default ErrorHandler;