const fileDetectors = [
  // achievements.json
  (fileContent: Record<string, any>) => {
    const filename = "achievements.json";
    if (fileContent["achievementEntries"]) return filename;
  },

  // ad_placements.json
  (fileContent: Record<string, any>) => {
    const filename = "ad_placements.json";
    if (
      fileContent["dailyVideoRewardsSeed"] &&
      fileContent["adPlacementsDailyCap"]
    )
      return filename;
  },

  // assembly_events.json
  (fileContent: Record<string, any>) => {
    const filename = "assembly_events.json";
    if (fileContent["eventInstances"] && fileContent["completedEvents"])
      return filename;
  },

  // boards_inventory.json
  (fileContent: Record<string, any>) => {
    const filename = "boards_inventory.json";
    if (fileContent["selected"] && fileContent["owned"]) {
      if (
        fileContent["owned"]?.["default"] &&
        !fileContent["owned"]?.["jake"]
      ) {
        return filename;
      }
    }
  },

  // calendars.json
  (fileContent: Record<string, any>) => {
    const filename = "calendars.json";
    if (fileContent["calendarStates"]) return filename;
  },

  // chain_offers.json
  (fileContent: Record<string, any>) => {
    const filename = "chain_offers.json";
    if (fileContent["calendarStates"]) return filename;
  },

  // character_hunt.json
  (fileContent: Record<string, any>) => {
    const filename = "character_hunt.json";
    if (
      fileContent["currentEventStart"] &&
      fileContent["currentLetterIndex"] &&
      fileContent["pendingCharacterRewards"]
    )
      return filename;
  },

  // characters_inventory.json
  (fileContent: Record<string, any>) => {
    const filename = "characters_inventory.json";
    if (fileContent["selected"] && fileContent["owned"]) {
      if (fileContent["owned"]?.["jake"]) return filename;
    }
  },

  // cloud_sync.json
  (fileContent: Record<string, any>) => {
    const filename = "cloud_sync.json";
    if (fileContent["lastSaved"] && fileContent["lastSync"]) return filename;
  },

  // collections.json
  (fileContent: Record<string, any>) => {
    const filename = "collections.json";
    if (fileContent["collectionsState"] && fileContent["meterLevelClaimed"])
      return filename;
  },

  // data_consent.json
  (fileContent: Record<string, any>) => {
    const filename = "data_consent.json";
    if (
      fileContent["region"] &&
      fileContent["geoRegion"] &&
      fileContent["dataJobStatus"]
    )
      return filename;
  },

  // free_content.json
  (fileContent: Record<string, any>) => {
    const filename = "free_content.json";
    if (fileContent["resolvedPromotions"]) return filename;
  },

  // generic_challenges.json
  (fileContent: Record<string, any>) => {
    const filename = "generic_challenges.json";
    if (fileContent["challengeStates"] && fileContent["challengeSunsets"])
      return filename;
  },

  // identity.json
  (fileContent: Record<string, any>) => {
    const filename = "identity.json";
    if (fileContent["device"] && fileContent["gameVersion"]) return filename;
  },

  // ingame_notifications.json
  (fileContent: Record<string, any>) => {
    const filename = "ingame_notifications.json";
    if (fileContent["current_notifications"]) return filename;
  },

  // loot_rolled.json
  (fileContent: Record<string, any>) => {
    const filename = "loot_rolled.json";
    if (Array.isArray(fileContent["entries"])) return filename;
  },

  // missed_rewards_models.json
  (fileContent: Record<string, any>) => {
    const filename = "missed_rewards_models.json";
    if (
      fileContent["challenges"] &&
      fileContent["admeters"] &&
      fileContent["chainoffers"]
    )
      return filename;
  },

  // missions.json
  (fileContent: Record<string, any>) => {
    const filename = "missions.json";
    if (fileContent["currentMissionSet"] && fileContent["activeMissions"])
      return filename;
  },

  // profile_background.json
  (fileContent: Record<string, any>) => {
    const filename = "profile_background.json";
    if (
      fileContent["selected"] &&
      fileContent["owned"] &&
      fileContent["owned"]?.["default_background"]
    )
      return filename;
  },

  // profile_frame.json
  (fileContent: Record<string, any>) => {
    const filename = "profile_frame.json";
    if (
      fileContent["selected"] &&
      fileContent["owned"] &&
      fileContent["owned"]?.["default_frame"]
    )
      return filename;
  },

  // profile_portrait.json
  (fileContent: Record<string, any>) => {
    const filename = "profile_portrait.json";
    if (
      fileContent["selected"] &&
      fileContent["owned"] &&
      fileContent["owned"]?.["jake_portrait"]
    )
      return filename;
  },

  // quests.json
  (fileContent: Record<string, any>) => {
    const filename = "quests.json";
    if (fileContent["questStates"]) return filename;
  },

  // rate_app.json
  (fileContent: Record<string, any>) => {
    const filename = "rate_app.json";
    if (fileContent["askAfterRunNumber"]) return filename;
  },

  // rewarded_popups.json
  (fileContent: Record<string, any>) => {
    const filename = "rewarded_popups.json";
    if (fileContent["lastTimeOfflineEarningsGiven"]) return filename;
  },

  // season_hunt.json
  (fileContent: Record<string, any>) => {
    const filename = "season_hunt.json";
    if (fileContent["currentTimeSlotId"] && fileContent["rewardsThisSeason"])
      return filename;
  },

  // season_hunts.json
  (fileContent: Record<string, any>) => {
    const filename = "season_hunts.json";
    if (
      fileContent["activeSeasonHuntModel"] &&
      fileContent["activeSeasonHuntModel"]?.["currentTimeSlotId"]
    )
      return filename;
  },

  // top_run.json
  (fileContent: Record<string, any>) => {
    const filename = "top_run.json";
    if (
      fileContent["unsubmittedScore"] &&
      fileContent["currentTopScoreMetadata"]
    )
      return filename;
  },

  // trophies.json
  (fileContent: Record<string, any>) => {
    const filename = "trophies.json";
    if (fileContent["trophiesEarned"] && fileContent["trophyCompletions"])
      return filename;
  },

  // tutorial.json
  (fileContent: Record<string, any>) => {
    const filename = "tutorial.json";
    if (fileContent["tutorialCompleted"]) return filename;
  },

  // ui_seen.json
  (fileContent: Record<string, any>) => {
    const filename = "ui_seen.json";
    if (
      fileContent["updateAppViewLastSeen"] &&
      fileContent["lastSeenPopupTime"]
    )
      return filename;
  },

  // upgrades.json
  (fileContent: Record<string, any>) => {
    const filename = "upgrades.json";
    if (fileContent["scoreModifiers"] && fileContent["currencyPickupModifiers"])
      return filename;
  },

  // user_settings.json
  (fileContent: Record<string, any>) => {
    const filename = "user_settings.json";
    if (fileContent["selectedMusicVersion"]) return filename;
  },

  // user_stats.json
  (fileContent: Record<string, any>) => {
    const filename = "user_stats.json";
    if (fileContent["highScoreCollection"]) return filename;
  },

  // wallet_on_run.json
  (fileContent: Record<string, any>) => {
    const filename = "wallet_on_run.json";
    if (fileContent["lastSaved"] && Object.keys(fileContent).length == 1)
      return filename;
  },

  // wallet.json
  (fileContent: Record<string, any>) => {
    const filename = "wallet.json";
    if (fileContent["currencies"] && fileContent["lootboxQueue"])
      return filename;
  },

  // word_hunt.json
  (fileContent: Record<string, any>) => {
    const filename = "word_hunt.json";
    if (fileContent["currentWord"]) return filename;
  },
];

export default (data: Record<string, any>) => {
  for (const detector of fileDetectors) {
    const filename = detector(data);
    if (filename) {
      return filename;
    }
  }
};
