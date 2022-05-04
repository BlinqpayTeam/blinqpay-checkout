import CryptoJS from 'crypto-js';

export const aesCardCipher = (data: Record<string, unknown>): string => {
  const cipher = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Base64.parse('YmloZnZpZnZrZmtqaGdoa3NrbmhtbmdqZm5rbmhmc2U='),
    {
      mode: CryptoJS.mode.CBC,
      iv: CryptoJS.enc.Base64.parse('Z2hmdmpqZmJudmtqZndoaQ=='),
    },
  );
  return cipher.ciphertext.toString(CryptoJS.enc.Base64);
};
