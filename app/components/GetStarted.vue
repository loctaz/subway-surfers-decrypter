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
  <div class="flex flex-col items-center justify-center min-h-[60vh] p-4 w-full">
    <!-- Carte centrale existante -->
    <Card class="w-full max-w-xl text-center">
      <CardHeader>
        <div class="mx-auto mb-2 size-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="lucide:folder-open" class="size-8 text-primary" />
        </div>
        <CardTitle>Commencer</CardTitle>
        <CardDescription>
          Importez vos fichiers de profil Subway Surfers pour les consulter et les modifier. Vous
          pouvez sélectionner directement des fichiers JSON ou coller du contenu directement depuis votre
          presse-papiers. Vous pouvez aussi simplement copier le <strong>texte</strong> du fichier.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <Button @click="uploadFilesFromBtn">
            <Icon name="lucide:upload" />
            Télécharger le(s) fichier(s)
          </Button>
          <Button variant="secondary" @click="importFromPaste">
            <Icon name="lucide:clipboard" />
            Coller depuis le presse-papiers
          </Button>
        </div>
        <p class="mt-4 text-xs opacity-70">
          <strong>Astuce :</strong> vous pouvez également glisser-déposer des fichiers .json n'importe où sur la page ou
          appuyer sur Ctrl/Cmd+V pour les coller.
        </p>
      </CardContent>
    </Card>

    <!-- Deux rectangles en bas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mt-6 px-4">
      <!-- Rectangle Efficacité -->
      <div class="flex items-center gap-3 p-3 rounded-lg border border-white/30 bg-black/20">
        <div class="size-12 rounded-full bg-gray-700 flex items-center justify-center">
          <Icon name="lucide:shield-check" class="h-12 w-12 text-white" />
        </div>
        <div>
          <h3 class="font-bold text-base">Efficacité</h3>
          <p class="text-xs opacity-80">Service rapide, précis et disponible à tout moment.</p>
        </div>
      </div>

      <!-- Rectangle Performance -->
      <div class="flex items-center gap-3 p-3 rounded-lg border border-white/30 bg-black/20">
        <div class="size-12 rounded-full bg-gray-700 flex items-center justify-center">
          <Icon name="lucide:zap" class="h-12 w-12 text-white" />
        </div>
        <div>
          <h3 class="font-bold text-base">Performance</h3>
          <p class="text-xs opacity-80">Système optimisé avec un déchiffrement instantané.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
