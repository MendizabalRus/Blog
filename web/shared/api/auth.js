import request from "./requestFn";

export const me = () => {
  return request("/auth/me");
};

export const login = (content) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(content),
  });
};

export const adminLogin = (content) => {
  return request("/auth/admin/login", {
    method: "POST",
    body: JSON.stringify(content),
  });
};

export const register = (content) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(content),
  });
};