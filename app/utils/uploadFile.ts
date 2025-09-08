import { useFileDialog } from "@vueuse/core";

export default function uploadFiles(): Promise<void> {
  return new Promise((resolve, reject) => {
    let isSettled = false;
    const safeResolve = () => {
      if (isSettled) return;
      isSettled = true;
      resolve();
    };
    const safeReject = (error: unknown) => {
      if (isSettled) return;
      isSettled = true;
      reject(error);
    };

    try {
      const config = {
        accept: ".json,application/json",
        multiple: true,
      } as const;

      const { open, onChange } = useFileDialog(config);

      onChange((files) => {
        try {
          if (!files || files.length === 0) {
            safeResolve();
            return;
          }

          const filesStore = useFilesStore();

          let remainingFiles = files.length;
          const onFileDone = () => {
            remainingFiles -= 1;
            if (remainingFiles === 0) safeResolve();
          };

          for (const file of files) {
            try {
              const reader = new FileReader();

              reader.onload = async (e) => {
                try {
                  const content = e.target?.result as string;
                  await filesStore.addFile(content, file.name);
                  onFileDone();
                } catch (err) {
                  safeReject(err);
                }
              };

              reader.onerror = () => {
                safeReject(reader.error ?? new Error("Failed to read file"));
              };

              reader.readAsText(file);
            } catch (err) {
              safeReject(err);
            }
          }
        } catch (err) {
          safeReject(err);
        }
      });

      open();
    } catch (err) {
      safeReject(err);
    }
  });
}
