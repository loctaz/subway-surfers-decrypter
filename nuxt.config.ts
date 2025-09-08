import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@formkit/auto-animate",
    "pinia-plugin-persistedstate",
    "@vite-pwa/nuxt",
  ],

  runtimeConfig: {
    public: {
      encryptionKey: [
        57, 114, 107, 120, 67, 80, 108, 106, 83, 77, 49, 71, 86, 81, 104, 87,
        119, 49, 114, 49, 114, 75, 79, 72, 71, 99, 99, 98, 50, 105, 74, 53,
      ],
    },
  },

  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  shadcn: {
    prefix: "",
    componentDir: "./app/components/ui",
  },

  colorMode: {
    classSuffix: "",
  },

  pwa: {
    manifest: {
      short_name: "SS Decryptor",
      name: "Subway Surfers Decryptor",
      icons: [
        {
          src: "/icon.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      start_url: "/",
      display: "standalone",
      theme_color: "black",
      background_color: "black",
    },
  },
});
