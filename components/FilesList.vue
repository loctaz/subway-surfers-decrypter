<script lang="ts" setup>
const filesStore = useFilesStore();
</script>

<template>
  <div class="w-full flex gap-2 flex-col" v-auto-animate>
    <ContextMenu v-for="(i, index) in filesStore.files">
      <ContextMenuTrigger>
        <Button
          :variant="
            filesStore.currentFileIndex == index ? 'default' : 'outline'
          "
          class="w-full justify-start"
          :key="i.name"
          @click="filesStore.setCurrentFile(i)"
        >
          <Icon :name="getIcon(i.name)" class="text-lg" /><span
            class="w-full text-left"
            v-text="i.name"
          ></span>
          <Icon name="lucide:dot" class="text-2xl" v-if="i.tampered" /> </Button
      ></ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel v-text="i.name"></ContextMenuLabel>
        <ContextMenuItem disabled
          ><Icon name="lucide:download" />Export</ContextMenuItem
        >
        <ContextMenuItem class="text-red-800" disabled
          ><Icon name="lucide:trash-2" />Remove</ContextMenuItem
        >
      </ContextMenuContent>
    </ContextMenu>
  </div>
</template>

<style></style>
