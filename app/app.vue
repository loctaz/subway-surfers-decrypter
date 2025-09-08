<script setup lang="ts">
import { inject } from "@vercel/analytics";
import "vue-sonner/style.css";

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
        <AlertDialogTitle>Update available</AlertDialogTitle>
        <AlertDialogDescription>
          A new update is available. Please refresh the page to get the latest
          version.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="$pwa!.updateServiceWorker()"
          >Update</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
