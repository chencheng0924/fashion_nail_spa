export function getAssetsFile(url) {
  return new URL(`../assets/img/${url}`, import.meta.url).href;
}

export function getAssetsFileIcon(url) {
  return new URL(`../assets/icon/${url}`, import.meta.url).href;
}
