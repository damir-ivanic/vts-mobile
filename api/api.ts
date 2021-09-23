import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Constants from "expo-constants";

export const apiRequest = axios.create({
  baseURL: Constants?.manifest?.extra?.api_url,
});

export function setTokenHeader(token: string) {
  apiRequest.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export function clearTokenHeader() {
  delete apiRequest.defaults.headers.common["Authorization"];
}

export const request = {
  get: async function get<T>(url: string, config?: AxiosRequestConfig) {
    return doRequest<T>({ ...config, url, method: "get" });
  },
  post: async function post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    return doRequest<T>({ ...config, url, data, method: "post" });
  },
  patch: async function patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) {
    return doRequest<T>({ ...config, url, data, method: "patch" });
  },
  delete: async function del<T>(url: string, config?: AxiosRequestConfig) {
    return doRequest<T>({ ...config, url, method: "delete" });
  },
};

async function doRequest<T>(
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> {
  return apiRequest.request<T>({
    ...config,
    ...(config.responseType === "blob" && {
      transformRequest: [
        (data, headers) => {
          delete headers.common["Content-Type"];
          return data;
        },
      ],
    }),
  });
}
