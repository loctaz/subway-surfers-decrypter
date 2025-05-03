export default async (version: number, data: string): Promise<string> => {
  const filesStore = useFilesStore();

  let result = {
    version,
    data: await TextCipher.encrypt(data),
  };
  return JSON.stringify(result);
};
