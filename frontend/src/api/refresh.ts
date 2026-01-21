import type { ApiResponse } from "@/types/api.types";
import {apiConnector} from "./axios";
import { AUTH_ENDPOINTS } from "./endpoints";

// is refresh req is called F -> means not called yet T-> means api is called so not call by other failed req
let isRefreshing = false;

// queue failed reqs
let refreshSubscribers: (() => void)[] = [];

// add fail reqs in queue
const subscribeTokenRefresh = (cb: () => void) => {
  refreshSubscribers.push(cb);
};

// after token refresh call all api one by one from queue
const onRefreshed = () => {
  refreshSubscribers.forEach((cb) => cb());
  refreshSubscribers = [];
};

export const refreshAccessToken = async () => {
    // if refresh api already call then queue other     
    if (isRefreshing) {
    return new Promise<void>((resolve) => {
      subscribeTokenRefresh(resolve);
    });
  }
  // set api is called
  isRefreshing = true;

  try {
    await apiConnector<ApiResponse>("POST",AUTH_ENDPOINTS.REFRESH);
    // run subscriber (Queued Resquestes)
    onRefreshed();
  } finally {
    isRefreshing = false;
  }
};
