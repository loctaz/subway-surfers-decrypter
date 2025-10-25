<script setup lang="ts">
import { inject } from "@vercel/analytics";
import "vue-sonner/style.css";
import { toast } from "vue-sonner";
import { ref, onMounted } from "vue";

const { $pwa } = useNuxtApp();

// === 🔹 Gestion des fichiers chargés ===
const loadedFiles = ref<Record<string, string>>({});

// Charger les fichiers sauvegardés au démarrage
onMounted(() => {
  inject(import.meta.env.VERCEL_ANALYTICS_ID);

  const saved = localStorage.getItem("uploaded_files");
  if (saved) {
    loadedFiles.value = JSON.parse(saved);
  }
});

// Fonction de chargement de fichiers
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const text = await file.text();
  loadedFiles.value[file.name] = text;

  localStorage.setItem("uploaded_files", JSON.stringify(loadedFiles.value));
  toast.success(`Fichier "${file.name}" sauvegardé localement ✅`);
};
</script>

<template>
  <NuxtPwaManifest />
  <Toaster />

  <div class="bg-background size-full p-4">
    <NuxtLayout vaul-drawer-wrapper>
      <NuxtPage />
    </NuxtLayout>

    <!-- === 🔹 Interface d’upload persistante === -->
    <div class="fixed bottom-4 right-4 bg-white/10 backdrop-blur p-4 rounded-2xl shadow-lg">
      <h3 class="text-sm font-bold mb-2 text-white">Fichiers chargés :</h3>
      <input type="file" @change="handleFileUpload" class="text-xs text-white" />

      <ul class="text-xs text-white mt-2 max-h-40 overflow-auto">
        <li v-for="(content, name) in loadedFiles" :key="name">
          📄 {{ name }}
        </li>
      </ul>
    </div>
  </div>

  <!-- === PWA AlertDialog existant === -->
  <AlertDialog v-model:open="$pwa!.needRefresh">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Mise à jour disponible</AlertDialogTitle>
        <AlertDialogDescription>
          Une nouvelle mise à jour est disponible. Veuillez actualiser la page pour obtenir la dernière
          version.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="$pwa?.updateServiceWorker()">Update</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

