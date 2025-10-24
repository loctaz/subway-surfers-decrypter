<script setup lang="ts">
import { inject } from "@vercel/analytics";
import "vue-sonner/style.css";
import { toast } from "vue-sonner";

const { $pwa } = useNuxtApp();

onMounted(() => {
  inject(import.meta.env.VERCEL_ANALYTICS_ID);
});
</script>

<template>
  <NuxtPwaManifest />
  <Toaster />
  <div class="bg-background size-full">
    <NuxtLayout vaul-drawer-wrapper>
      <NuxtPage />
    </NuxtLayout>
  </div>

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
        <AlertDialogAction @click="$pwa?.updateServiceWorker()"
          >Update</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
