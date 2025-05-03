interface EncryptedFile {
  name: string;
  rawContent: {
    version: number;
    data: string;
  };

  tampered: boolean;
  content: {
    version: number;
    decrypted: Object<any>;
  };
}
