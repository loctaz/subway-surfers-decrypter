// Utility to handle both encrypted and unencrypted json data

export default async (input: string) => {
  try {
    JSON.parse(input);
    return input;
  } catch (err) {
    return await TextCipher.decrypt(input);
  }
};
