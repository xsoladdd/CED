type error_type = "validation" | "authentication" | undefined;

export const errorHandler = (error_type?: error_type, params?: any) => {
  switch (error_type) {
    case "validation":
      throw new Error(JSON.stringify({ title: "VALIDATION_ERROR", params }));

    case "authentication":
      throw new Error(
        JSON.stringify({ title: "AUTHENTICATION_ERROR", params })
      );

    default:
      throw new Error(
        JSON.stringify({ title: "SOMETHING_WENT_WRONG", params })
      );
  }
};

export const throwError = (title: string, params: any) => {
  throw new Error(JSON.stringify({ title, params }));
};
