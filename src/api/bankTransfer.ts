import { Http } from '.';
import { ResponseType } from '../types';

export const getBankDetails = async (payload: Record<string, unknown>): Promise<ResponseType> => {
  return Http.post('/api/v1/bank-transfer/init-payment', payload) as unknown as ResponseType;
};
