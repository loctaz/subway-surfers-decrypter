<template>
  <div class="json-editor-wrapper">
    <div class="toolbar">
      <label>Editor type:</label>
      <select v-model="editorMode" @change="changeMode">
        <option value="tree">Basic</option>
        <option value="code">Advanced</option>
      </select>

      <label>
        <input type="checkbox" v-model="pretty" @change="togglePretty" />
        Pretty JSON
      </label>
    </div>

    <div ref="editorContainer" class="json-editor"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

const editorContainer = ref(null);
const editorInstance = ref(null);
const editorMode = ref("tree"); // mode par défaut
const pretty = ref(true);

const jsonData = ref({
  lastSaved: "2023-09-18T13:35:22.977877Z",
  patchVersion: 3,
  selected: {
    character: "yuto",
    outfit: "default",
  },
});

onMounted(() => {
  editorInstance.value = new JSONEditor(editorContainer.value, {
    mode: editorMode.value,
    modes: ["tree", "code"], // Basic = tree, Advanced = code
    mainMenuBar: false, // On gère nous-mêmes le menu
  }, jsonData.value);
});

const changeMode = () => {
  const currentData = editorInstance.value.get();
  editorInstance.value.destroy();
  editorInstance.value = new JSONEditor(editorContainer.value, {
    mode: editorMode.value,
    modes: ["tree", "code"],
    mainMenuBar: false,
  }, currentData);
};

const togglePretty = () => {
  if (editorMode.value === "code") {
    const currentText = editorInstance.value.getText();
    try {
      const parsed = JSON.parse(currentText);
      const formatted = pretty.value
        ? JSON.stringify(parsed, null, 2)
        : JSON.stringify(parsed);
      editorInstance.value.updateText(formatted);
    } catch (e) {
      console.warn("Invalid JSON, cannot pretty print");
    }
  }
};
</script>

<style scoped>
.json-editor-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 15px;
}

.json-editor {
  border: 1px solid #ccc;
  height: 600px;
}
</style>
