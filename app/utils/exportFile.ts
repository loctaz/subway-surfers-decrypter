export default async (index: number) => {
  const filesStore = useFilesStore();

  const file = filesStore.files[index];

  if (!file) {
    throw new Error("File not found");
  }

  if (file.data === undefined) {
    throw new Error("File data not found");
  }

  const encrypted = await TextCipher.encrypt(JSON.stringify(file.data));
  const result = {
    version: file.version,
    data: encrypted,
  };

  return JSON.stringify(result);
};
