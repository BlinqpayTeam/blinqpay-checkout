import { create } from 'apisauce';
import { ResponseType } from '../types';

export const Http = create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    mode: 'no-cors',
  },
});

Http.addResponseTransform((res) => {
  if (res.ok) {
    res.data = {
      ...res.data,
      error: false,
      statusCode: res.status,
    };
  }
  if (res.problem) {
    switch (res.problem) {
      case 'CLIENT_ERROR': {
        let message = res?.data?.message;
        if (message) {
          if (typeof message === 'object' && !Array.isArray(message)) {
            const keys = Object.keys(message);
            const firstMsg = message[keys[0]];
            message = Array.isArray(firstMsg) ? firstMsg[0] : firstMsg;
          }
          if (Array.isArray(message)) {
            message = message[0];
          }
        }
        res.data = { ...res.data, statusCode: res.status, error: true, message };
        break;
      }
      case 'NETWORK_ERROR':
        res.data = {
          ...res.data,
          statusCode: 500,
          error: true,
          message: 'Network Error! Kindly Try again. ',
        };
        break;
      default:
        res.data = {
          ...res.data,
          statusCode: 500,
          error: true,
          message: 'Unknown error occured!. Kindly try later',
        };
        break;
    }
  }
});

export const genericPost = async (
  url: string,
  payload: Record<string, unknown>,
  headers?: Record<string, unknown>,
): Promise<ResponseType> => {
  return Http.post(url, payload, headers) as unknown as ResponseType;
};
