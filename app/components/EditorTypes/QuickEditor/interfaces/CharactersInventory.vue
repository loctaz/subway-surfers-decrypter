<script lang="ts" setup>
import { nextTick } from "vue";
import { refDebounced } from "@vueuse/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const filesStore = useFilesStore();

const searchQuery = ref("");
const debouncedQuery = refDebounced(searchQuery, 300);

const filteredOwned = computed(() => {
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const owned = ((file?.data as any)?.owned ?? {}) as Record<string, any>;
  const q = debouncedQuery.value.trim().toLowerCase();
  if (!q) return owned;

  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(owned)) {
    const id = String((value as any)?.id ?? "").toLowerCase();
    if (key.toLowerCase().includes(q) || id.includes(q)) {
      result[key] = value;
    }
  }
  return result;
});

const selected = computed<{ character: string; outfit: string }>(() => {
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const data = file.data as any;
  if (!data.selected) {
    data.selected = { character: "", outfit: "" };
  }
  return data.selected as { character: string; outfit: string };
});

// Computed helpers kept minimal to avoid unnecessary reactivity bloat

/*
structre

{
{
  "lastSaved": "2025-03-24T15:43:14.124716Z",
  "patchVersion": 3,
  "selected": {
    "character": "characterId",
    "outfit": "outfitId"
  },
  "owned": {
    "characterId": {
      "id": "characterId",
      "ownedOutfits": ["outfitId1", "outfitId2", "outfitId3"],
      "lastOutfit": "outfitId"
    }
  }
}
*/

function updateCharacterIdLive(
  oldKey: string | number,
  newId: string | number
) {
  const key = String(oldKey);
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const owned = (file.data as any).owned as Record<string, any>;
  if (owned && owned[key]) {
    owned[key].id = String(newId);
  }
}

function renameCharacterKeyOnBlur(oldKey: string | number) {
  const key = String(oldKey);
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const owned = (file.data as any).owned as Record<string, any>;
  if (!owned || !owned[key]) return;

  const newKey = String(owned[key].id);
  if (!newKey || newKey === key) return;

  // Rebuild object to keep insertion order, effectively renaming the key in place.
  const rebuilt: Record<string, any> = {};
  for (const [k, value] of Object.entries(owned)) {
    if (k === key) {
      rebuilt[newKey] = value;
    } else {
      rebuilt[k] = value;
    }
  }
  (file.data as any).owned = rebuilt;
  // Update selection if the renamed character was selected
  if ((file.data as any).selected?.character === key) {
    (file.data as any).selected.character = newKey;
  }
}

