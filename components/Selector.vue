<script lang="ts" setup>
import { ref } from "vue";
import { toast } from "vue-sonner";

const fileInput = ref<HTMLInputElement | null>(null);
const filesStore = useFilesStore();

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
          @click="openFileSelector"
          disabled
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
  </div>
</template>

<style></style>
