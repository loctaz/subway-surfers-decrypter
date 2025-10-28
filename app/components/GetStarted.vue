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
    toast.error(error instanceof Error ? error.message : "Erreur inconnue");
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] p-4 w-full">
    <!-- Carte centrale -->
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mt-8 px-4">
      <!-- Rectangle Efficacité -->
      <Card class="w-full md:w-56">
        <CardContent class="flex items-center gap-4 p-4">
          <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="lucide:shield-check" class="size-8 text-primary" />
          </div>
          <div>
            <h3 class="font-bold text-lg">Efficacité</h3>
            <p class="text-sm text-muted-foreground">
              Service rapide, précis et disponible à tout moment.
            </p>
          </div>
        </CardContent>
      </Card>

      <!-- Rectangle Performance -->
      <Card class="w-full md:w-56">
        <CardContent class="flex items-center gap-4 p-4">
          <div class="size-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="lucide:zap" class="size-8 text-primary" />
          </div>
          <div>
            <h3 class="font-bold text-lg">Performance</h3>
            <p class="text-sm text-muted-foreground">
              Système optimisé avec un déchiffrement instantané.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style>
/* Ajoute ici des styles personnalisés si nécessaire */
</style>
