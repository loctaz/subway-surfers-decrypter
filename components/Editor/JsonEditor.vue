<script lang="ts" setup>
import { cn } from "@/lib/utils";
import JsonEditorVue from "json-editor-vue";

const colorMode = useColorMode();
const filesStore = useFilesStore();

const editorValue = ref(null);

watch(
  () => filesStore.currentFile,
  (file, oldFile) => {
    if (editorValue.value && oldFile) {
      try {
        oldFile.content.decrypted =
          typeof editorValue.value == "string"
            ? JSON.parse(editorValue.value)
            : editorValue.value;
      } catch (error) {
        oldFile.content.decrypted = editorValue.value;
      }
    }
    if (file) {
      editorValue.value = file.content.decrypted;
    }
  },
  { immediate: true }
);

watch(
  () => editorValue.value,
  (value) => {
    if (filesStore.currentFile) {
      filesStore.currentFile.content.decrypted =
        typeof value == "string" ? JSON.parse(value) : value;
    }
  }
);
</script>

<template>
  <div class="size-full">
    <JsonEditorVue
      v-if="filesStore.currentFileIndex != null"
      :class="cn('h-full', colorMode.value == 'dark' && 'jse-theme-dark')"
      v-model="editorValue"
      v-bind="{
        /* local props & attrs */
      }"
    />
    <div class="size-full flex justify-center items-center" v-else>
      <div class="flex flex-col gap-2 items-center">
        <Icon name="lucide:upload" class="text-4xl" />
        <p class="text-lg text-muted-foreground">
          Select a file to start editing
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
