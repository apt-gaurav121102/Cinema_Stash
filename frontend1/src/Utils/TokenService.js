// ---- Keys (avoid hardcoding everywhere) ----
const KEYS = {
  TOKEN: "token",
  USERNAME: "userName",
  USERID: "userId",
  ROLE: "role",
};

// ---- TOKEN ----
export const storeToken = (token) => localStorage.setItem(KEYS.TOKEN, token);
export const getToken = () => localStorage.getItem(KEYS.TOKEN);
export const removeToken = () => localStorage.removeItem(KEYS.TOKEN);

// ---- USERNAME ----
export const storeUserName = (name) => localStorage.setItem(KEYS.USERNAME, name);
export const getUserName = () => localStorage.getItem(KEYS.USERNAME);
export const removeUserName = () => localStorage.removeItem(KEYS.USERNAME);

// ---- USER ID ----
export const storeUserId = (id) => localStorage.setItem(KEYS.USERID, id);
export const getUserId = () => localStorage.getItem(KEYS.USERID);
export const removeUserId = () => localStorage.removeItem(KEYS.USERID);

// ---- ROLE ----
export const storeRole = (role) => localStorage.setItem(KEYS.ROLE, role);
export const getRole = () => localStorage.getItem(KEYS.ROLE);
export const removeRole = () => localStorage.removeItem(KEYS.ROLE);

// ---- LOGOUT (remove all app data) ----
export const logout = () => {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
};