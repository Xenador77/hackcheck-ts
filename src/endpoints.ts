const endpointBase: string = "https://api.hackcheck.io/";

export function endpointSearch(
  apiKey: string,
  field: string,
  query: string,
): string {
  return `${endpointBase}search/${apiKey}/${field}/${query}`;
}

export function endpointCheck(
  apiKey: string,
  field: string,
  query: string,
): string {
  return `${endpointBase}search/check/${apiKey}/${field}/${query}`;
}

export function endpointGetMonitors(apiKey: string): string {
  return `${endpointBase}monitors/${apiKey}/list`;
}

export function endpointGetAssetMonitor(
  apiKey: string,
  monitorId: string,
): string {
  return `${endpointBase}monitors/${apiKey}/list/asset/${monitorId}`;
}

export function endpointGetDomainMonitor(
  apiKey: string,
  monitorId: string,
): string {
  return `${endpointBase}monitors/${apiKey}/list/domain/${monitorId}`;
}

export function endpointGetAssetMonitorSources(
  apiKey: string,
  monitorId: string,
): string {
  return `${endpointBase}monitors/${apiKey}/sources/asset/${monitorId}`;
}

export function endpointGetDomainMonitorSources(
  apiKey: string,
  monitorId: string,
): string {
  return `${endpointBase}monitors/${apiKey}/sources/domain/${monitorId}`;
}

export function endpointUpdateAssetMonitor(
  apiKey: string,
  monitorId: string,
): string {
  return `${endpointBase}monitors/${apiKey}/update/asset/${monitorId}`;
}

export function endpointUpdateDomainMonitor(
  apiKey: string,
  monitorId: string,
): string {
  return `${endpointBase}monitors/${apiKey}/update/domain/${monitorId}`;
}

export function endpointTogglePauseAssetMonitor(
  apiKey: string,
  monitorId: string,
): string {
  return `${endpointBase}monitors/${apiKey}/pause/asset/${monitorId}`;
}

export function endpointTogglePauseDomainMonitor(
  apiKey: string,
  monitorId: string,
): string {
  return `${endpointBase}monitors/${apiKey}/pause/domain/${monitorId}`;
}
