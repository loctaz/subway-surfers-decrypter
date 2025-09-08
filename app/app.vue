<script setup lang="ts">
import "vue-sonner/style.css";
</script>

<template>
  <NuxtPwaManifest />
  <Toaster />
  <div class="bg-background size-full">
    <NuxtLayout vaul-drawer-wrapper>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
