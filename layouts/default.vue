<script lang="ts" setup>
import "vanilla-jsoneditor/themes/jse-theme-dark.css";

const colorMode = useColorMode();
</script>

<template>
  <div class="size-full h-screen">
    <div class="w-full p-2 px-3 border-b-[1px] border-border flex items-center">
      <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight w-full">
        Subway surfers decryptor
      </h3>
      <div class="flex justify-end items-center">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline">
              <Icon
                name="lucide:moon"
                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              />
              <Icon
                name="lucide:sun"
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="colorMode.preference = 'light'">
              Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'dark'">
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'system'">
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <div class="p-3 w-full h-[calc(100vh-53px)]">
      <slot />
    </div>
  </div>
</template>

<style></style>
