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
    toast.error(error instanceof Error ? error.message : "Erreur inconnue");
  }
}

const siteUrl = useRequestURL().origin;
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <div class="px-2 py-1 text-sm font-semibold flex items-center gap-1">
        Décrypteur Subway Surfers
        <Icon name="lucide:lock-keyhole-open" class="h-3 w-3 flex-shrink-0" />
      </div>
      <!-- 🌐 Lien principal -->
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

<!-- 💖 Traduit par Loctaz -->
<div class="flex items-center gap-1 px-2 text-xs opacity-70 min-w-0">
  <Icon name="lucide:heart" class="h-3 w-3 flex-shrink-0" />
  <span class="truncate">Loctaz - Contribution</span>
</div>

<!-- 🐙 Crédit à Leo -->
<div class="flex items-center gap-1 px-2 text-xs opacity-70 min-w-0">
  <Icon name="lucide:copyright" class="h-3 w-3 flex-shrink-0" />
  <span class="truncate">Leo - Crédit accordé</span>
</div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Actions</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuButton @click="uploadFilesFromBtn">
            <Icon name="lucide:upload" class="h-4 w-4 flex-shrink-0" />
            Télécharger le(s) fichier(s)
          </SidebarMenuButton>

          <SidebarMenuButton
            @click="importFromPaste"
            class="whitespace-nowrap"
          >
            <Icon name="lucide:clipboard" class="h-4 w-4 flex-shrink-0" />
            Coller depuis le presse-papiers
          </SidebarMenuButton>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel v-if="filesStore.files.length > 0">
          Fichiers chargés
        </SidebarGroupLabel>
        <SidebarGroupContent v-auto-animate>
          <ContextMenu
            v-for="(file, index) in filesStore.files"
            :key="file.id"
          >
            <ContextMenuTrigger>
              <SidebarMenuButton
                class="flex items-center gap-2 min-w-0"
                @click="filesStore.setSelectedIndex(index)"
              >
                <Icon :name="getIcon(file.name)" class="flex-shrink-0" />
                <span class="truncate">{{ file.name }}</span>
              </SidebarMenuButton>
            </ContextMenuTrigger>

            <ContextMenuContent>
              <ContextMenuLabel class="flex items-center gap-2">
                <Icon :name="getIcon(file.name)" class="flex-shrink-0" />
                {{ file.name }}
              </ContextMenuLabel>
              <ContextMenuItem @click="exportModal.showModal(index)">
                <Icon name="lucide:download" /> Exporter
              </ContextMenuItem>
              <ContextMenuItem
                class="text-red-600"
                @click="filesStore.removeFile(index)"
              >
                <Icon name="lucide:trash" /> Supprimer
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarGroupLabel>Liens</SidebarGroupLabel>

      <NuxtLink
        class="flex items-center gap-2 min-w-0 hover:bg-sidebar-accent px-2 py-1 rounded-md"
        to="https://subway.herrerde.xyz/"
        :external="true"
        target="_blank"
      >
        <Icon name="lucide:wrench" class="flex-shrink-0" />
        <span class="truncate">Subway Gen</span>
      </NuxtLink>

      <NuxtLink
        class="flex items-center gap-2 min-w-0 hover:bg-sidebar-accent px-2 py-1 rounded-md"
        to="https://github.com/HerrErde/Subway Booster"
        :external="true"
        target="_blank"
      >
        <Icon name="lucide:rocket" class="flex-shrink-0" />
        <span class="truncate">Subway Booster</span>
      </NuxtLink>

      <Separator />

      <NuxtLink
        class="flex items-center gap-2 min-w-0 hover:bg-sidebar-accent px-2 py-1 rounded-md"
        to="https://discord.gg/M6EUKX7A3c"
        :external="true"
        target="_blank"
      >
        <Icon name="ic:baseline-discord" class="flex-shrink-0" />
        <span class="truncate">Discord</span>
      </NuxtLink>

      <NuxtLink
        class="flex items-center gap-2 min-w-0 hover:bg-sidebar-accent px-2 py-1 rounded-md"
        to="https://github.com/loctazzz"
        :external="true"
        target="_blank"
      >
        <Icon name="lucide:github" class="flex-shrink-0" />
        <span class="truncate">GitHub</span>
      </NuxtLink>

      <Separator />

      <DropdownMenu>
  <DropdownMenuTrigger as-child>
    <SidebarMenuButton>
      <Icon name="lucide:monitor" /> Thème
    </SidebarMenuButton>
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuItem @click="setTheme('light')">
      <Icon name="lucide:sun" /> Lumière
    </DropdownMenuItem>

    <DropdownMenuItem @click="setTheme('dark')">
      <Icon name="lucide:moon" /> Sombre
    </DropdownMenuItem>

    <DropdownMenuItem @click="setTheme('bleuter')">
      <Icon name="lucide:palette" /> Bleuter
    </DropdownMenuItem>

    <DropdownMenuItem @click="setTheme('system')">
      <Icon name="lucide:monitor" /> Système
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
