const iv = new Uint8Array(16); // 16 zero bytes

export default {
  decrypt: async (input: string): Promise<string> => {
    const config = useRuntimeConfig();

    const keyBytes = new Uint8Array(config.public.encryptionKey);

    const rawCiphertext = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: iv },
      cryptoKey,
      rawCiphertext
    );

    // Convert ArrayBuffer to string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  },

  encrypt: async (input: string): Promise<string> => {
    const config = useRuntimeConfig();

    const keyBytes = new Uint8Array(config.public.encryptionKey);

    const encoder = new TextEncoder();
    const data = encoder.encode(input);

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "AES-CBC" },
      false,
      ["encrypt"]
    );

    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv: iv },
      cryptoKey,
      data
    );

    // Convert ArrayBuffer to base64
    const bytes = new Uint8Array(encryptedBuffer);
    const base64Cipher = btoa(String.fromCharCode(...bytes));
    return base64Cipher;
  },
};
