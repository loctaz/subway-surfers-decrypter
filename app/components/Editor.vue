<script lang="ts" setup>
import Export from "./Export.vue";
import { toast } from "vue-sonner";

const filesStore = useFilesStore();
const exportModal = useExportModal();

const showRestoreModal = ref(false);
const activeTab = ref("raw_edit");

function restore() {
  filesStore.files[filesStore.selectedIndex!]!.data =
    filesStore.files[filesStore.selectedIndex!]!.originalData;
  showRestoreModal.value = false;
  toast.success("File restored to original state");
}
</script>

<template>
  <div class="size-full">
    <Export />
    <Tabs default-value="raw_edit" class="size-full" v-model="activeTab">
      <div class="w-full flex justify-between flex-wrap gap-2">
        <div
          class="grid grid-cols-2 md:grid-cols-none md:flex gap-2 items-center w-full md:w-auto"
        >
          <Button
            variant="outline"
            class="w-full md:w-auto"
            @click="exportModal.showModal(filesStore.selectedIndex!)"
          >
            <Icon name="lucide:download" />
            Exporter
          </Button>
          <Button
            variant="secondary"
            class="w-full md:w-auto"
            @click="showRestoreModal = true"
          >
            <Icon name="lucide:refresh-cw" />
            Restaurer
          </Button>
        </div>

        <TabsList class="w-full md:max-w-[400px]">
          <TabsTrigger value="quick_edit"> Modification rapide </TabsTrigger>
          <TabsTrigger value="raw_edit"> Modification brut </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="quick_edit" class="size-full">
        <EditorTypesQuickEditor @useOther="activeTab = 'raw_edit'" />
      </TabsContent>
      <TabsContent value="raw_edit">
        <EditorTypesRawEditor />
      </TabsContent>
    </Tabs>

    <Dialog v-model:open="showRestoreModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restaurez le fichier à son état d'origine</DialogTitle>
          <DialogDescription>
            Restaurez le fichier à son état d'origine. Vous perdrez toutes vos modifications.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="secondary"> Fermer </Button>
          </DialogClose>

          <Button type="button" @click="restore"> Restaurer </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style></style>
