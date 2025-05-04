<script lang="ts" setup>
import Wallet from "./QuickInterfaces/Wallet.vue";

const filesStore = useFilesStore();

const currentFile = computed(() => {
  return filesStore.currentFile?.name;
});
</script>

<template>
  <div class="size-full">
    <Wallet v-if="currentFile == 'wallet.json'" />

    <template v-else>
      <div class="size-full flex justify-center items-center">
        <div class="flex flex-col gap-2 items-center">
          <Icon name="lucide:frown" class="text-4xl" />
          <p class="text-lg text-muted-foreground">
            No quick editor available for this file
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<style></style>
