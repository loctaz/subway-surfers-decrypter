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
  <div class="flex items-center justify-center min-h-[60vh] p-4 w-full">
    <Card class="w-full max-w-xl text-center">
      <CardHeader>
        <div
          class="mx-auto mb-2 size-14 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Icon name="lucide:folder-open" class="size-8 text-primary" />
        </div>
        <CardTitle>Get started</CardTitle>
        <CardDescription>
          Import your Subway Surfers profile files to view and edit them. You
          can directly select JSON files or paste content directly from your
          clipboard. You can also just copy the <strong>text</strong> of the
          file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <Button @click="uploadFilesFromBtn">
            <Icon name="lucide:upload" />
            Upload file(s)
          </Button>
          <Button variant="secondary" @click="importFromPaste">
            <Icon name="lucide:clipboard" />
            Paste from clipboard
          </Button>
        </div>
        <p class="mt-4 text-xs opacity-70">
          Tip: You can also drag & drop .json files anywhere on the page or
          press Ctrl/Cmd+V to paste.
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<style></style>
