import { onMounted, onUnmounted, ref } from "vue";
import { toast } from "vue-sonner";

export const useGlobalDrop = () => {
  const isDragOver = ref(false);
  const dragCounter = ref(0);
  const filesStore = useFilesStore();

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    // Only show copy effect when actual files are dragged
    if (event.dataTransfer && event.dataTransfer.types?.includes("Files")) {
      event.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
    // Ignore non-file drags (e.g., text selections)
    if (!event.dataTransfer || !event.dataTransfer.types?.includes("Files"))
      return;
    dragCounter.value += 1;
    isDragOver.value = true;
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    dragCounter.value = Math.max(0, dragCounter.value - 1);
    if (dragCounter.value === 0) isDragOver.value = false;
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragOver.value = false;
    dragCounter.value = 0;

    const dataTransfer = event.dataTransfer;
    if (!dataTransfer) return;

    const files = Array.from(dataTransfer.files || []);

    for (const file of files) {
      const isJson =
        file.type === "application/json" || file.name.endsWith(".json");
      if (!isJson) continue;

      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          await filesStore.addFile(content, file.name);
        } catch (error) {
          console.error(error);
          toast.error(error instanceof Error ? error.message : "Unknown error");
        }
      };

      reader.onerror = () => {
        console.error(reader.error);
        toast.error(reader.error?.message ?? "Failed to read file");
      };

      try {
        reader.readAsText(file);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to start reading file"
        );
      }
    }
  };

  onMounted(() => {
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);
  });

  onUnmounted(() => {
    window.removeEventListener("dragover", handleDragOver);
    window.removeEventListener("dragenter", handleDragEnter);
    window.removeEventListener("dragleave", handleDragLeave);
    window.removeEventListener("drop", handleDrop);
  });

  return { isDragOver };
};
