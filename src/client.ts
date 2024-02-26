import fetch from "node-fetch";
import {
  InvalidAPIKeyError,
  RateLimitError,
  ServerError,
  UnauthorizedIPAddressError,
} from "./errors";
import {
  AssetMonitor,
  CheckOptions,
  CheckResponse,
  DomainMonitor,
  GetMonitorsResponse,
  SearchOptions,
  SearchResponse,
  Source,
  UpdateAssetMonitorParams,
  UpdateDomainMonitorParams,
} from "./types";
import {
  endpointCheck,
  endpointGetAssetMonitor,
  endpointGetAssetMonitorSources,
  endpointGetDomainMonitor,
  endpointGetDomainMonitorSources,
  endpointGetMonitors,
  endpointSearch,
  endpointTogglePauseAssetMonitor,
  endpointTogglePauseDomainMonitor,
  endpointUpdateAssetMonitor,
  endpointUpdateDomainMonitor,
} from "./endpoints";

export function generateSearchURL(apiKey: string, options: SearchOptions) {
  const url = endpointSearch(apiKey, options.field, options.query);

  const query: { [key: string]: string } = {};

  if (options.filter) {
    query["filter"] = options.filter.type;
    query["databases"] = options.filter.databases.join(",");
  }

  if (options.pagination) {
    query["offset"] = options.pagination.offset.toString();
    query["limit"] = options.pagination.limit.toString();
  }

  const queryString = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  if (queryString) {
    return url.toString() + "?" + queryString;
  }

  return url.toString();
}

export class HackCheckClient {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(
    method: string,
    url: string,
    body?: object,
  ): Promise<any> {
    const response = await fetch(url, {
      method,
      body: body && JSON.stringify(body),
    });

    let responseBody: any = await response.json();

    if (response.status === 401) {
      if (responseBody.error === "Invalid API key.") {
        throw InvalidAPIKeyError;
      } else if (responseBody.error === "Unauthorized IP address.") {
        throw UnauthorizedIPAddressError;
      } else {
        throw ServerError;
      }
    } else if (response.status === 429) {
      const limit = +(response.headers.get("X-HackCheck-Limit") || "0");
      const remaining = +(response.headers.get("X-HackCheck-Remaining") || "0");

      throw new RateLimitError(limit, remaining);
    } else if (response.status === 400) {
      throw new Error(responseBody.error);
    } else if (response.status === 404) {
      throw new Error("endpoint not found");
    }

    return responseBody;
  }

  async search(options: SearchOptions): Promise<SearchResponse> {
    const response = await this.request(
      "GET",
      generateSearchURL(this.apiKey, options),
    );

    for (const result of response.results) {
      if (result.source.date !== "") {
        const s = (result.source.date as string).split("-");
        result.source.date = new Date(+s[0], +s[1] - 1, 1);
      } else {
        result.source.date = undefined;
      }
    }

    return response;
  }

  async check(options: CheckOptions): Promise<boolean> {
    const response = await this.request(
      "GET",
      endpointCheck(this.apiKey, options.field, options.query),
    );

    return (response as CheckResponse).found;
  }

  async getMonitors(): Promise<GetMonitorsResponse> {
    const response = await this.request(
      "GET",
      endpointGetMonitors(this.apiKey),
    );

    return response;
  }

  async getAssetMonitor(monitorId: string): Promise<AssetMonitor> {
    const response = await this.request(
      "GET",
      endpointGetAssetMonitor(this.apiKey, monitorId),
    );

    return response;
  }

  async getDomainMonitor(monitorId: string): Promise<DomainMonitor> {
    const response = await this.request(
      "GET",
      endpointGetDomainMonitor(this.apiKey, monitorId),
    );

    return response;
  }

  async getAssetMonitorSources(monitorId: string): Promise<Source[]> {
    const response = await this.request(
      "GET",
      endpointGetAssetMonitorSources(this.apiKey, monitorId),
    );

    return response;
  }

  async getDomainMonitorSources(monitorId: string): Promise<Source[]> {
    const response = await this.request(
      "GET",
      endpointGetDomainMonitorSources(this.apiKey, monitorId),
    );

    return response;
  }

  async togglePauseAssetMonitor(monitorId: string): Promise<AssetMonitor> {
    const response = await this.request(
      "POST",
      endpointTogglePauseAssetMonitor(this.apiKey, monitorId),
    );

    return response;
  }

  async togglePauseDomainMonitor(monitorId: string): Promise<DomainMonitor> {
    const response = await this.request(
      "POST",
      endpointTogglePauseDomainMonitor(this.apiKey, monitorId),
    );

    return response;
  }

  async updateAssetMonitor(
    monitorId: string,
    params: UpdateAssetMonitorParams,
  ): Promise<AssetMonitor> {
    const response = await this.request(
      "PUT",
      endpointUpdateAssetMonitor(this.apiKey, monitorId),
      params,
    );

    return response;
  }

  async updateDomainMonitor(
    monitorId: string,
    params: UpdateDomainMonitorParams,
  ): Promise<DomainMonitor> {
    const response = await this.request(
      "PUT",
      endpointUpdateDomainMonitor(this.apiKey, monitorId),
      params,
    );

    return response;
  }
}
