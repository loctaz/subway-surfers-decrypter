<script lang="ts" setup>
import NoEditor from "./interfaces/NoEditor.vue";

import Wallet from "./interfaces/Wallet.vue";

const filesStore = useFilesStore();

const currentFileName = computed(() => {
  return filesStore.files[filesStore.selectedIndex!]?.name;
});
</script>

<template>
  <div class="size-full">
    <Wallet v-if="currentFileName === 'wallet.json'" />

    <NoEditor v-else @useOther="$emit('useOther')" />
  </div>
</template>

<style></style>
