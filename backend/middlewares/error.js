export const createError = (error , req , res, next) => {
    error.message = error.message || "Internal server error";
    error.statusCode = error.statusCode || 500;

    return res.status(error.statusCode).json({
        success: false,
        msg : error.message
    })
};

export const asyncError = (passedFn) => (req , res , next) => {
    Promise.resolve(passedFn(req,res,next)).catch(next);
}