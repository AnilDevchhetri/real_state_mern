export const errorHandler = (statusCode,message)=>{
    const error = new Error(); //javascript for create error
    error.statusCode = statusCode;
    error.message = message;
    return error;
}