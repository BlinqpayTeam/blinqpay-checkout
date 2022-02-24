import { Http } from '.';
import { ResponseType } from '../types';

export const initializeTransaction = async (key: string, payload: Record<string, unknown>): Promise<ResponseType> => {
  return Http.post('/api/v1/initialize-transaction', payload, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  }) as unknown as ResponseType;
};
