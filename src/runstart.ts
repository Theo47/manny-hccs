/*
floundry
boots
set some properties

*/

import { cliExecute, getProperty, setProperty, visitUrl } from "kolmafia";
import { get } from "libram";
import { propertyManager } from "./lib";
export function getReady() {
  // Do buy stuff from coinmasters (hermit).
  setProperty("_saved_autoSatisfyWithCoinmasters", getProperty("autoSatisfyWithCoinmasters"));
  setProperty("autoSatisfyWithCoinmasters", "true");
  // setProperty("logPreferenceChange", "true");

  propertyManager.set({
    autoSatisfyWithCoinmasters: true,
    autoSatisfyWithNPCs: false,
    choiceAdventureScript: "",
    customCombatScript: "libramMacro",
    currentMood: "apathetic",
    choiceAdventure1340: 3,
  });

  // Initialize council.
  visitUrl("council.php");

  if (get("backupCameraReverserEnabled") === false) {
    cliExecute("backupcamera reverser on");
  }
}
