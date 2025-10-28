<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import uploadFiles from "@/utils/uploadFile";
import importFromPaste from "@/utils/importFromPaste";
import { toast } from "vue-sonner";

async function uploadFilesFromBtn() {
  try {
    await uploadFiles();
  } catch (error) {
    console.error(error);
    toast.error(error instanceof Error ? error.message : "Unknown error");
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] p-4 w-full bg-gray-900 text-white">
    <!-- Carte centrale -->
    <Card class="w-full max-w-xl text-center bg-gray-800 border-gray-700">
      <CardHeader>
        <div class="mx-auto mb-2 size-14 rounded-full bg-gray-700 flex items-center justify-center">
          <Icon name="lucide:folder-open" class="size-8 text-gray-200" />
        </div>
        <CardTitle class="text-white">Commencer</CardTitle>
        <CardDescription class="text-gray-300">
          Importez vos fichiers de profil Subway Surfers pour les consulter et les modifier. Vous
          pouvez sélectionner directement des fichiers JSON ou coller du contenu directement depuis votre
          presse-papiers. Vous pouvez aussi simplement copier le <strong>texte</strong> du fichier.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <Button class="bg-gray-700 hover:bg-gray-600 text-white">
            <Icon name="lucide:upload" class="mr-2" />
            Télécharger le(s) fichier(s)
          </Button>
          <Button variant="secondary" class="bg-gray-700 hover:bg-gray-600 text-white">
            <Icon name="lucide:clipboard" class="mr-2" />
            Coller depuis le presse-papiers
          </Button>
        </div>
        <p class="mt-4 text-xs text-gray-400">
          <strong>Astuce :</strong> vous pouvez également glisser-déposer des fichiers .json n'importe où sur la page ou
          appuyer sur Ctrl/Cmd+V pour les coller.
        </p>
      </CardContent>
    </Card>

    <!-- Deux rectangles en bas -->
    <div class="flex flex-row gap-4 w-full max-w-xl mt-8 px-0">
      <!-- Rectangle Efficacité -->
      <Card class="flex-1 min-w-0 bg-gray-900 border-gray-700">
        <CardContent class="flex items-center gap-4 p-4 h-20 bg-gray-800 rounded-lg">
          <div class="size-12 rounded-full bg-gray-700 flex items-center justify-center">
            <Icon name="lucide:shield-check" class="size-6 text-gray-200" />
          </div>
          <div>
            <h3 class="font-bold text-lg text-white">Efficacité</h3>
            <p class="text-sm text-gray-300">
              Service rapide, précis et disponible à tout moment.
            </p>
          </div>
        </CardContent>
      </Card>
      <!-- Rectangle Performance -->
      <Card class="flex-1 min-w-0 bg-gray-900 border-gray-700">
        <CardContent class="flex items-center gap-4 p-4 h-20 bg-gray-800 rounded-lg">
          <div class="size-12 rounded-full bg-gray-700 flex items-center justify-center">
            <Icon name="lucide:zap" class="size-6 text-gray-200" />
          </div>
          <div>
            <h3 class="font-bold text-lg text-white">Performance</h3>
            <p class="text-sm text-gray-300">
              Système optimisé avec un déchiffrement instantané.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style>
/* Styles personnalisés pour correspondre au screenshot */
:root {
  --background: 10 10 20;
  --card: 20 20 30;
  --border: 50 50 60;
}

.bg-gray-900 {
  background-color: rgb(var(--background));
}

.bg-gray-800 {
  background-color: rgb(var(--card));
}

.border-gray-700 {
  border-color: rgb(var(--border));
}
</style>
