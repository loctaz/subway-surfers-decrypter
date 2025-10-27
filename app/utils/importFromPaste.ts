import { toast } from "vue-sonner";
import detectFromContent from "@/utils/detectFromContent";
import TextCipher from "@/utils/TextCipher";

/**
 * Import JSON from the clipboard.
 * Supports both clipboard files (via Async Clipboard API) and plain text JSON.
 * - If the clipboard has an exported wrapper ({ version, data }), it is added directly.
 * - If it has raw JSON (a specific game file), we detect the filename and wrap+encrypt it.
 */
export default async function importFromPaste(): Promise<void> {
  const filesStore = useFilesStore();

  try {
    // Text-only import: read clipboard text
    const text = await navigator.clipboard.readText();

    const trimmed = (text ?? "").trim();

    if (!trimmed) {
      toast.message(
        "Le presse-papiers ne contient aucun texte. Si vous avez copié un fichier, appuyez sur Ctrl/Cmd+V"
      );
      return;
    }

    try {
      const didImport = await importTextAsFile(trimmed, filesStore);
      if (didImport) {
        toast.success("1 élément importé depuis le presse-papiers");
      } else {
        toast.message("Le texte du presse-papiers ne contenait pas de JSON importable");
      }
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Le texte du presse-papiers n'est pas au format JSON valide"
      );
    }
  } catch (error) {
    console.error(error);
    toast.error(
      error instanceof Error ? error.message : "Échec de la lecture du texte du presse-papiers"
    );
  }
}

/**
 * Import a single JSON text payload into the files store.
 * Returns true if an item was imported, false if the text was empty/invalid.
 */
async function importTextAsFile(
  text: string,
  filesStore: ReturnType<typeof useFilesStore>
): Promise<boolean> {
  const trimmed = (text ?? "").trim();
  if (!trimmed) return false;

  // Ensure incoming text is JSON
  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    throw new Error("Le contenu du presse-papiers n'est pas un JSON valide");
  }

  // Case 1: Export wrapper
  if (isExportWrapper(parsed)) {
    const wrapper = parsed as { version: number; data: string };
    // Determine a filename from decrypted data if possible
    let name = "unknown.json";
    try {
      const decrypted = await TextCipher.decrypt(wrapper.data);
      const decryptedObj = JSON.parse(decrypted);
      name = detectFromContent(decryptedObj) || name;
    } catch {
      // If decryption fails, still try to import with unknown.json
    }

    await filesStore.addFile(trimmed, name);
    return true;
  }

  // Case 2: Raw JSON of a specific game file → detect name, wrap+encrypt, then import
  if (typeof parsed === "object" && parsed !== null) {
    const detectedName =
      detectFromContent(parsed as Record<string, any>) || "unknown.json";
    const encrypted = await TextCipher.encrypt(JSON.stringify(parsed));
    const wrapper = JSON.stringify({ version: 1, data: encrypted });
    await filesStore.addFile(wrapper, detectedName);
    return true;
  }

  return false;
}

function isExportWrapper(
  value: unknown
): value is { version: number; data: string } {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.version === "number" && typeof v.data === "string";
}
