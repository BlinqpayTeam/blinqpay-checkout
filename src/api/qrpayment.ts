import { Http } from '.';
import { ResponseType } from '../types';

export const getQrCode = async (reference: string): Promise<ResponseType> => {
  return Http.post('/api/v1/wallet/generate-qr-code', {
    transactionReference: reference,
  }) as unknown as ResponseType;
};
