<script lang="ts" setup>
const filesStore = useFilesStore();

const options = [
  {
    img: "/quick_editor/wallet/coin.png",
    label: "Coins",
    object: "1",
  },
  {
    img: "/quick_editor/wallet/keys.png",
    label: "Keys",
    object: "2",
  },
  {
    img: "/quick_editor/wallet/hoverboard.png",
    label: "Hoverboards",
    object: "3",
  },
  {
    img: "/quick_editor/wallet/score_boost.png",
    label: "Score boosters",
    object: "5",
  },
  {
    img: "/quick_editor/wallet/headstart.png",
    label: "Headstarts",
    object: "4",
  },
];
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2"
  >
    <Card class="" v-for="option in options" :key="option.object">
      <CardContent>
        <NumberField
          :min="0"
          :max="2147483647"
          v-model="
            filesStore.files[filesStore.selectedIndex!]!.data.currencies[
              option.object
            ].value
          "
        >
          <div class="flex items-center gap-2 mb-2">
            <img :src="option.img" class="size-8" />
            <Label class="text-xl font-bold">{{ option.label }}</Label>
          </div>
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </CardContent>
    </Card>
  </div>
</template>

<style></style>
