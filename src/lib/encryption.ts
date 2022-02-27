import CryptoJS from 'crypto-js';

export const aesCardCipher = (data: Record<string, unknown>): string => {
  const cipher = CryptoJS.AES.encrypt(JSON.stringify(data), CryptoJS.enc.Base64.parse(process.env.AESKEY as string), {
    mode: CryptoJS.mode.CBC,
    iv: CryptoJS.enc.Base64.parse(process.env.IVKEY as string),
  });
  return cipher.ciphertext.toString(CryptoJS.enc.Base64);
};
