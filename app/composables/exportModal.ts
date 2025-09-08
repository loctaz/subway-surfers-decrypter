// Create a shared reactive state outside the function
const exportModalState = ref({ visible: false, fileIndex: 0 });

export const useExportModal = () => {
  return {
    showModal(index: number) {
      exportModalState.value.visible = true;
      exportModalState.value.fileIndex = index;
    },
    state: exportModalState,
  };
};
