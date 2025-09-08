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
    async addFile(content: string, name?: string) {
      if (content.startsWith("{")) {
        // It is a json file with {version: number, data: Record<string, any>}
        const json = JSON.parse(content);
        const jsonData = await TextCipher.decrypt(json.data);
        const parsedJsonData = JSON.parse(jsonData);

        this.files.push({
          id: crypto.randomUUID() as string,
          name: name || "unknown.json",
          version: json.version,
          originalData: parsedJsonData,
          data: parsedJsonData,
          rawInput: content,
        });
      } else {
        throw new Error("Invalid file content");
      }

      this.reorderFilesAlphabetically();
    },
    reorderFilesAlphabetically() {
      this.files.sort((a, b) => a.name.localeCompare(b.name));
    },
    setSelectedIndex(index: number) {
      this.selectedIndex = index;
    },
    removeFile(index: number) {
      this.files.splice(index, 1);

      if (this.files.length === 0) {
        this.selectedIndex = null;
      } else if (this.selectedIndex === index) {
        // If the removed file was selected
        if (index - 1 >= 0) {
          this.selectedIndex = index - 1; // Select previous
        } else if (index < this.files.length) {
          this.selectedIndex = index; // Select next (shifted into current index)
        } else {
          this.selectedIndex = null; // Shouldn't normally happen, but safe fallback
        }
      } else if (this.selectedIndex !== null && this.selectedIndex > index) {
        // If selection was after the removed index, shift it back by 1
        this.selectedIndex--;
      }
    },
  },
});