function addCharacter() {
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const owned = ((file.data as any).owned ??= {}) as Record<string, any>;

  const base = "new_character";
  let candidate = base;
  let suffix = 1;
  while (owned[candidate]) {
    candidate = `${base}_${suffix++}`;
  }

  const newEntry = {
    id: candidate,
    ownedOutfits: ["default"],
    lastOutfit: "default",
  };

  // Append new entry at the bottom to preserve existing order
  owned[candidate] = newEntry;

  nextTick().then(() => {
    const selector = `[data-character-id-input="${candidate}"]`;
    const el = document.querySelector<HTMLInputElement>(selector);
    if (el) {
      el.focus();
      el.select?.();
      el.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  });
}

function deleteCharacter(characterKey: string) {
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const owned = (file.data as any).owned as Record<string, any>;
  delete owned[characterKey];
  const sel = (file.data as any).selected as
    | { character?: string; outfit?: string }
    | undefined;
  if (sel && sel.character === characterKey) {
    const firstKey = Object.keys(owned)[0] ?? "";
    sel.character = firstKey;
    const outfits = owned[firstKey]?.ownedOutfits ?? [];
    sel.outfit =
      owned[firstKey]?.lastOutfit &&
      outfits.includes(owned[firstKey].lastOutfit)
        ? owned[firstKey].lastOutfit
        : outfits[0] ?? "";
  }
}

function deleteOutfit(characterKey: string, outfitIndex: number) {
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const owned = (file.data as any).owned as Record<string, any>;
  const removed = owned[characterKey].ownedOutfits.splice(outfitIndex, 1)[0];
  // Fix selection/lastOutfit if needed
  if (
    (file.data as any).selected?.character === characterKey &&
    (file.data as any).selected?.outfit === removed
  ) {
    const outfits = owned[characterKey].ownedOutfits;
    (file.data as any).selected.outfit =
      owned[characterKey].lastOutfit &&
      outfits.includes(owned[characterKey].lastOutfit)
        ? owned[characterKey].lastOutfit
        : outfits[0] ?? "";
  }
  if (owned[characterKey].lastOutfit === removed) {
    owned[characterKey].lastOutfit = owned[characterKey].ownedOutfits[0] ?? "";
  }
}

async function addOutfit(characterKey: string) {
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const owned = (file.data as any).owned as Record<string, any>;
  const outfits = (owned[characterKey].ownedOutfits ??= []);

  const base = "new_outfit";
  let candidate = base;
  let suffix = 1;
  while (outfits.includes(candidate)) {
    candidate = `${base}_${suffix++}`;
  }
  outfits.push(candidate);
  await nextTick();
  const selector = `[data-outfit-input="${characterKey}-${
    outfits.length - 1
  }"]`;
  const el = document.querySelector<HTMLInputElement>(selector);
  if (el) {
    el.focus();
    el.select?.();
    el.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }
}

function setSelectedCharacter(characterKey: string) {
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const owned = (file.data as any).owned as Record<string, any>;
  const sel = ((file.data as any).selected ??= { character: "", outfit: "" });
  sel.character = characterKey;
  const outfits = owned[characterKey]?.ownedOutfits ?? [];
  sel.outfit =
    owned[characterKey]?.lastOutfit &&
    outfits.includes(owned[characterKey].lastOutfit)
      ? owned[characterKey].lastOutfit
      : outfits[0] ?? "";
}

function setLastOutfit(characterKey: string, outfitId: string) {
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const owned = (file.data as any).owned as Record<string, any>;
  owned[characterKey].lastOutfit = outfitId;
  if ((file.data as any).selected?.character === characterKey) {
    // Keep selected outfit in sync if desired
    (file.data as any).selected.outfit = outfitId;
  }
}

function onToggleSelectedCharacter(
  characterKey: string,
  makeSelected: boolean
) {
  const file = filesStore.files[filesStore.selectedIndex!]!;
  const sel = ((file.data as any).selected ??= { character: "", outfit: "" });
  if (makeSelected) {
    setSelectedCharacter(characterKey);
  } else if (sel.character === characterKey) {
    sel.character = "";
    sel.outfit = "";
  }
}
</script>

<template>
  <div class="space-y-4">
    <div
      class="flex flex-col md:flex-row items-stretch md:items-center gap-2 p-1"
    >
      <div class="w-full md:flex-1">
        <Input v-model="searchQuery" placeholder="Search characters…" />
      </div>
      <Button class="w-full md:w-auto" variant="default" @click="addCharacter">
        <Icon name="lucide:plus" class="mr-1" /> Add character
      </Button>
    </div>

    <div
      class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2"
      v-auto-animate
    >
      <Card
        v-for="(characterData, characterKey) in filteredOwned"
        :key="characterKey"
        class="transition-all duration-200 hover:shadow-md border-border/60 bg-card/70 backdrop-blur-sm"
        :class="
          selected.character === characterKey
            ? 'ring-2 ring-primary/60 border-primary/50'
            : ''
        "
      >
        <CardHeader>
          <div class="flex w-full justify-between items-center">
            <CardTitle class="truncate text-base">{{ characterKey }}</CardTitle>
            <button
              class="hover:bg-accent p-2 pb-1 rounded-md"
              @click="deleteCharacter(characterKey as unknown as string)"
            >
              <Icon name="lucide:x" class="text-red-600" />
            </button>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div class="flex items-center gap-2">
            <Label class="w-16 shrink-0 text-sm text-muted-foreground"
              >ID</Label
            >
            <Input
              :model-value="characterData.id"
              @update:modelValue="
                (val) => updateCharacterIdLive(characterKey, val)
              "
              @blur="() => renameCharacterKeyOnBlur(characterKey)"
              :data-character-id-input="characterData.id"
            />
          </div>
          <div class="flex items-center gap-2 w-full justify-between">
            <Label class="w-16 shrink-0 text-sm text-muted-foreground">
              Selected
            </Label>
            <Button
              size="sm"
              :variant="
                selected.character === characterKey ? 'default' : 'secondary'
              "
              @click="
                onToggleSelectedCharacter(
                  characterKey as unknown as string,
                  selected.character !== characterKey
                )
              "
            >
              <Icon
                :name="
                  selected.character === characterKey
                    ? 'lucide:check-circle-2'
                    : 'lucide:dot'
                "
                class="mr-1 h-4 w-4"
              />
              {{ selected.character === characterKey ? "Selected" : "Select" }}
            </Button>
          </div>
          <div class="flex items-center gap-2 w-full justify-between">
            <Label class="w-16 shrink-0 text-sm text-muted-foreground">
              Outfit
            </Label>
            <Select
              v-model="characterData.lastOutfit"
              @update:modelValue="(val) => setLastOutfit(characterKey as unknown as string, String(val ?? ''))"
            >
              <SelectTrigger size="sm">
                <SelectValue placeholder="Select outfit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="(outfit, outfitIndex) in characterData.ownedOutfits"
                  :key="`${characterKey}-select-${outfitIndex}`"
                  :value="outfit as string"
                >
                  {{ outfit }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="w-full">
            <Collapsible>
              <CollapsibleTrigger
                class="justify-between hover:px-2 transition-all py-1 rounded-md w-full items-center flex text-sm text-muted-foreground hover:bg-accent border border-transparent hover:border-border/60"
                ><span>Outfits</span> <Icon name="lucide:chevron-down"
              /></CollapsibleTrigger>
              <CollapsibleContent
                class="space-y-2 mt-2 p-2 rounded-md border bg-muted/10"
              >
                <div
                  class="flex items-center gap-2"
                  v-for="(outfit, outfitIndex) in characterData.ownedOutfits"
                  :key="`${characterKey}-${outfitIndex}`"
                >
                  <Input
                    v-model="characterData.ownedOutfits[outfitIndex]"
                    :data-outfit-input="`${characterKey}-${outfitIndex}`"
                  />

                  <button
                    class="hover:bg-accent p-2 pb-1 rounded-md"
                    @click="
                      deleteOutfit(
                        characterKey as unknown as string,
                        outfitIndex
                      )
                    "
                  >
                    <Icon name="lucide:x" class="text-red-600" />
                  </button>
                </div>
                <div class="pt-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    @click="addOutfit(characterKey as unknown as string)"
                  >
                    <Icon name="lucide:plus" class="mr-1 h-4 w-4" /> Add outfit
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
        <!-- <CardFooter></CardFooter> -->
      </Card>
    </div>
  </div>
</template>

<style></style>
