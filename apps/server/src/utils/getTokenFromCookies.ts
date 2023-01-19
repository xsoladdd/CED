export const getTokenFromCookies = (cookies: string): string | boolean => {
  const cookiesArray = cookies.split(";");
  let token = "";
  // Get string from array
  cookiesArray.forEach((element) => {
    if (element.includes("token")) {
      const [, tkn] = element.split("=");
      return (token = tkn);
    } else {
      return false;
    }
  });
  return token;
  //
};
