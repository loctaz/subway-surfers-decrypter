<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import getIcon from "@/utils/getIcon";
import uploadFiles from "@/utils/uploadFile";
import importFromPaste from "~/utils/importFromPaste";
import { toast } from "vue-sonner";
import { ref, onMounted } from "vue";

import {
  addProfile,
  loadProfiles,
  getActiveProfile,
  removeProfile,
  setActiveProfileId,
  type SavedProfile,
} from "@/utils/profileStorage";

const filesStore = useFilesStore();
const exportModal = useExportModal();
const colorMode = useColorMode();

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: "inset",
});

const siteUrl = useRequestURL().origin;

/* -------------------- PERSISTENCE LOCALE -------------------- */
const history = ref<SavedProfile[]>([]);
const activeId = ref<string>("");

// 1) Restore au démarrage
onMounted(() => {
  history.value = loadProfiles();

  // (Optionnel) Injecter dans le store si tu veux t’en servir ailleurs
  filesStore.files = history.value.map((p) => ({
    id: p.id,
    name: p.name,
    content: p.content,
  }));

  const active = getActiveProfile();
  if (active) activeId.value = active.id;
});

// 2) Importer depuis le système de fichiers et sauvegarder
async function uploadFilesFromBtn() {
  try {
    const files = await uploadFiles(); // <- doit renvoyer File[] (util existant)
    if (!files || !files.length) return;

    for (const f of files) {
      const text = await f.text();
      const json = JSON.parse(text);
      addProfile(f.name, json);
    }

    // refresh UI
    history.value = loadProfiles();
    filesStore.files = history.value.map((p) => ({
      id: p.id,
      name: p.name,
      content: p.content,
    }));

    const active = getActiveProfile();
    if (active) activeId.value = active.id;

    toast.success("Fichier(s) sauvegardé(s) dans le navigateur");
  } catch (error) {
    console.error(error);
    toast.error(error instanceof Error ? error.message : "Erreur inconnue");
  }
}

// 3) Importer depuis le presse-papiers et sauvegarder
async function importFromPasteBtn() {
  try {
    const res = await importFromPaste(); // string | {text} | {content} | objet
    const json =
      typeof res === "string"
        ? JSON.parse(res)
        : res?.text
        ? JSON.parse(res.text)
        : res?.content ?? res;

    const name = res?.name ?? "from-clipboard.json";
    addProfile(name, json);

    history.value = loadProfiles();
    filesStore.files = history.value.map((p) => ({
      id: p.id,
      name: p.name,
      content: p.content,
    }));

    const active = getActiveProfile();
    if (active) activeId.value = active.id;

    toast.success("Contenu collé et sauvegardé");
  } catch (error) {
    console.error(error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Le presse-papiers ne contient pas un JSON valide."
    );
  }
}

// 4) Activer un profil sauvegardé (si tu as une notion d’actif ailleurs)
function makeActive(id: string) {
  setActiveProfileId(id);
  const active = getActiveProfile();
  if (!active) return;
  activeId.value = active.id;

  // si tu utilises un index actif dans le store
  const idx = filesStore.files.findIndex((f) => f.name === active.name);
  if (idx !== -1) filesStore.setSelectedIndex?.(idx);
}

// 5) Supprimer un profil sauvegardé
function deleteSaved(id: string) {
  removeProfile(id);
  history.value = loadProfiles();
  filesStore.files = history.value.map((p) => ({
    id: p.id,
    name: p.name,
    content: p.content,
  }));
  const active = getActiveProfile();
  activeId.value = active?.id ?? "";
  toast("Fichier supprimé du stockage local");
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <div class="px-2 py-1 text-sm font-semibold flex items-center gap-1">
        Décrypteur Subway Surfers
        <Icon name="lucide:lock-keyhole-open" class="h-3 w-3 flex-shrink-0" />
      </div>

      <!-- Lien principal -->
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

      <!-- Crédit -->
      <div class="flex items-center gap-1 px-2 text-xs opacity-70 min-w-0">
        <Icon name="lucide:heart" class="h-3 w-3 flex-shrink-0" />
        <span class="truncate">Loctaz - Contribution</span>
      </div>
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

          <SidebarMenuButton class="whitespace-nowrap" @click="importFromPasteBtn">
            <Icon name="lucide:clipboard" class="h-4 w-4 flex-shrink-0" />
            Coller depuis le presse-papiers
          </SidebarMenuButton>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- FICHIERS CHARGÉS (persistants) -->
      <SidebarGroup>
        <SidebarGroupLabel v-if="history.length > 0">
          Fichiers chargés
        </SidebarGroupLabel>

        <SidebarGroupContent v-auto-animate>
          <ContextMenu v-for="(p, index) in history" :key="p.id">
            <ContextMenuTrigger>
              <SidebarMenuButton
                class="flex items-center gap-2 min-w-0"
                @click="makeActive(p.id)"
              >
                <Icon :name="getIcon(p.name)" class="flex-shrink-0" />
                <span class="truncate">{{ p.name }}</span>
              </SidebarMenuButton>
            </ContextMenuTrigger>

            <ContextMenuContent>
              <ContextMenuLabel class="flex items-center gap-2">
                <Icon :name="getIcon(p.name)" class="flex-shrink-0" />
                {{ p.name }}
              </ContextMenuLabel>

              <ContextMenuItem @click="exportModal.showModal(index)">
                <Icon name="lucide:download" /> Exporter
              </ContextMenuItem>

              <ContextMenuItem class="text-red-600" @click="deleteSaved(p.id)">
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
          <DropdownMenuItem @click="colorMode.preference = 'light'">
            <Icon name="lucide:sun" /> Lumière
          </DropdownMenuItem>
          <DropdownMenuItem @click="colorMode.preference = 'dark'">
            <Icon name="lucide:moon" /> Sombre
          </DropdownMenuItem>
          <DropdownMenuItem @click="colorMode.preference = 'system'">
            <Icon name="lucide:monitor" /> Système
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  </Sidebar>
</template>
