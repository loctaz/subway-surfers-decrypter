import { defineStore } from "pinia";
import TextCipher from "@/utils/TextCipher";

interface LoadedFile {
  id: string;
  name: string;
  version: number;
  originalData: Readonly<Record<string, any>>;
  data: Record<string, any>;
  rawInput: string;
}

export const useFilesStore = defineStore("filesStore", {
  state: () => ({
    files: [] as LoadedFile[],
    selectedIndex: null as number | null,
  }),

  actions: {
    // 🔄 Charger les fichiers sauvegardés au démarrage
    loadFromLocalStorage() {
      const saved = localStorage.getItem("savedFiles");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.files = parsed;
        } catch (e) {
          console.error("Erreur lors du chargement du localStorage :", e);
          this.files = [];
        }
      }
    },

    // 💾 Sauvegarder les fichiers actuels dans le localStorage
    saveToLocalStorage() {
      localStorage.setItem("savedFiles", JSON.stringify(this.files));
    },

    async addFile(content: string, name?: string) {
      if (content.startsWith("{")) {
        const json = JSON.parse(content);
        const jsonData = await TextCipher.decrypt(json.data);
        const parsedJsonData = JSON.parse(jsonData);

        this.files.push({
          id: crypto.randomUUID(),
          name: name || "unknown.json",
          version: json.version,
          originalData: parsedJsonData,
          data: parsedJsonData,
          rawInput: content,
        });

        this.reorderFilesAlphabetically();
        this.selectedIndex = this.files.length - 1;

        this.saveToLocalStorage(); // ✅ Sauvegarde après ajout
      } else {
        throw new Error("Invalid file content");
      }
    },

    reorderFilesAlphabetically() {
      this.files.sort((a, b) => a.name.localeCompare(b.name));
      this.saveToLocalStorage(); // ✅ Sauvegarde après tri
    },

    setSelectedIndex(index: number) {
      this.selectedIndex = index;
    },

    removeFile(index: number) {
      this.files.splice(index, 1);

      if (this.files.length === 0) {
        this.selectedIndex = null;
      } else if (this.selectedIndex === index) {
        if (index - 1 >= 0) {
          this.selectedIndex = index - 1;
        } else if (index < this.files.length) {
          this.selectedIndex = index;
        } else {
          this.selectedIndex = null;
        }
      } else if (this.selectedIndex !== null && this.selectedIndex > index) {
        this.selectedIndex--;
      }

      this.saveToLocalStorage(); // ✅ Sauvegarde après suppression
    },
  },
});
