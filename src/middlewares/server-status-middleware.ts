export let requestCount = 0;

/**
 * @description Middleware to count API requests.
 */
export const requestCounterMiddleware = (_: any, __: any, next: () => void) => {
  requestCount++;
  next();
};

