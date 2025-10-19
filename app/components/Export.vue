<script lang="ts" setup>
import { createReusableTemplate, useMediaQuery } from "@vueuse/core";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import exportUtil from "~/utils/exportFile";
import { toast } from "vue-sonner";

// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate();
const isDesktop = useMediaQuery("(min-width: 768px)");

const exportModal = useExportModal();
const filesStore = useFilesStore();

async function copy() {
  try {
    const result = await exportUtil(exportModal.state.value.fileIndex);
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  } catch (error) {
    console.error(error);
    toast.error(
      error instanceof Error ? error.message : "Failed to copy or export"
    );
  } finally {
    exportModal.state.value.visible = false;
  }
}

async function saveFile() {
  try {
    const index = exportModal.state.value.fileIndex;
    const result = await exportUtil(index);

    const originalName = filesStore.files[index]?.name || "export.json";
    const filename = originalName.toLowerCase().endsWith(".json")
      ? originalName
      : `${originalName}.json`;

    const blob = new Blob([result], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    toast.success("Download started");
  } catch (error) {
    console.error(error);
    toast.error(error instanceof Error ? error.message : "Failed to save file");
  } finally {
    exportModal.state.value.visible = false;
  }
}
</script>

<template>
  <UseTemplate>
    <div class="grid md:grid-cols-2 grid-cols-2 gap-3">
      <div class="size-full">
        <AspectRatio :ratio="1">
          <Button
            variant="secondary"
            class="size-full flex-col items-center"
            @click="copy()"
          >
            <Icon name="lucide:files" class="text-5xl" /> Copier
          </Button>
        </AspectRatio>
      </div>
      <div class="size-full">
        <AspectRatio :ratio="1">
          <Button
            variant="secondary"
            class="size-full flex-col items-center"
            @click="saveFile()"
          >
            <Icon name="lucide:download" class="text-5xl" /> Enregistrer le fichier
          </Button>
        </AspectRatio>
      </div>
    </div>
  </UseTemplate>

  <Dialog v-if="isDesktop" v-model:open="exportModal.state.value.visible">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Exporter</DialogTitle>
        <DialogDescription>
          Exporter le fichier
          {{ filesStore.files[exportModal.state.value.fileIndex]!.name }}
        </DialogDescription>
      </DialogHeader>
      <GridForm />
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="exportModal.state.value.visible">
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>Exporter</DrawerTitle>
        <DrawerDescription>
          Exporter le fichier
          {{ filesStore.files[exportModal.state.value.fileIndex]!.name }}
        </DrawerDescription>
      </DrawerHeader>
      <div class="px-4">
        <GridForm />
      </div>
      <DrawerFooter class="pt-2"> </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
