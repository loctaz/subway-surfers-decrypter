<script setup lang="ts">
const filesStore = useFilesStore();
</script>

<template>
  <div class="size-full">
    <GetStarted v-if="filesStore.selectedIndex === null" />
    <Editor v-else />
  </div>
</template>
