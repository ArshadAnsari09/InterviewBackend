// APIResponse class for consistent response format
class APIResponse {
    constructor(statusCode, data) {
        const isSuccess = statusCode >= 200 && statusCode < 300;
        
        if (isSuccess) {
            this.status = statusCode;
            this.res = data || {};
        } else {
            this.status = statusCode || 500;
            this.err = {
                errCode: data?.errCode || data?.err?.errCode || "INTERNAL_SERVER_ERROR",
                msg: data?.msg || data?.message || data?.err?.msg || data?.err?.message || "An error occurred"
            };
        }
    }
}

module.exports = APIResponse;

