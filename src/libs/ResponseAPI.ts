// export const validation = (errors: string) => {

// };

export const success = (message: string, statusCode: number, results: any) => {
  return {
    success: true,
    message,
    code: statusCode,
    data: results,
  };
};

export const error = (
  message: string,
  statusCode: number,
  errorMessage: any
) => {
  return {
    success: false,
    message,
    errorMessage,
    code: statusCode,
  };
};
