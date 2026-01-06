<script setup lang="ts">
import { inject } from "@vercel/analytics";
import "vue-sonner/style.css";
import { toast } from "vue-sonner";
import { ref, watch, onMounted } from 'vue';

const { $pwa } = useNuxtApp();

// Variable réactive pour contrôler l'affichage de l'alerte de mise à jour
const showUpdateDialog = ref(false);

// Mise à jour de l'état de l'alerte uniquement côté client
onMounted(() => {
  inject(import.meta.env.VERCEL_ANALYTICS_ID);
});

// Écoute les changements de $pwa.needRefresh uniquement côté client
watch(
  () => process.client ? $pwa?.needRefresh : false,
  (needRefresh) => {
    showUpdateDialog.value = Boolean(needRefresh);
  },
  { immediate: true }
);
</script>

<template>
  <NuxtPwaManifest />
  <Toaster />
  <div class="bg-background size-full">
    <NuxtLayout vaul-drawer-wrapper>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <!-- Utilisation de ClientOnly pour garantir que l'alerte ne s'affiche que côté client -->
  <ClientOnly>
    <AlertDialog v-model:open="showUpdateDialog">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mise à jour disponible</AlertDialogTitle>
          <AlertDialogDescription>
            Une nouvelle mise à jour est disponible. Veuillez actualiser la page pour obtenir la dernière version.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction @click="$pwa?.updateServiceWorker()">
            Mise à jour
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </ClientOnly>
</template>
