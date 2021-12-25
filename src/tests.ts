import {
  myPathId,
  abort,
  setProperty,
  getProperty,
  visitUrl,
  cliExecute,
  setAutoAttack,
  equip,
  myLevel,
  mySpleenUse,
  itemAmount,
  autosell,
  availableAmount,
  haveEffect,
  runChoice,
  use,
} from "kolmafia";
import { get, $item, $slot, $effect, ensureEffect } from "libram";
import { testDone } from "./hccs";
import {
  setChoice,
  setClan,
  tryUse,
  ensureItem,
  ensureSong,
  ensureMpTonic,
  ensureCreateItem,
} from "./lib";

export function coilwire() {
  // Default equipment.
  equip($item`Iunion Crown`);
  equip($slot`shirt`, $item`none`);
  equip($item`vampyric cloake`);
  equip($item`Fourth of May Cosplay Saber`);
  // equip($item[Kramco Sausage-o-Matic&trade;]);
  equip($item`old sweatpants`);
  equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
  equip($slot`acc2`, $item`Powerful Glove`);
  equip($slot`acc3`, $item`Lil' Doctor™ bag`);

  if (!testDone(TEST_COIL_WIRE)) {
    setClan("Bonus Adventures from Hell");
    /*
  if (get("_clanFortuneConsultUses") < 3) {
    while (get("_clanFortuneConsultUses") < 3) {
      cliExecute("fortune cheesefax");
      cliExecute("wait 5");
    }
  }
*/
    if (myLevel() === 1 && mySpleenUse() === 0) {
      while (get("_universeCalculated") < get("skillLevel144")) {
        cliExecute("numberology 69");
      }
    }

    // retrieve_item(1, $item[fish hatchet]);

    // get cowboy boots
    visitUrl("place.php?whichplace=town_right&action=townright_ltt");

    // Vote.
    // TODO: make this also work for PM
    if (itemAmount($item`"I Voted!" sticker`) === 0) {
      visitUrl("place.php?whichplace=town_right&action=townright_vote");
      visitUrl("choice.php?option=1&whichchoice=1331&g=2&local%5B%5D=1&local%5B%5D=3");
      // Make sure initiative-tracking works.
      // visitUrl("place.php?whichplace=town_right&action=townright_vote");
    }

    // Chateau piggy bank
    visitUrl("place.php?whichplace=chateau&action=chateau_desk1");
    // autosell(1, $item[gremlin juice]);
    // autosell(1, $item[ectoplasm <i>au jus</i>]);
    // autosell(1, $item[clove-flavored lip balm]);

    // Sell pork gems + tent
    visitUrl("tutorial.php?action=toot");
    tryUse(1, $item`letter from King Ralph XI`);
    tryUse(1, $item`pork elf goodies sack`);
    autosell(5, $item`baconstone`);
    // autosell(5, $item[porquoise]);
    autosell(5, $item`hamethyst`);

    // Buy toy accordion
    ensureItem(1, $item`toy accordion`);

    // make pantogram pants for hilarity and spell damage
    if (availableAmount($item`pantogram pants`) === 0) {
      // retrieveItem(1, $item`ten-leaf clover`);
      cliExecute("pantogram hot|-combat|silent");
    }

    ensureSong($effect`The Magical Mojomuscular Melody`);

    if (haveEffect($effect`Inscrutable Gaze`) === 0) {
      ensureMpTonic(10);
      ensureEffect($effect`Inscrutable Gaze`);
    }

    // Campsite
    if (haveEffect($effect`That's Just Cloud-Talk, Man`) === 0) {
      visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    }

    // Depends on Ez's Bastille script.
    cliExecute("bastille myst brutalist");

    // Upgrade saber for fam wt
    visitUrl("main.php?action=may4");
    runChoice(4);

    // Put on some regen gear
    equip($item`Iunion Crown`);
    equip($slot`shirt`, $item`none`);
    equip($item`Fourth of May Cosplay Saber`);
    // equip($item[Kramco Sausage-o-Matic&trade;]);
    equip($item`old sweatpants`);
    equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    equip($slot`acc2`, $item`Powerful Glove`);
    equip($slot`acc3`, $item`Retrospecs`);

    ensureCreateItem(1, $item`borrowed time`);
    use(1, $item`borrowed time`);

    // NOTE: No turn 0 sausage fight!

    // should probably fight, digitize, wink a bishop or something here

    // QUEST - Coil Wire
    doTest(TEST_COIL_WIRE);
  }
}
