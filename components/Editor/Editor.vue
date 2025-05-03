<script lang="ts" setup>
import { cn } from "@/lib/utils";

const filesStore = useFilesStore();

const isDesktop = useMediaQuery("(min-width: 768px)");
const isOpen = ref(false);
</script>

<template>
  <div class="size-full">
    <Tabs
      default-value="raw_edit"
      class="w-full"
      v-if="filesStore.currentFileIndex != null"
    >
      <div class="flex items-center gap-2 lg:flex-nowrap flex-wrap">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="quick_edit"> Quick edit </TabsTrigger>
          <TabsTrigger value="raw_edit"> Raw edit </TabsTrigger>
        </TabsList>
        <Button
          variant="outline"
          class="lg:w-auto w-full"
          @click="isOpen = true"
          ><Icon name="lucide:download" />Export</Button
        >
      </div>
      <TabsContent value="raw_edit">
        <div class="size-full h-[calc(100vh-53px-24px-42px)]">
          <EditorJsonEditor />
        </div>
      </TabsContent>
      <TabsContent value="quick_edit">
        <div class="size-full h-[calc(100vh-53px-24px-42px)]">
          work in progress
        </div>
      </TabsContent>
    </Tabs>
    <div class="size-full flex justify-center items-center" v-else>
      <div class="flex flex-col gap-2 items-center">
        <Icon name="lucide:upload" class="text-4xl" />
        <p class="text-lg text-muted-foreground">
          Select a file to start editing
        </p>
      </div>
    </div>

    <Dialog v-if="isDesktop" v-model:open="isOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export file</DialogTitle>
          <DialogDescription>
            <EditorExport @close="isOpen = false" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

    <Drawer v-else v-model:open="isOpen">
      <DrawerContent>
        <DrawerHeader class="text-left">
          <DrawerTitle>Export file</DrawerTitle>
          <DrawerDescription>
            <EditorExport @close="isOpen = false" />
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter class="pt-2">
          <DrawerClose as-child>
            <Button variant="outline"> Cancel </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>

<style></style>
