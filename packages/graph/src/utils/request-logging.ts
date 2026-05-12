import { AxiosInstance } from "axios";
import stats from "../stats";


export function addAylaRequestLogging(client: AxiosInstance, clientType: string): void {
  client.interceptors.request.use((config) => {
    stats.increment("ayla.request.start", {
      url: config.url || "?",
      clientType,
    });
    return config;
  }, (error) => {
    stats.increment("ayla.request.error", {
      clientType,
    });
    return Promise.reject(error);
  });

  client.interceptors.response.use((response) => {
    stats.increment("ayla.response.complete", {
      url: response.config.url || "?",
      clientType,
      status: String(response.status),
    });
    return response;
  }, (error) => {
    stats.increment("ayla.response.error", {
      clientType,
    });
    return Promise.reject(error);
  });
};