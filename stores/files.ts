import { defineStore } from "pinia";

export const useFilesStore = defineStore("filesStore", {
  state: () => ({
    files: [] as EncryptedFile[],
    currentFileIndex: undefined as number | undefined,
  }),
  getters: {
    currentFile: (state) => {
      return state.currentFileIndex !== undefined
        ? state.files[state.currentFileIndex]
        : undefined;
    },
  },
  actions: {
    setFiles(files: EncryptedFile[]) {
      this.files = files;
      if (files.length > 0) {
        this.currentFileIndex = 0;
      } else {
        this.currentFileIndex = undefined;
      }
      this.sort();
    },
    addFiles(files: EncryptedFile[]) {
      this.files.push(...files);
      if (files.length > 0) {
        this.currentFileIndex = 0;
      }
      this.sort();
    },
    removeFile(file: EncryptedFile) {
      const index = this.files.indexOf(file);
      if (index === -1) return;

      const wasCurrent = this.currentFileIndex === index;

      this.files.splice(index, 1);

      if (wasCurrent) {
        if (this.files.length === 0) {
          this.currentFileIndex = undefined;
        } else if (index >= this.files.length) {
          this.currentFileIndex = this.files.length - 1;
        } else {
          this.currentFileIndex = index;
        }
      } else if (
        this.currentFileIndex !== undefined &&
        index < this.currentFileIndex
      ) {
        // Shift currentFileIndex down since an earlier file was removed
        this.currentFileIndex--;
      }
    },
    setCurrentFile(file: EncryptedFile | undefined) {
      if (file === undefined) {
        this.currentFileIndex = undefined;
      } else {
        const index = this.files.indexOf(file);
        if (index !== -1) {
          this.currentFileIndex = index;
        }
      }
    },
    sort() {
      this.files.sort((a, b) => a.name.localeCompare(b.name));
      // Recalculate currentFileIndex after sorting
      if (this.currentFileIndex !== undefined) {
        const current = this.files[this.currentFileIndex];
        this.currentFileIndex = current
          ? this.files.indexOf(current)
          : undefined;
      }
    },
  },
});
