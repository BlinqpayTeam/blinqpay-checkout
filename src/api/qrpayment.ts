import { Http } from '.';
import { ResponseType } from '../types';

export const getQrCode = async (reference: string, key: string): Promise<ResponseType> => {
  return Http.post(
    '/api/v1/wallet/generate-qr-code',
    {
      transactionReference: reference,
    },
    {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    },
  ) as unknown as ResponseType;
};
