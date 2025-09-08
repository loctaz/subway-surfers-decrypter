<script setup lang="ts">
import "vue-sonner/style.css";

const { $pwa } = useNuxtApp();
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
