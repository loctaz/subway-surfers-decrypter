<script setup lang="ts">
const filesStore = useFilesStore();
const { isDragOver } = useGlobalDrop();
useGlobalPaste();
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex pt-4 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <span class="font-bold">{{
            filesStore.selectedIndex !== null
              ? filesStore.files[filesStore.selectedIndex]?.name
              : "No file selected"
          }}</span>
        </div>
      </header>

      <div class="size-full p-4 relative">
        <slot />

        <!-- Global Drop Overlay -->
        <div
          v-if="isDragOver"
          class="fixed inset-0 z-50 bg-background-500/20 backdrop-blur-sm border-2 border-dashed border-secondary flex items-center justify-center"
        >
          <div class="bg-secondary rounded-lg p-8 shadow-lg text-center">
            <Icon name="lucide:folder-open" class="mb-4 text-4xl" />
            <h3 class="text-xl font-semibold mb-2">Faites glisser ici les fichiers JSON</h3>
            <p class="">Valider pour importer vos fichiers</p>
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
