<script lang="ts" setup>
import NoEditor from "./interfaces/NoEditor.vue";

import Wallet from "./interfaces/Wallet.vue";
import CharactersInventory from "./interfaces/CharactersInventory.vue";

const filesStore = useFilesStore();

const currentFileName = computed(() => {
  return filesStore.files[filesStore.selectedIndex!]?.name;
});
</script>

<template>
  <div
    class="size-full max-h-[calc(100vh-140px)] overflow-y-auto overflow-x-hidden"
  >
    <Wallet v-if="currentFileName === 'wallet.json'" />
    <CharactersInventory
      v-else-if="currentFileName === 'characters_inventory.json'"
    />

    <NoEditor v-else @useOther="$emit('useOther')" />
  </div>
</template>

<style></style>
