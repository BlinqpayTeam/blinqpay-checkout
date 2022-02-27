import { Http } from '.';
import { ResponseType } from '../types';

export const chargeCard = async (payload: Record<string, unknown>): Promise<ResponseType> => {
  return Http.post('/api/v1/cards/charge', {
    collectionChannel: 'CARD',
    ...payload,
  }) as unknown as ResponseType;
};

export const authorizeWithPin = async (payload: Record<string, unknown>): Promise<ResponseType> => {
  return Http.post('/api/v1/cards/authorize', {
    authModel: 'PIN',
    paymentType: 'CARD',
    ...payload,
  }) as unknown as ResponseType;
};

export const authorizeWithOTP = async (payload: Record<string, unknown>): Promise<ResponseType> => {
  return Http.post('/api/v1/cards/authorize', {
    authModel: 'OTP',
    paymentType: 'CARD',
    ...payload,
  }) as unknown as ResponseType;
};

export const authorizeAVS = async (payload: Record<string, unknown>): Promise<ResponseType> => {
  return Http.post('/api/v1/cards/authorize', {
    paymentType: 'CARD',
    authModel: 'AVS',
    ...payload,
  }) as unknown as ResponseType;
};

export const authorizeEnroll = async (payload: Record<string, unknown>): Promise<ResponseType> => {
  return Http.post('/api/v1/cards/authorize', {
    paymentType: 'CARD',
    authModel: 'CARD_ENROLL',
    ...payload,
  }) as unknown as ResponseType;
};
