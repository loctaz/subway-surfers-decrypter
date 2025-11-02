<script lang="ts" setup>
import Export from "./Export.vue";
import { toast } from "vue-sonner";
import { ref, onMounted } from "vue";

// === STORES & MODALS EXISTANTS ===
const filesStore = useFilesStore();
const exportModal = useExportModal();

// === MODALES ===
const showRestoreModal = ref(false);
const activeTab = ref("raw_edit");

// === RESTAURATION ===
function restore() {
  filesStore.files[filesStore.selectedIndex!]!.data =
    filesStore.files[filesStore.selectedIndex!]!.originalData;
  showRestoreModal.value = false;
  toast.success("Fichier restauré à son état d'origine");
}

// === AJOUT : GESTION DES MODES BASIC / ADVANCED + PRETTY JSON ===
const editorType = ref(
  localStorage.getItem("editorType") === "basic" ? "basic" : "advanced"
);
const prettyJSON = ref(localStorage.getItem("prettyJSON") === "yes");

function togglePrettify() {
  const textarea = document.querySelector("textarea");
  if (!textarea) return;

  try {
    const parsed = JSON.parse(textarea.value);
    textarea.value = prettyJSON.value
      ? JSON.stringify(parsed, null, 4)
      : JSON.stringify(parsed);
    localStorage.setItem("prettyJSON", prettyJSON.value ? "yes" : "no");
  } catch {
    toast.error("JSON invalide, impossible de reformater.");
  }
}

function switchEditorType() {
  localStorage.setItem("editorType", editorType.value);
  toast.success(
    editorType.value === "basic"
      ? "Mode Basic activé"
      : "Mode Advanced activé"
  );

  // Ici tu pourrais plus tard brancher un vrai JSONEditor pour le mode Advanced
}
</script>

<template>
  <div class="size-full flex flex-col gap-4">
    <!-- === TOOLBAR AJOUTÉE === -->
    <div class="flex items-center justify-end gap-4 p-2 rounded-md border bg-muted/20">
      <label class="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          v-model="prettyJSON"
          @change="togglePrettify"
          class="accent-pink-500"
        />
        Pretty JSON
      </label>

      <select
        v-model="editorType"
        @change="switchEditorType"
        class="border rounded-md px-2 py-1 text-sm bg-background text-foreground"
      >
        <option value="basic">Basic</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>

    <!-- === CONTENU PRINCIPAL === -->
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

    <!-- === MODALE DE RESTAURATION === -->
    <Dialog v-model:open="showRestoreModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restaurez le fichier à son état d'origine</DialogTitle>
          <DialogDescription>
            Restaurez le fichier à son état d'origine ? Vous perdrez toutes vos
            modifications.
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

<style scoped>
select {
  cursor: pointer;
}
</style>
