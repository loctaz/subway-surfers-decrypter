<template>
  <div class="size-full flex flex-col items-center justify-center">
    <Icon name="lucide:frown" class="text-4xl" />
    <span class="text-xl text-muted-foreground"
      >Aucun éditeur rapide disponible pour ce fichier</span
    >
    <Button @click="$emit('useOther')" class="mt-4" size="lg"
      >Utiliser l'éditeur brut</Button
    >
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
