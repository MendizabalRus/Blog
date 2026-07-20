const BASE_URL = "http://localhost:8080/api";

const request = async (endpoint, options = {}) => {
  console.log(options)
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Something went wrong...");
  }

  return result;
};

export default request;