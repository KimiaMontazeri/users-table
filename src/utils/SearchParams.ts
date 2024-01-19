export function setURLSearchParam(name: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  history.pushState({}, "", url);
}

export function getURLSearchParam(name: string): string | undefined {
  const params = new URLSearchParams(window.location.search);
  const result = params.get(name);
  if (result === null) {
    return undefined;
  }
  return result;
}
