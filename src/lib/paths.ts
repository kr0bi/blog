export function withBase(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
export function postUrl(id: string) {
  return withBase(`blog/${id.split('/').map(encodeURIComponent).join('/')}/`);
}
