export function setURLSearchParam(name: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  history.pushState({}, "", url);
}

export function getURLSearchParam(name: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
