<script lang="ts" setup>
import { ref } from "vue";
import { toast } from "vue-sonner";

const fileInput = ref<HTMLInputElement | null>(null);
const filesStore = useFilesStore();
const showLoading = ref(false);

function openFileSelector() {
  fileInput.value?.click();
}

async function handleFileUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  const fileProcessingPromises: Promise<EncryptedFile | null>[] = [];

  for (const file of files) {
    const promise = file
      .text()
      .then(async (text) => {
        const parsedData: { version: number; data: string } = JSON.parse(text);

        return {
          name: file.name,
          rawContent: parsedData,
          tampered: false,
          content: {
            version: parsedData.version,
            decrypted: JSON.parse(await TextCipher.decrypt(parsedData.data)),
          },
        } satisfies EncryptedFile;
      })
      .catch((error) => {
        toast.error(`Error processing file ${file.name}: ${error.message}`);
        console.error("Error processing file:", file.name, error);
        return null;
      });

    fileProcessingPromises.push(promise);
  }

  const filesToAdd = (await Promise.all(fileProcessingPromises)).filter(
    (file): file is EncryptedFile => file !== null
  );

  filesStore.addFiles(filesToAdd);
}

async function fromClipboard() {
  showLoading.value = true;
  let rawData: string;
  let parsedData: { version: number; data: string };

  try {
    rawData = await navigator.clipboard.readText();
  } catch (err) {
    toast.error("Failed to read from clipboard", {
      description: err instanceof Error ? err.message : "Unknown error",
    });
    console.error("Failed to read from clipboard", err);
    showLoading.value = false;

    return;
  }

  try {
    parsedData = JSON.parse(rawData);
  } catch (err) {
    toast.error("Invalid JSON data", {
      description: err instanceof Error ? err.message : "Unknown error",
    });
    console.error("Invalid JSON data", err);
    showLoading.value = false;

    return;
  }

  if (!parsedData.version || !parsedData.data) {
    toast.error("Invalid file format");
    return;
  }

  const decryptedData = await TextCipher.decrypt(parsedData.data);
  const fileName = detectFromClipboard(JSON.parse(decryptedData));
  if (!fileName) {
    toast.error("Failed to detect file type");
    showLoading.value = false;
    return;
  }

  const file: EncryptedFile = {
    name: fileName,
    rawContent: parsedData,
    tampered: false,
    content: {
      version: parsedData.version,
      decrypted: JSON.parse(decryptedData),
    },
  };
  filesStore.addFiles([file]);
  showLoading.value = false;
}
</script>

<template>
  <div class="size-full flex justify-center">
    <div class="size-full w-full lg:max-w-xl">
      <div class="flex flex-col gap-2">
        <Button
          variant="outline"
          class="w-full"
          size="lg"
          @click="openFileSelector"
        >
          <Icon name="lucide:upload" />Upload file(s)
        </Button>
        <Button
          variant="outline"
          class="w-full"
          size="lg"
          @click="fromClipboard"
        >
          <Icon name="lucide:clipboard" />Paste from clipboard
        </Button>
        <Button
          variant="outline"
          class="w-full"
          size="lg"
          @click="openFileSelector"
          disabled
        >
          <Icon name="lucide:asterisk" />Import from code
        </Button>
      </div>

      <input
        type="file"
        ref="fileInput"
        accept=".json"
        multiple
        class="hidden"
        @change="handleFileUpload"
      />

      <div class="mt-5" v-show="filesStore.files.length > 0">
        <div class="flex items-center gap-2 mb-5">
          <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
            Loaded files
          </h4>
          <Button variant="outline" disabled
            ><Icon name="lucide:download" />Export all</Button
          >
        </div>

        <FilesList />
      </div>
    </div>

    <AlertDialog v-model:open="showLoading">
      <AlertDialogContent @escape-key-down.prevent @pointerDownOutside.prevent>
        <AlertDialogHeader>
          <AlertDialogTitle>Loading</AlertDialogTitle>
          <AlertDialogDescription
            class="flex items-center gap-2 text-2xl justify-center"
          >
            <Icon name="lucide:loader-circle" class="animate-spin" />
            <span>Detecting file</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter> </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<style></style>
