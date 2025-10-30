<script lang="ts" setup>
import Export from "./Export.vue";
import { toast } from "vue-sonner";
import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import Label from "@/components/ui/label/Label.vue";
import EditorTypesRawEditor from "@/components/EditorTypes/RawEditor.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EditorMode = "advanced" | "basic";

interface RawEditorExposed {
  canSwitchMode: (mode: EditorMode) => boolean;
}

const filesStore = useFilesStore();
const exportModal = useExportModal();

const showRestoreModal = ref(false);
const activeTab = ref("raw_edit");
const editorMode = ref<EditorMode>("advanced");
const prettyJson = ref(true);
const rawEditorRef = ref<RawEditorExposed | null>(null);

const modeSelection = computed<EditorMode>({
  get: () => editorMode.value,
  set: (value) => {
    const nextMode = value ?? "advanced";
    if (rawEditorRef.value?.canSwitchMode(nextMode) === false) {
      return;
    }

    editorMode.value = nextMode;
  },
});

function restore() {
  filesStore.files[filesStore.selectedIndex!]!.data =
    filesStore.files[filesStore.selectedIndex!]!.originalData;
  showRestoreModal.value = false;
  toast.success("File restored to original state");
}

function onPrettyJsonToggle(value: boolean | "indeterminate") {
  if (value === "indeterminate" || editorMode.value !== "basic") {
    return;
  }

  prettyJson.value = value;
}
</script>

<template>
  <div class="size-full">
    <Export />
    <Tabs default-value="raw_edit" class="size-full" v-model="activeTab">
      <div class="w-full flex justify-between flex-wrap gap-2">
      <div class="flex w-full flex-wrap justify-between gap-2">
        <div
          class="grid grid-cols-2 md:grid-cols-none md:flex gap-2 items-center w-full md:w-auto"
          class="flex w-full flex-wrap items-center gap-2 md:w-auto"
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
          <div
            class="flex items-center gap-2 rounded-md border border-border/60 px-3 py-1.5"
          >
            <Checkbox
              id="pretty-json-toggle"
              :checked="prettyJson"
              :disabled="editorMode !== 'basic'"
              @update:checked="onPrettyJsonToggle"
            />
            <Label
              for="pretty-json-toggle"
              class="text-sm font-medium text-foreground"
            >
              Pretty JSON
            </Label>
          </div>
          <Select v-model="modeSelection">
            <SelectTrigger class="w-full md:w-[160px]">
              <SelectValue placeholder="Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </SelectContent>
          </Select>
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
        <EditorTypesRawEditor
          ref="rawEditorRef"
          :mode="editorMode"
          :pretty-json="prettyJson"
          @update:pretty-json="prettyJson = $event"
        />
      </TabsContent>
    </Tabs>

    <Dialog v-model:open="showRestoreModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restaurez le fichier à son état d'origine</DialogTitle>
          <DialogDescription>
            Restaurez le fichier à son état d'origine ? Vous perdrez toutes vos modifications.
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
