export type SavedProfile = {
  id: string;
  name: string;
  content: unknown;
  savedAt: number;
};

const KEY_PROFILES = "ss_profiles";
const KEY_ACTIVE   = "ss_active_profile_id";
const MAX_ITEMS    = 50;

export function loadProfiles(): SavedProfile[] {
  try { return JSON.parse(localStorage.getItem(KEY_PROFILES) || "[]"); }
  catch { return []; }
}
export function saveProfiles(list: SavedProfile[]) {
  localStorage.setItem(KEY_PROFILES, JSON.stringify(list));
}

export function addProfile(name: string, content: unknown): SavedProfile {
  const entry: SavedProfile = { id: `${name}-${Date.now()}`, name, content, savedAt: Date.now() };
  const list = [entry, ...loadProfiles()].slice(0, MAX_ITEMS);
  saveProfiles(list);
  localStorage.setItem(KEY_ACTIVE, entry.id);
  return entry;
}

export function removeProfile(id: string) {
  const list = loadProfiles().filter(p => p.id !== id);
  saveProfiles(list);
  if (localStorage.getItem(KEY_ACTIVE) === id) {
    localStorage.setItem(KEY_ACTIVE, list[0]?.id ?? "");
  }
}

export function getActiveProfile() {
  const id = localStorage.getItem(KEY_ACTIVE) || "";
  const list = loadProfiles();
  return list.find(p => p.id === id) || list[0] || null;
}
export function setActiveProfileId(id: string) {
  if (id) localStorage.setItem(KEY_ACTIVE, id);
  else localStorage.removeItem(KEY_ACTIVE);
}
