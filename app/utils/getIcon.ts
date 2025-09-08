const iconMap: Record<string, string> = {
  "achievements.json": "lucide:award",
  "ad_placements.json": "lucide:megaphone",
  "assembly_events.json": "lucide:calendar-clock",
  "boards_inventory.json": "mingcute:skateboard-line",
  "calendars.json": "lucide:calendar",
  "chain_offers.json": "lucide:link",
  "character_hunt.json": "lucide:crosshair",
  "characters_inventory.json": "lucide:users",
  "cloud_sync.json": "lucide:cloud",
  "collections.json": "lucide:book",
  "data_consent.json": "lucide:book-check",
  "free_content.json": "lucide:gift",
  "generic_challenges.json": "lucide:swords",
  "identity.json": "lucide:shield-check",
  "ingame_notifications.json": "lucide:bell",
  "local_notification_permissions.json": "lucide:bell-plus",
  "loot_rolled.json": "lucide:box",
  //"missed_rewards_models.json": "lucide:box-check",
  "missions.json": "lucide:flag",
  "profile_background.json": "lucide:image",
  "profile_frame.json": "lucide:frame",
  //"profile_portrait.json": "lucide:person",
  "quests.json": "lucide:book-open",
  "rate_app.json": "lucide:star",
  //"rewarded_popups.json": "lucide:gift",
  "season_hunt.json": "lucide:crosshair",
  "season_hunts.json": "lucide:crosshair",
  "top_run.json": "lucide:chart-network",
  "trophies.json": "lucide:trophy",
  "tutorials.json": "lucide:book",
  "ui_seen.json": "lucide:eye",
  "upgrades.json": "lucide:arrow-up",
  "user_settings.json": "lucide:settings",
  "user_stats.json": "lucide:chart-no-axes-column",
  "wallet_on_run.json": "lucide:wallet",
  "wallet.json": "lucide:wallet-minimal",
  "word_hunt.json": "lucide:case-sensitive",
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
