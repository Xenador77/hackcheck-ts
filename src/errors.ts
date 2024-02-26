export class RateLimitError extends Error {
  remainingRequests: number;
  limit: number;
  constructor(limit: number, remainingRequests: number) {
    super("rate limit reached");
    this.name = "RateLimitError";
    this.remainingRequests = remainingRequests;
    this.limit = limit;
  }
}

export const UnauthorizedIPAddressError = new Error("unauthorized ip address");
export const InvalidAPIKeyError = new Error("invalid api key");
export const ServerError = new Error("server returned an error");
