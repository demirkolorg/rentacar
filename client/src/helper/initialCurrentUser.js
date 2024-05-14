import { getUser } from "../api/user";

async function initialCurrentUserJWT(token) {
  function parseJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  const decodedToken = parseJwt(token);
  if (!decodedToken) {
    return null;
  }
  const data = { id: decodedToken.id };
  const response = await getUser(data);

  if (!response.data.success) {
    return null;
  }
  return response.data.data;
}
export { initialCurrentUserJWT };
