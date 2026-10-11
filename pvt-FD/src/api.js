
const API = "http://127.0.0.1:4000/api/v1";

export async function api(path, method = "GET", body) {
  const token = localStorage.getItem("token");


  const isFormData = body instanceof FormData;

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }


  if (body && !isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  if (res.status === 204) {
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}