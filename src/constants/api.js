export const HTTP_PROTOCOL = import.meta.env.VITE_HTTP_PROTOCOL;
export const WS_PROTOCOL = import.meta.env.VITE_WS_PROTOCOL;
export const IP = import.meta.env.VITE_HOST_IP;
export const BACKEND_PORT = import.meta.env.VITE_HOST_BACKEND_PORT || '';

export const HTTP_API_VERSION = '/api/v1';
export const WS_ENDPOINT = '/ws';

export const HTTP_BASE_URL = `${HTTP_PROTOCOL}://${IP}${BACKEND_PORT}`;
export const WS_BASE_URL = `${WS_PROTOCOL}://${IP}${BACKEND_PORT}`;
