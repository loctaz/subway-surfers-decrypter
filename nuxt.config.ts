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
  app: {
    head: {
      title: "Décrypteur Subway Surfers",
      meta: [
        {
          name: "description",
          content: "Un décrypteur en ligne pour Subway Surfers",
        },
        {
          name: "google-site-verification",
          content: "jct2QYf3X1yQnSgoTAMycauSNDFSzCnZ6ZrypLzZw7o",
        },
      ],
    },
  },

  // nuxt.config.ts
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      id: "https://subway-surfers-decryptefe.vercel.app/",
      name: "Décrypteur Subway Surfers",
      short_name: "SS Decrypter",
      description: "Décrypter les fichiers Subway Surfers",
      theme_color: "black",
      background_color: "black",
      lang: "en",
      orientation: "portrait",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/icon.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
      runtimeCaching: [],
      additionalManifestEntries: [{ url: "/", revision: "2" }],
    },
    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});
