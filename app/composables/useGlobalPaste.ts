import { onMounted, onUnmounted } from "vue";
import { toast } from "vue-sonner";

/**
 * Global paste listener that imports JSON files (from OS clipboard) when user presses Ctrl/Cmd+V.
 * - Only handles files. Text pastes are ignored so it won't interfere with typing.
 */
export const useGlobalPaste = () => {
  const filesStore = useFilesStore();

  const onPaste = async (e: ClipboardEvent) => {
    try {
      const dt = e.clipboardData;
      if (!dt) return;

      const files = Array.from(dt.files || []);
      if (files.length === 0) return;

      for (const file of files) {
        const isJson =
          file.type === "application/json" || file.name.endsWith(".json");
        if (!isJson) continue;
        try {
          const content = await file.text();
          await filesStore.addFile(content, file.name);
          toast.success(`Imported ${file.name}`);
        } catch (err) {
          console.error(err);
          toast.error(
            err instanceof Error ? err.message : "Failed to import pasted file"
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => {
    window.addEventListener("paste", onPaste, true);
  });

  onUnmounted(() => {
    window.removeEventListener("paste", onPaste, true);
  });
};
