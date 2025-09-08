<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import getIcon from "@/utils/getIcon";
import uploadFiles from "@/utils/uploadFile";
import { toast } from "vue-sonner";
import importFromPaste from "~/utils/importFromPaste";

const filesStore = useFilesStore();
const exportModal = useExportModal();
const colorMode = useColorMode();

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: "inset",
});

async function uploadFilesFromBtn() {
  try {
    await uploadFiles();
  } catch (error) {
    console.error(error);
    toast.error(error instanceof Error ? error.message : "Unknown error");
  }
}

const siteUrl = useRequestURL().origin;
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <div class="px-2 py-1 text-sm font-semibold">
        Subway Surfers Decrypter
      </div>
      <span
        :to="siteUrl"
        :external="true"
        target="_blank"
        aria-label="Open site URL"
        class="px-2 text-xs opacity-70 transition-opacity flex items-center gap-1 min-w-0"
      >
        <Icon name="lucide:globe" class="h-3 w-3 flex-shrink-0" />
        <span class="truncate">{{ siteUrl }}</span>
      </span>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Actions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuButton @click="uploadFilesFromBtn"
            ><Icon name="lucide:upload" /> Upload file(s)</SidebarMenuButton
          >
          <SidebarMenuButton @click="importFromPaste"
            ><Icon name="lucide:clipboard" /> Paste from
            clipboard</SidebarMenuButton
          >
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel v-if="filesStore.files.length > 0"
          >Loaded files</SidebarGroupLabel
        >
        <SidebarGroupContent v-auto-animate>
          <ContextMenu v-for="(file, index) in filesStore.files" :key="file.id">
            <ContextMenuTrigger>
              <SidebarMenuButton
                class="flex items-center gap-2 min-w-0"
                @click="filesStore.setSelectedIndex(index)"
              >
                <Icon :name="getIcon(file.name)" class="flex-shrink-0" />
                <span class="truncate">{{ file.name }}</span>
              </SidebarMenuButton></ContextMenuTrigger
            >
            <ContextMenuContent>
              <ContextMenuLabel class="flex items-center gap-2"
                ><Icon :name="getIcon(file.name)" class="flex-shrink-0" />
                {{ file.name }}</ContextMenuLabel
              >
              <ContextMenuItem @click="exportModal.showModal(index)"
                ><Icon name="lucide:download" /> Export</ContextMenuItem
              >
              <ContextMenuItem
                class="text-red-600"
                @click="filesStore.removeFile(index)"
                ><Icon name="lucide:trash" /> Delete</ContextMenuItem
              >
            </ContextMenuContent>
          </ContextMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <NuxtLink
        class="flex items-center gap-2 min-w-0 hover:bg-sidebar-accent px-2 py-1 rounded-md"
        to="https://subway.herrerde.xyz/"
        :external="true"
        target="_blank"
      >
        <Icon name="lucide:rocket" class="flex-shrink-0" />
        <span class="truncate">SubwayGen</span>
      </NuxtLink>
      <NuxtLink
        class="flex items-center gap-2 min-w-0 hover:bg-sidebar-accent px-2 py-1 rounded-md"
        to="https://github.com/HerrErde/SubwayBooster"
        :external="true"
        target="_blank"
      >
        <Icon name="lucide:rocket" class="flex-shrink-0" />
        <span class="truncate">SubwayBooster</span>
      </NuxtLink>

      <Separator />

      <NuxtLink
        class="flex items-center gap-2 min-w-0 hover:bg-sidebar-accent px-2 py-1 rounded-md"
        to="https://discord.gg/nghc84wjSZ"
        :external="true"
        target="_blank"
      >
        <Icon name="ic:baseline-discord" class="flex-shrink-0" />
        <span class="truncate">Discord</span>
      </NuxtLink>

      <NuxtLink
        class="flex items-center gap-2 min-w-0 hover:bg-sidebar-accent px-2 py-1 rounded-md"
        to="https://github.com/le0o0oo/subway-surfers-decrypter"
        :external="true"
        target="_blank"
      >
        <Icon name="lucide:github" class="flex-shrink-0" />
        <span class="truncate">GitHub</span>
      </NuxtLink>

      <Separator />

      <DropdownMenu>
        <DropdownMenuTrigger as-child
          ><SidebarMenuButton
            ><Icon name="lucide:monitor" /> Theme</SidebarMenuButton
          ></DropdownMenuTrigger
        >
        <DropdownMenuContent>
          <DropdownMenuItem @click="colorMode.preference = 'light'"
            ><Icon name="lucide:sun" /> Light</DropdownMenuItem
          >
          <DropdownMenuItem @click="colorMode.preference = 'dark'"
            ><Icon name="lucide:moon" /> Dark</DropdownMenuItem
          >
          <DropdownMenuItem @click="colorMode.preference = 'system'"
            ><Icon name="lucide:monitor" /> System</DropdownMenuItem
          >
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  </Sidebar>
</template>
