<script lang="ts" setup>
const filesStore = useFilesStore();

const diddy = ref(0);

const interfaces = [
  {
    img: "/img/coin.png",
    label: "Coins",
    object: "1",
  },
  {
    img: "/img/keys.png",
    label: "Keys",
    object: "2",
  },
  {
    img: "/img/hoverboard.png",
    label: "Hoverboards",
    object: "3",
  },
  {
    img: "/img/score_boost.png",
    label: "Score boosters",
    object: "5",
  },
  {
    img: "/img/headstart.png",
    label: "Headstarts",
    object: "4",
  },
];
</script>

<template>
  <div class="size-full flex flex-col gap-2">
    <Card v-for="(i, index) in interfaces" :key="index">
      <CardContent class="flex items-center gap-4 flex-wrap md:flex-nowrap">
        <NuxtImg :src="i.img" class="size-8" />

        <h4
          class="font-semibold tracking-tight whitespace-nowrap"
          v-text="i.label"
        ></h4>
        <div class="w-full flex justify-end items-center gap-3">
          <span
            class="flex items-center gap-1 text-red-500"
            v-if="filesStore.files[filesStore.currentFileIndex!]!.content.decrypted[
              'currencies'
            ][i.object]['value'] > 2147483647"
            ><Icon name="lucide:triangle-alert" />32-bit int limit
            exceeded</span
          >
          <NumberField
            :min="0"
            :max="2147483647"
            class="md:max-w-[228px] w-full"
            v-model="
            filesStore.files[filesStore.currentFileIndex!]!.content.decrypted[
              'currencies'
            ][i.object]['value']
          "
          >
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
