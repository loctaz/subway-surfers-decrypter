<script lang="ts" setup>
import { nextTick, computed, ref, watch } from "vue";
import JsonEditorVue from "json-editor-vue";
import "vanilla-jsoneditor/themes/jse-theme-dark.css";
import { toast } from "vue-sonner";

const props = defineProps<{
  mode: "advanced" | "basic";
  prettyJson: boolean;
}>();

const emit = defineEmits<{
  (event: "update:prettyJson", value: boolean): void;
}>();

const filesStore = useFilesStore();
const colorMode = useColorMode();

const currentFile = computed(() => {
  if (filesStore.selectedIndex === null) {
    return null;
  }

  return filesStore.files[filesStore.selectedIndex] ?? null;
});

const advancedModel = computed({
  get() {
    return currentFile.value?.data ?? {};
  },
  set(value) {
    if (!currentFile.value) {
      return;
    }

    currentFile.value.data = value as Record<string, any>;
  },
});

const basicContent = ref("");
const basicContentIsDirty = ref(false);
const parseError = ref<string | null>(null);

let isProgrammaticBasicUpdate = false;

function setBasicContent(value: string, options: { markDirty?: boolean; resetError?: boolean } = {}) {
  isProgrammaticBasicUpdate = true;
  basicContent.value = value;
  basicContentIsDirty.value = options.markDirty ?? false;

  if (options.resetError !== false) {
    parseError.value = null;
  }

  nextTick(() => {
    isProgrammaticBasicUpdate = false;
  });
}

function stringifyCurrentData(indent: number | undefined) {
  if (!currentFile.value) {
    return "";
  }

  try {
    return JSON.stringify(currentFile.value.data, null, indent);
  } catch {
    return "";
  }
}

function syncBasicContentFromStore() {
  const indent = props.prettyJson ? 2 : undefined;
  setBasicContent(stringifyCurrentData(indent));
}

function applyBasicContentToStore({ showToast }: { showToast: boolean }) {
  if (!currentFile.value) {
    return true;
  }

  try {
    if (basicContent.value.trim() === "") {
      throw new Error("JSON vide");
    }

    const parsed = JSON.parse(basicContent.value);
    currentFile.value.data = parsed;
    parseError.value = null;
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    parseError.value = message;

    if (showToast) {
      toast.error("Impossible de formater : JSON invalide");
    }

    return false;
  }
}

watch(
  () => props.mode,
  (mode) => {
    if (mode === "basic") {
      syncBasicContentFromStore();
    }
  },
  { immediate: true }
);

watch(
  currentFile,
  () => {
    if (props.mode === "basic") {
      syncBasicContentFromStore();
    }
  }
);

watch(
  () => currentFile.value?.data,
  () => {
    if (props.mode === "basic" && !basicContentIsDirty.value) {
      syncBasicContentFromStore();
    }
  },
  { deep: true }
);

watch(basicContent, (text) => {
  if (props.mode !== "basic" || isProgrammaticBasicUpdate || !currentFile.value) {
    return;
  }

  basicContentIsDirty.value = true;

  try {
    if (text.trim() === "") {
      throw new Error("JSON vide");
    }

    const parsed = JSON.parse(text);
    currentFile.value.data = parsed;
    parseError.value = null;
  } catch (error) {
    parseError.value = error instanceof Error ? error.message : String(error);
  }
});

watch(
  () => props.prettyJson,
  (pretty) => {
    if (props.mode !== "basic") {
      return;
    }

    const success = applyBasicContentToStore({ showToast: false });

    if (!success) {
      emit("update:prettyJson", !pretty);
      toast.error("Impossible de formater : JSON invalide");
      return;
    }

    const indent = pretty ? 2 : undefined;
    setBasicContent(stringifyCurrentData(indent));
  }
);

function canSwitchMode(targetMode: "advanced" | "basic") {
  if (targetMode === "advanced" && props.mode === "basic") {
    return applyBasicContentToStore({ showToast: true });
  }

  if (targetMode === "basic") {
    syncBasicContentFromStore();
  }

  return true;
}

defineExpose({
  canSwitchMode,
  syncBasicContentFromStore,
});
</script>

<template>
  <div class="size-full">
    <JsonEditorVue
      v-model="filesStore.files[filesStore.selectedIndex!]!.data"
      :class="colorMode.value == 'dark' && 'jse-theme-dark'"
    <div
      v-if="props.mode === 'advanced' && currentFile"
      class="h-full max-h-[calc(100vh-140px)]"
    />
    >
      <JsonEditorVue
        v-model="advancedModel"
        :class="colorMode.value === 'dark' && 'jse-theme-dark'"
        class="size-full"
      />
    </div>

    <div
      v-else-if="props.mode === 'basic' && currentFile"
      class="h-full max-h-[calc(100vh-140px)]"
    >
      <textarea
        v-model="basicContent"
        spellcheck="false"
        class="h-full w-full resize-none rounded-md border border-border bg-background px-3 py-2 font-mono text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
      />

      <p v-if="parseError" class="mt-2 text-sm text-destructive">
        {{ parseError }}
      </p>
    </div>

    <div
      v-else
      class="flex h-full items-center justify-center text-sm text-muted-foreground"
    >
      Sélectionnez un fichier pour commencer.
    </div>
  </div>
</template>

<style></style>
