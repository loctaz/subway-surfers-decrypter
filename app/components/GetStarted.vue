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
  <div class="flex flex-col items-center justify-center min-h-[80vh] p-4 w-full space-y-8">
    <!-- Carte principale -->
    <Card class="w-full max-w-xl text-center">
      <CardHeader>
        <div
          class="mx-auto mb-2 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Icon name="lucide:folder-open" class="w-8 h-8 text-primary" />
        </div>
        <CardTitle>Commencer</CardTitle>
        <CardDescription>
          Importez vos fichiers de profil Subway Surfers pour les consulter et les modifier.
          Vous pouvez sélectionner directement des fichiers JSON ou coller du contenu
          directement depuis votre presse-papiers. Vous pouvez aussi simplement copier le
          <strong>texte</strong> du fichier.
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
          <strong>Astuce :</strong> vous pouvez également glisser-déposer des fichiers .json
          n'importe où sur la page ou appuyer sur Ctrl/Cmd+V pour les coller.
        </p>
      </CardContent>
    </Card>

    <!-- Deux rectangles du bas -->
    <div class="w-full max-w-5xl flex flex-col sm:flex-row gap-6 justify-between">
      <!-- Efficacité -->
      <Card class="w-full sm:w-[48%] flex items-center gap-4 px-0 py-5 rounded-lg border border-border/40 bg-transparent">
        <div class="w-14 h-14 rounded-full bg-[#1f1f1f] flex items-center justify-center shrink-0 border border-border/30 ml-6 mr-4">
          <Icon name="lucide:shield-check" class="w-6 h-6 text-white/90" />
        </div>
        <div class="flex-1 pr-6">
          <p class="font-semibold text-white">Efficacité</p>
          <p class="text-sm text-muted-foreground mt-1">
            Service rapide, précis et disponible à tout moment.
          </p>
        </div>
      </Card>

      <!-- Performance -->
      <Card class="w-full sm:w-[48%] flex items-center gap-4 px-0 py-5 rounded-lg border border-border/40 bg-transparent">
        <div class="w-14 h-14 rounded-full bg-[#1f1f1f] flex items-center justify-center shrink-0 border border-border/30 ml-6 mr-4">
          <Icon name="lucide:zap" class="w-6 h-6 text-white/90" />
        </div>
        <div class="flex-1 pr-6">
          <p class="font-semibold text-white">Performance</p>
          <p class="text-sm text-muted-foreground mt-1">
            Système optimisé avec un déchiffrement instantané.
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>
