<script lang="ts" setup>
import { toast } from "vue-sonner";

const emit = defineEmits(["close"]);
const isDesktop = useMediaQuery("(min-width: 768px)");
const filesStore = useFilesStore();

async function copy() {
  if (!filesStore.currentFile) {
    toast.error("No file selected");
    return;
  }
  const text = await exportFile(
    filesStore.currentFile.content.version,
    JSON.stringify(filesStore.currentFile.content.decrypted)
  );
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Copied to clipboard");
    })
    .catch((err) => {
      toast.error("Failed to copy text");
      console.error("Error copying text: ", err);
    })
    .finally(() => {
      emit("close");
    });
}

async function saveFile() {
  if (!filesStore.currentFile) {
    toast.error("No file selected");
    return;
  }
  const text = await exportFile(
    filesStore.currentFile.content.version,
    JSON.stringify(filesStore.currentFile.content.decrypted)
  );
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filesStore.currentFile.name;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="w-full grid md:grid-cols-3 grid-cols-2 gap-3 mt-3">
    <div class="size-full">
      <AspectRatio :ratio="1">
        <Button
          variant="secondary"
          class="size-full flex-col items-center"
          @click="copy()"
        >
          <Icon name="lucide:files" class="text-5xl" /> Copy
        </Button>
      </AspectRatio>
    </div>
    <div class="size-full">
      <AspectRatio :ratio="1">
        <Button
          variant="secondary"
          class="size-full flex-col items-center"
          @click="saveFile()"
        >
          <Icon name="lucide:download" class="text-5xl" /> Save file
        </Button>
      </AspectRatio>
    </div>
    <div class="size-full md:col-span-1 col-span-2">
      <AspectRatio :ratio="isDesktop ? 1 : 3 / 1.4">
        <Button
          variant="secondary"
          class="size-full flex-col items-center"
          disabled
        >
          <Icon name="lucide:share-2" class="text-5xl" /> Share code
        </Button>
      </AspectRatio>
    </div>
  </div>
</template>

<style></style>
