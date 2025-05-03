const iconMap: Record<string, string> = {
  "wallet.json": "lucide:wallet-minimal",
  "achievements.json": "lucide:award",
};

/**
 * Get the icon name based on the filename
 * @param filename - The filename to get the icon for
 * @returns The icon name
 */
export default (filename: string) => {
  const iconName = iconMap[filename];
  if (iconName) {
    return iconName;
  }
  return "lucide:braces";
};
