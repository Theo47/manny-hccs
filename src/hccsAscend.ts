import { getWorkshed, myGardenType, visitUrl, containsText, print, userConfirm } from "kolmafia";
import { $item } from "libram";

// if (getWorkshed() !== $item`little geneticist DNA-splicing lab`) {
//   throw "You have the wrong workshed item";
// }
// if (myGardenType() != "peppermint") {
//   throw "You have the wrong garden";
// }
print("you're about to ascend! wait, is that good?", "green");

// add in checks for chateau and boots, chateau mob has a pref, dunno about the rest

// const pg = visitUrl("charpane.php");

// if (!containsText(visitUrl("charpane.php"), "Astral Spirit"))
//   visitUrl("ascend.php?action=ascend&confirm=on&confirm2=on");
// if (!containsText(visitUrl("charpane.php"), "Astral Spirit")) throw "Failed to ascend.";
visitUrl("afterlife.php?action=pearlygates");
visitUrl("afterlife.php?action=buydeli&whichitem=5046"); //astral pilsners
visitUrl("afterlife.php?action=buyarmory&whichitem=5040"); //astral pet sweater
//userConfirm("Are you sure you want to ascend? No skills to perm?");
visitUrl(
  //"afterlife.php?action=ascend&confirmascend=1&whichsign=2&gender=1&whichclass=4&whichpath=25&asctype=3&nopetok=1&noskillsok=1&pwd",
  "afterlife.php?action=ascend&confirmascend=1&whichsign=8&gender=1&whichclass=4&whichpath=25&asctype=3&pwd&noskillsok=1",
  true
);
