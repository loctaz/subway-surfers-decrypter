import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    public: {
      encryptionKey: [
        57, 114, 107, 120, 67, 80, 108, 106, 83, 77, 49, 71, 86, 81, 104, 87,
        119, 49, 114, 49, 114, 75, 79, 72, 71, 99, 99, 98, 50, 105, 74, 53,
      ],
    },
  },

  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/image",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@formkit/auto-animate",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
  ],

  colorMode: {
    classSuffix: "",
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});