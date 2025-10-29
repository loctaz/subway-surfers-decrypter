<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import uploadFiles from "@/utils/uploadFile";
import importFromPaste from "@/utils/importFromPaste";
import { toast } from "vue-sonner";

async function uploadFilesFromBtn() {
  try { await uploadFiles(); }
  catch (error) {
    console.error(error);
    toast.error(error instanceof Error ? error.message : "Erreur inconnue");
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] p-4 w-full space-y-8">
    <!-- Carte principale -->
    <Card class="w-full max-w-xl text-center border border-border bg-card shadow-sm">
      <CardHeader>
        <div class="mx-auto mb-2 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
          <Icon name="lucide:folder-open" class="w-8 h-8 text-primary" />
        </div>
        <CardTitle class="text-foreground">Commencer</CardTitle>
        <CardDescription class="text-muted-foreground">
          Importez vos fichiers de profil Subway Surfers pour les consulter et les modifier.
          Vous pouvez sélectionner des fichiers JSON ou coller du contenu
          depuis votre presse-papiers. Vous pouvez aussi simplement copier le
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
        <p class="mt-4 text-xs text-muted-foreground">
          <strong>Astuce :</strong> vous pouvez également glisser-déposer des fichiers .json
          n'importe où sur la page ou appuyer sur Ctrl/Cmd+V pour les coller.
        </p>
      </CardContent>
    </Card>

    <!-- Bannières du bas -->
    <div class="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
      <!-- Efficacité -->
      <Card class="border border-border bg-card rounded-xl shadow-sm">
        <CardContent class="p-0">
          <div class="flex items-center gap-4 px-5 h-16">
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring-1 ring-primary/20 shrink-0"
            >
              <Icon name="lucide:shield-check" class="w-5 h-5 text-primary" />
            </div>
            <div class="flex-1">
              <p class="font-semibold leading-tight text-foreground">Efficacité</p>
              <p class="text-sm leading-tight text-muted-foreground">
                Service rapide, précis et disponible à tout moment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Performance -->
      <Card class="border border-border bg-card rounded-xl shadow-sm">
        <CardContent class="p-0">
          <div class="flex items-center gap-4 px-5 h-16">
            <div
              class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center ring-1 ring-primary/20 shrink-0"
            >
              <Icon name="lucide:zap" class="w-5 h-5 text-primary" />
            </div>
            <div class="flex-1">
              <p class="font-semibold leading-tight text-foreground">Performance</p>
              <p class="text-sm leading-tight text-muted-foreground">
                Système optimisé avec un déchiffrement instantané.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
