<script lang="ts" setup>
import JsonEditorVue from "json-editor-vue";
import "vanilla-jsoneditor/themes/jse-theme-dark.css";

const filesStore = useFilesStore();
const colorMode = useColorMode();
</script>

<template>
  <div class="size-full">
    <JsonEditorVue
      v-model="filesStore.files[filesStore.selectedIndex!]!.data"
      :class="colorMode.value == 'dark' && 'jse-theme-dark'"
      class="h-full max-h-[calc(100vh-140px)]"
    />
  </div>
</template>

<style></style>
