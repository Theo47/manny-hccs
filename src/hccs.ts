import {
  ensureCreateItem,
  ensureEffect,
  ensureItem,
  ensureMpSausage,
  ensureMpTonic,
  ensureNpcEffect,
  ensurePotionEffect,
  ensureSewerItem,
  getPropertyBoolean,
  getPropertyInt,
  sausageFightGuaranteed,
  setChoice,
  setClan,
  kill,
  mapMonster,
  ensureOde,
  ensureSong,
} from "./lib";
import {
  abort,
  adv1,
  autosell,
  availableAmount,
  buy,
  chatPrivate,
  cliExecute,
  cliExecuteOutput,
  containsText,
  create,
  drink,
  eat,
  equip,
  equippedItem,
  floor,
  gametimeToInt,
  getCampground,
  getInventory,
  getPower,
  getProperty,
  getWorkshed,
  handlingChoice,
  haveEffect,
  haveSkill,
  hippyStoneBroken,
  inebrietyLimit,
  itemAmount,
  lastChoice,
  logprint,
  max,
  maximize,
  myAdventures,
  myBasestat,
  myBuffedstat,
  myClass,
  myFamiliar,
  myFullness,
  myGardenType,
  myHash,
  myHp,
  myInebriety,
  myLevel,
  myMaxhp,
  myMeat,
  myMp,
  mySpleenUse,
  myTurncount,
  numericModifier,
  print,
  retrieveItem,
  round,
  runChoice,
  runCombat,
  setAutoAttack,
  setLocation,
  setProperty,
  sweetSynthesis,
  sweetSynthesisResult,
  toFamiliar,
  toFloat,
  toInt,
  toSlot,
  toString,
  totalFreeRests,
  use,
  useFamiliar,
  userConfirm,
  useSkill,
  visit,
  visitUrl,
  wait,
  familiarWeight,
  ceil,
  putCloset,
  takeCloset,
  closetAmount,
  restoreMp,
} from "kolmafia";
import {
  $class,
  $effect,
  $effects,
  $familiar,
  $familiars,
  $item,
  $items,
  $location,
  $monster,
  $skill,
  $slot,
  $stat,
  adventureMacro,
  adventureMacroAuto,
  get,
  Macro,
  $slots,
  have,
} from "libram";
import { error } from "libram/dist/console";
import { familiar } from "libram/dist/resources/ObtuseAngel";
import { SynthesisPlanner } from "./synthesis";

var is100Run = false;

// rewrite all combats
// create a defaultFamiliar function that chooses somewhat dynamically
// make a better geneTonic() function
// rewrite map uses to not use the c2t thing
// figure out synth

const TEST_HP = 1;
const TEST_MUS = 2;
const TEST_MYS = 3;
const TEST_MOX = 4;
const TEST_FAMILIAR = 5;
const TEST_WEAPON = 6;
const TEST_SPELL = 7;
const TEST_NONCOMBAT = 8;
const TEST_ITEM = 9;
const TEST_HOT_RES = 10;
const TEST_COIL_WIRE = 11;

var HP_TURNS = 0;
var MUS_TURNS = 0;
var MYS_TURNS = 0;
var MOX_TURNS = 0;
var FAMILIAR_TURNS = 0;
var WEAPON_TURNS = 0;
var SPELL_TURNS = 0;
var NONCOMBAT_TURNS = 0;
var ITEM_TURNS = 0;
var HOT_RES_TURNS = 0;

var TEMP_TURNS = 0;

var tempMacro = "";

var targetTurns = new Map();

var familiarFor100Run: Familiar;

// test order will be stats, hot, item, NC, Fam, weapon, spell

const START_TIME = gametimeToInt();

var END_TIME = gametimeToInt();

const justKillTheThing = Macro.trySkill($skill`Curse of Weaksauce`)
  .trySkill($skill`Micrometeorite`)
  .trySkill($skill`Sing Along`)
  .trySkill($skill`extract`)
  .trySkill($skill`Stuffed Mortar Shell`)
  .skill($skill`saucestorm`)
  .step("repeat");

// Sweet Synthesis plan.
// This is the sequence of synthesis effects; we will, if possible, come up with a plan for allocating candy to each of these.
const synthesisPlanner = new SynthesisPlanner(
  //$effects`Synthesis: Learning, Synthesis: Smart, Synthesis: Strong, Synthesis: Cool, Synthesis: Collection`
  $effects`Synthesis: Learning, Synthesis: Smart, Synthesis: Strong, Synthesis: Cool`
);

/*
const defaultFamiliar = $familiar`melodramedary`;
const defaultFamiliarEquipment = $item`dromedary drinking helmet`;
// TODO: make this choose camel until 100 spit, then pixie for absinthe, then ???
function useDefaultFamiliar() {
  useFamiliar(defaultFamiliar);
  if (defaultFamiliarEquipment !== $item`none`) {
    equip(defaultFamiliarEquipment);
  }
}
*/

function useDefaultFamiliar() {
  if (is100Run) {
    useFamiliar(familiarFor100Run);
  }
  else if (get("camelSpit") < 100 && !testDone(TEST_WEAPON) && have($familiar`melodramedary`)) {
    useFamiliar($familiar`melodramedary`);
    if (have($item`dromedary drinking helmet`)) equip($item`dromedary drinking helmet`);
  } else if (
    have($familiar`Garbage Fire`) && availableAmount($item`rope`) < 1 &&
    availableAmount($item`burning newspaper`) + availableAmount($item`burning paper crane`) < 1
  ) {
    useFamiliar($familiar`Garbage Fire`);
  } else if ( have($familiar`shorter-order cook`) &&
    availableAmount($item`short stack of pancakes`) === 0 &&
    haveEffect($effect`shortly stacked`) === 0 &&
    !testDone(TEST_FAMILIAR)
  ) {
    useFamiliar($familiar`shorter-order cook`);
  } else {
    useFamiliar($familiar`Hovering Sombrero`);
  }
}

function tryUse(quantity: number, it: Item) {
  if (availableAmount(it) > 0) {
    return use(quantity, it);
  } else {
    return false;
  }
}

function useAll(it: Item) {
  return use(availableAmount(it), it);
}

function tryEquip(it: Item) {
  if (availableAmount(it) > 0) {
    return equip(it);
  } else {
    return false;
  }
}

function assertMeat(meat: number) {
  if (myMeat() < meat) error("Not enough meat.");
}

function autosellAll(it: Item) {
  autosell(itemAmount(it), it);
}

function wishEffect(ef: Effect) {
  if (haveEffect(ef) === 0) {
    cliExecute("genie effect " + ef.name);
  } else {
    print("Already have effect " + ef.name + ".");
  }
}

// Checks that you don't already have the tonic or effect and if your syringe has the right phylum and if so, makes the appropriate tonic.
function geneTonic(ph: string) {
  if (ph === "dude" || ph === "weird") {
    print("This function doesn't work for dudes or weirds.", "red");
  } else if (ph === "construct") {
    if (
      haveEffect($effect`Human-Machine Hybrid`) === 0 &&
      availableAmount($item`Gene Tonic: Construct`) === 0 &&
      get("dnaSyringe") === "construct"
    ) {
      cliExecute("camp dnapotion 1");
      if (availableAmount($item`Gene Tonic: ${ph}`) === 0) {
        error("something went wrong getting your gene tonic");
      } else {
        print("successfully created gene tonic: construct");
      }
    } else {
      print("You already have construct DNA");
    }
  } else {
    if (
      haveEffect($effect`Human-${ph} Hybrid`) === 0 &&
      availableAmount($item`Gene Tonic: ${ph}`) === 0 &&
      getProperty("dnaSyringe") === ph
    ) {
      cliExecute("camp dnapotion 1");
      if (availableAmount($item`Gene Tonic: ${ph}`) === 0) {
        error("something went wrong getting your gene tonic");
      } else {
        print("successfully created gene tonic: " + ph);
      }
    } else {
      print("You already have " + ph + " DNA");
    }
  }
}

/*
// rewrite this to be better
function geneTonic1(ph: string) {
  switch (toString(ph)) {
    case "elf":
      if ((haveEffect($effect`1601`) === 0) && (availableAmount($item`7399`) === 0) && (getProperty("dnaSyringe") === "elf")) {
        cliExecute("camp dnapotion 1");
        if (availableAmount($item`7399`) === 0) {
          error("something went wrong getting your gene tonic");
        } else {
          print("successfully created gene tonic: elf");
        }
      } else {
        print("You already have elf DNA");
      }
    case "construct":
      if ((haveEffect($effect`1588`) === 0) && (availableAmount($item`7386`) === 0) && (getProperty("dnaSyringe") === "construct")) {
        cliExecute("camp dnapotion 1");
        if (availableAmount($item`7386`) === 0) {
          error("something went wrong getting your gene tonic");
        } else {
          print("successfully created gene tonic: construct");
        }
      } else {
        print("You already have construct DNA");
      }
    case "pirate":
      if ((haveEffect($effect`1598`) === 0) && (availableAmount($item`7396`) === 0) && (getProperty("dnaSyringe") === "pirate")) {
        cliExecute("camp dnapotion 1");
        if (availableAmount($item`7396`) === 0) {
          error("something went wrong getting your gene tonic");
        } else {
          print("successfully created gene tonic: pirate");
        }
      } else {
        print("You already have pirate DNA");
      }
  }
}
*/

function shrug(ef: Effect) {
  if (haveEffect(ef) > 0) {
    cliExecute("shrug " + ef.name);
  }
}

function summonBrickoOyster(maxSummons: number) {
  if (getPropertyInt("_brickoFights") >= 3) return false;
  if (availableAmount($item`BRICKO oyster`) > 0) return true;
  while (
    getPropertyInt("libramSummons") < maxSummons &&
    (availableAmount($item`BRICKO eye brick`) < 1 || availableAmount($item`BRICKO brick`) < 8)
  ) {
    useSkill(1, $skill`Summon BRICKOs`);
  }
  return use(8, $item`BRICKO brick`);
}

function fightSausageIfGuaranteed() {
  if (sausageFightGuaranteed()) {
    //equip($item`Iunion Crown`);
    //equip($slot`shirt`, $item`none`);
    equip($item`Fourth of May Cosplay Saber`);
    equip($item`Kramco Sausage-o-Matic&trade;`);
    equip($item`LOV Epaulettes`);
    //equip($item`old sweatpants`);
    //equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    //equip($slot`acc2`, $item`Powerful Glove`);
    //equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);

    useDefaultFamiliar();

    adventureMacroAuto($location`The Neverending Party`, kill());
  }
}

export function testDone(testNum: number) {
  print("Checking test " + testNum + "...");
  const text = visitUrl("council.php");
  return !containsText(text, "<input type=hidden name=option value=" + testNum + ">");
}

function doTest(testNum: number) {
  if (!testDone(testNum)) {
    visitUrl("choice.php?whichchoice=1089&option=" + testNum);
    if (!testDone(testNum)) {
      error("Failed to do test " + testNum + ". Maybe we are out of turns.");
    }
  } else {
    print("Test " + testNum + " already completed.");
  }
}

export function withMacro<T>(macro: Macro, action: () => T) {
  macro.save();
  try {
    return action();
  } finally {
    Macro.clearSaved();
  }
}

function testCoilWire() {
  if (!testDone(TEST_COIL_WIRE)) {
    setClan("Bonus Adventures from Hell");
    if (getPropertyInt("_clanFortuneConsultUses") < 3) {
      while (getPropertyInt("_clanFortuneConsultUses") < 3) {
        cliExecute("fortune cheesefax garbage garbage thick");
        cliExecute("wait 5");
      }
    }

    ensureMpTonic(1);
    if (myLevel() === 1 && mySpleenUse() === 0) {
      while (getPropertyInt("_universeCalculated") < getPropertyInt("skillLevel144")) {
        cliExecute("numberology 69");
      }
    }

    // get cowboy boots
    visitUrl("place.php?whichplace=town_right&action=townright_ltt");

    // Chateau piggy bank
    visitUrl("place.php?whichplace=chateau&action=chateau_desk1");

    // Sell pork gems + tent
    visitUrl("tutorial.php?action=toot");
    tryUse(1, $item`letter from King Ralph XI`);
    tryUse(1, $item`pork elf goodies sack`);
    autosell(availableAmount($item`baconstone`) - 1, $item`baconstone`);
    autosell(availableAmount($item`porquoise`) - 1, $item`porquoise`);
    autosell(availableAmount($item`hamethyst`) - 1, $item`hamethyst`);

    // Buy toy accordion
    ensureItem(1, $item`toy accordion`);

    // make pantogram pants for hilarity and spell damage
    if (availableAmount($item`pantogram pants`) === 0) {
      // retrieveItem(1, $item`ten-leaf clover`);
      cliExecute("pantogram hot|-combat|silent");
    }

    //TODO: uncomment when you acquire skill
    //ensureSong($effect`The Magical Mojomuscular Melody`);

    if (haveEffect($effect`Inscrutable Gaze`) === 0) {
      ensureMpTonic(10);
      ensureEffect($effect`Inscrutable Gaze`);
    }

    if (getPropertyInt("_deckCardsDrawn") === 0) {
      cliExecute("cheat 1952");
      autosell(1, $item`1952 Mickey Mantle card`);
      buy(1, $item`Desert Bus pass`);
    }

    // Campsite
    // if (haveEffect($effect`That\'s Just Cloud-Talk, Man`) === 0) {
    //   visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    // }

    // Upgrade saber for fam wt
    visitUrl("main.php?action=may4");
    runChoice(4);

    //TODO:  Check if something else might had been better
    //20% item drop, +20% stats weapon
    if (!have($item`oversized sparkler`)) {
      visitUrl("clan_viplounge.php?action=fwshop&whichfloor=2"); //a bug prevents buying if you haven't visited shop first
      buy(1, $item`oversized sparkler`);
    }

    // NOTE: No turn 0 sausage fight!

    // should probably fight, digitize, wink a bishop or something here

    //TODO: vote?
    // Vote.
    // visitUrl("place.php?whichplace=town_right&action=townright_vote");
    // visitUrl("choice.php?option=1&whichchoice=1331&g=2&local%5B%5D=2&local%5B%5D=3");
    // // Make sure initiative-tracking works.
    // visitUrl("place.php?whichplace=town_right&action=townright_vote");

    while (get("_smithsnessSummons") < 3) {
      ensureMpTonic(6);
      useSkill($skill`Summon Smithsness`);
    }

    //TODO: i don't have borrowed time so need to eat/drink here to get to 60 adventures
    if (myFullness() == 0) {
      buy($item`pickled egg`, 2);
      eat(2, $item`This Charming Flan`);
    }

    // QUEST - Coil Wire
    doTest(TEST_COIL_WIRE);
  }

  if (myTurncount() < 60) abort("Something went wrong coiling wire.");
}

function testHP() {
  if (!testDone(TEST_HP)) {
    // just in case?
    // if (haveEffect($effect`That\'s Just Cloud-Talk, Man`) === 0) {
    //   visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    // }

    // Grab fish hatchett here, for fam wt, -combat, and muscle tests
    retrieveItem(1, $item`fish hatchet`);

    // pulls wrench from deck
    if (getPropertyInt("_deckCardsDrawn") === 5) {
      cliExecute("cheat wrench");
    }

    // uses familiar jacks to get camel equipment
    // if (availableAmount($item`10580`) === 0 && getPropertyInt("tomeSummons") < 3) {
    //   cliExecute("create 1 box of familiar jacks");
    //   useFamiliar($familiar`melodramedary`);
    //   use(1, $item`box of familiar jacks`);
    //   equip($item`dromedary drinking helmet`);
    // }

    // cliExecute("call detective_solver.ash");
    // buy(1, $item`shoe gum`);

    // learn extract and digitize
    cliExecute("terminal educate extract");
    cliExecute("terminal educate digitize");

    const lovePotion = $item`Love Potion #0`;
    const loveEffect = $effect`Tainted Love Potion`;
    if (haveEffect(loveEffect) === 0) {
      if (availableAmount(lovePotion) === 0) {
        useSkill(1, $skill`Love Mixology`);
      }
      visitUrl("desc_effect.php?whicheffect=" + loveEffect.descid);
      if (
        numericModifier(loveEffect, "mysticality") > 10 &&
        numericModifier(loveEffect, "muscle") > -30 &&
        numericModifier(loveEffect, "moxie") > -30 &&
        numericModifier(loveEffect, "maximum hp percent") > -0.001
      ) {
        use(1, lovePotion);
      }
    }

    // Boxing Daycare
    ensureEffect($effect`Uncucumbered`);

    // Cast inscrutable gaze
    ensureEffect($effect`Inscrutable Gaze`);

    // Shower lukewarm
    ensureEffect($effect`Thaumodynamic`);

    // Beach Comb
    ensureEffect($effect`You Learned Something Maybe!`);

    //TODO: should i use the rest of the clicks for random buffs?
    // Configure briefcase
    // enchantments wanted: weapon,hot,-combat,spell
    //   cliExecute("briefcase enchantment weapon hot -combat");
    //   /* while (getPropertyInt('_kgbClicksUsed') < 20) {
    //   cliExecute('briefcase buff random');
    // } */

    //TODO: get enough meat for bus pass?
    // Get beach access.
    // if (availableAmount($item`bitchin\' meatcar`) === 0) {
    //   ensureItem(1, $item`cog`);
    //   ensureItem(1, $item`sprocket`);
    //   ensureItem(1, $item`spring`);
    //   ensureItem(1, $item`empty meat tank`);
    //   ensureItem(1, $item`sweet rims`);
    //   ensureItem(1, $item`tires`);
    //   create(1, $item`bitchin\' meatcar`);
    // }

    // scrapbook for +exp
    equip($item`familiar scrapbook`);

    // Depends on Ez's Bastille script.
    cliExecute("bastille myst brutalist");

    // if (get_property('_horsery') != 'crazy horse') cli_execute('horsery crazy');

    // Tune moon sign to Blender. Have to do this now to get chewing gum.
    // if (!getPropertyBoolean("moonTuned")) {
    //   if (getPropertyInt("_campAwaySmileBuffs") === 0) {
    //     visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    //   }

    //   // Unequip spoon.
    //   equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    //   equip($slot`acc2`, $item`Powerful Glove`);
    //   equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);

    //   // Actually tune the moon.
    //   visitUrl("inv_use.php?whichitem=10254&doit=96&whichsign=8");
    // }

    cliExecute("retrocape mysticality thrill");

    // cross streams for a stat boost
    if (!getPropertyBoolean("_streamsCrossed")) {
      cliExecute("crossstreams");
    }

    // if (
    //   getPropertyInt("_brickoFights") === 0 &&
    //   summonBrickoOyster(7) &&
    //   availableAmount($item`BRICKO oyster`) > 0
    // ) {
    //   if (availableAmount($item`bag of many confections`) > 0) error("We should not have a bag yet.");
    //   useFamiliar($familiar`Stocking Mimic`);
    //   equip($slot`familiar`, $item`none`);
    //   if (myHp() < 0.8 * myMaxhp()) {
    //     visitUrl("clan_viplounge.php?where=hottub");
    //   }
    //   ensureMpTonic(32);
    //   Macro.trySkill($skill`otoscope`)
    //     .trySkill($skill`curse of weaksauce`)
    //     .trySkillRepeat($skill`saucegeyser`)
    //     .setAutoAttack();
    //   use(1, $item`BRICKO oyster`);
    //   autosell(1, $item`BRICKO pearl`);
    //   setAutoAttack(0);
    // }

    //TODO visit garden

    if (getPropertyInt("_candySummons") === 0) {
      useSkill(1, $skill`Summon Crimbo Candy`);
    }

    if (get("_chubbyAndPlumpUsed") === false) {
      useSkill(1, $skill`Chubby and Plump`);
    }

    // grab candies from gingerbread city, since we lack the other options to get them
    if (!get("_gingerbreadClockAdvanced")) {
      visitUrl("adventure.php?snarfblat=477");
      runChoice(1);
    }
    equip($slot`acc2`, $item`kremlin's greatest briefcase`);
    setChoice(1204, 1);
    while (getPropertyInt("_gingerbreadCityTurns") < 5) {
      useDefaultFamiliar();
      adventureMacro(
        $location`Gingerbread Train Station`,
        Macro.trySkill($skill`KGB tranquilizer dart`)
          .trySkill($skill`snokebomb`)
          .abort()
      );
    }

    // This is the sequence of synthesis effects; synthesis_plan will, if possible, come up with a plan for allocating candy to each of these.
    synthesisPlanner.synthesize($effect`Synthesis: Learning`);
    synthesisPlanner.synthesize($effect`Synthesis: Smart`);

    // if (round(numericModifier("mysticality experience percent")) < 80) {
    //   error("Insufficient +stat%.");
    //   abort();
    // }

    // Use ten-percent bonus
    tryUse(1, $item`a ten-percent bonus`);

    // Scavenge for gym equipment
    if (toInt(get("_daycareGymScavenges")) < 1) {
      visitUrl("/place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
      const pg = runChoice(3);
      if (containsText(pg, "[free]")) runChoice(2);
      runChoice(5);
      runChoice(4);
    }

    // ensure_effect($effect[hulkien]);
    ensureEffect($effect`Favored by Lyle`);
    ensureEffect($effect`Starry-Eyed`);
    ensureEffect($effect`Triple-Sized`);
    ensureEffect($effect`Feeling Excited`);
    ensureEffect($effect`We're All Made of Starfish`); // Beach Comb - should bridge all the way to spell dmg.
    //TODO: uncomment when i acquire skill
    //ensureSong($effect`The Magical Mojomuscular Melody`);
    ensureNpcEffect($effect`Glittering Eyelashes`, 5, $item`glittery mascara`);
    ensureEffect($effect`Merry Smithsness`);
    useSkill(1, $skill`Incredible Self-Esteem`); //might be something useful

    // visitUrl("desc_effect.php?whicheffect=af64d06351a3097af52def8ec6a83d9b"); //discover g9 effect
    // if (getPropertyInt("_g9Effect") >= 200) {
    //   wishEffect($effect`Experimental Effect G-9`);
    // } else {
    //   wishEffect($effect`New and Improved`);
    // }

    //candle correspondence
    if (have($item`votive of confidence`)) {
      ensureEffect($effect`Confidence of the Votive`);
    }

    // if (myInebriety() == 0 && getPropertyInt("_g9Effect") <250) {
    //   //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis
    //   putCloset($item`Swizzler`, itemAmount($item`Swizzler`));
    //   ensureOde(2);
    //   cliExecute("drink 1 Bee's Knees");
    //   takeCloset($item`Swizzler`, closetAmount($item`Swizzler`));
    // }

    //TODO: get other stat buffs?

    // Plan is for Beach Comb + PK buffs to fall all the way through to item -> hot res -> fam weight.
    //ensureEffect($effect`Fidoxene`);
    ensureEffect($effect`Do I Know You From Somewhere?`);

    //TODO: uncomment if i acquire snojo
    // 10 snojo fights to while +stat is on, also getting ice rice
    // if (get("_snojoFreeFights") < 10) {
    //   useDefaultFamiliar();
    //   setProperty("choiceAdventure1310", "3"); // myst for ice rice, because it sells for more
    //   visitUrl("place.php?whichplace=snojo&action=snojo_controller");
    //   if (availableAmount($item`gene tonic: construct`) === 0 && get("dnaSyringe") !== "construct") {
    //     adventureMacroAuto(
    //       $location`The X-32-F Combat Training Snowman`,
    //       Macro.item($item`DNA extraction syringe`).trySkillRepeat($skill`saucestorm`)
    //     );
    //     geneTonic("construct");
    //   }
    //   while (get("_snojoFreeFights") < 10) {
    //     useDefaultFamiliar();
    //     adventureMacroAuto($location`The X-32-F Combat Training Snowman`, kill());
    //   }
    // }

    // Don't use Kramco here.
    equip($slot`off-hand`, $item`familiar scrapbook`);

    //TODO: uncomment if i get ghost
    // if (haveEffect($effect`holiday yoked`) === 0 && getPropertyInt("_kgbTranquilizerDartUses") < 3) {
    //   equip($slot`acc1`, $item`kremlin\'s greatest briefcase`);
    //   useFamiliar($familiar`ghost of crimbo carols`);
    //   adventureMacroAuto($location`noob cave`, Macro.trySkill($skill`KGB tranquilizer dart`));
    //   setAutoAttack(0);
    // }

    // Get buff things
    ensureSewerItem(1, $item`turtle totem`);
    ensureSewerItem(1, $item`saucepan`);

    //TODO: do i need to make a mood here?
    cliExecute("mood hccs");
    // const mood = new Mood();
    // mood.skill($skill`Astral Shell`);
    // mood.skill($skill`Get Big`);
    // mood.skill($skill`Blood Bond`);
    // mood.skill($skill`Blood Bubble`);
    // mood.skill($skill`Carol of the Hells`);
    // mood.skill($skill`Elemental Saucesphere`);
    // mood.skill($skill`Empathy`);
    // mood.skill($skill`Inscrutable Gaze`);
    // mood.skill($skill`Leash of Linguini`);
    // mood.skill($skill`Singer's Faithful Ocelot`);
    // mood.skill($skill`Stevedave's Shanty of Superiority`);
    // mood.skill($skill`Ur-Kel's Aria of Annoyance`);
    // mood.skill($skill`Drescher's Annoying Noise`);
    // mood.skill($skill`Pride of the Puffin`);
    // mood.execute();

    // Chateau rest
    while (getPropertyInt("timesRested") < totalFreeRests()) {
      visitUrl("place.php?whichplace=chateau&action=chateau_restbox");
    }

    // while (summonBrickoOyster(11) && availableAmount($item`BRICKO oyster`) > 0) {
    //   useDefaultFamiliar();
    //   if (myHp() < 0.8 * myMaxhp()) {
    //     visitUrl("clan_viplounge.php?where=hottub");
    //   }
    //   ensureMpTonic(32);
    //   Macro.trySkill($skill`otoscope`)
    //     .trySkill($skill`curse of weaksauce`)
    //     .trySkillRepeat($skill`saucegeyser`)
    //     .setAutoAttack();
    //   use(1, $item`BRICKO oyster`);
    //   autosell(1, $item`BRICKO pearl`);
    //   setAutoAttack(0);
    // }

    ensureEffect($effect`Song of Bravado`);
    ensureEffect($effect`Big`);
    ensureSong($effect`Stevedave\'s Shanty of Superiority`);

    if (getProperty("boomBoxSong") !== "Total Eclipse of Your Meat") {
      cliExecute("boombox meat");
    }

    // Get buff things
    ensureSewerItem(1, $item`turtle totem`);
    ensureSewerItem(1, $item`saucepan`);

    // Don't use Kramco here.
    equip($slot`off-hand`, $item`familiar scrapbook`);

    // Fruits in skeleton store (Saber YR)
    const missingOintment =
      availableAmount($item`ointment of the occult`) === 0 &&
      availableAmount($item`grapefruit`) === 0 &&
      haveEffect($effect`Mystically Oiled`) === 0;
    const missingOil =
      availableAmount($item`oil of expertise`) === 0 &&
      availableAmount($item`cherry`) === 0 &&
      haveEffect($effect`Expert Oiliness`) === 0;
    const missingPhilter =
      availableAmount($item`philter of phorce`) === 0 &&
      availableAmount($item`lemon`) === 0 &&
      haveEffect($effect`Phorcefullness`) === 0;
    if (myClass() !== $class`Pastamancer` && (missingOil || missingOintment || missingPhilter)) {
      //cliExecute("mood apathetic");

      if (get("questM23Meatsmith") === "unstarted") {
        visitUrl("shop.php?whichshop=meatsmith&action=talk");
        runChoice(1);
      }
      // if (!canAdv($location`The Skeleton Store`, false)) error("Cannot open skeleton store!");
      adv1($location`The Skeleton Store`, -1, "");
      if (!containsText($location`The Skeleton Store`.noncombatQueue, "Skeletons In Store")) {
        throw "Something went wrong at skeleton store.";
      }
      setProperty("choiceAdventure1387", "3");
      mapMonster($location`The Skeleton Store`, $monster`novelty tropical skeleton`);
      withMacro(Macro.skill($skill`use the force`), runCombat);
      if (handlingChoice()) runChoice(3);
      // setProperty("mappingMonsters", "false");
    }

    //TODO:no map the monster uses. if i want this, figure alternative
    // if (availableAmount($item`Tomato juice of powerful power`) === 0 &&
    //   availableAmount($item`tomato`) === 0 &&
    //   haveEffect($effect`Tomato Power`) === 0 && getPropertyInt("_shatteringPunchUsed") < 3) {
    //   cliExecute("mood apathetic");

    //   setProperty("choiceAdventure1387", "3");
    //   mapMonster($location`The Haunted Pantry`, $monster`possessed can of tomatoes`);
    //   withMacro(Macro.skill($skill`feel envy`).skill($skill`shattering punch`), runCombat);
    //   // setProperty("mappingMonsters", "false");
    // }

    // become a human fish hybrid
    // if (get("_dnaHybrid") === false && get("dnaSyringe") !== "fish") {
    //   // tryEquip($item`powerful glove`);
    //   // useFamiliar($familiar`frumious bandersnatch`);
    //   print($location`the bubblin\' caldera`.noncombatQueue);
    //   adv1($location`The Bubblin\' Caldera`, -1, "");
    //   adv1($location`The Bubblin\' Caldera`, -1, "");
    //   print($location`the bubblin\' caldera`.noncombatQueue);
    //   if (
    //     containsText(
    //       $location`the bubblin\' caldera`.noncombatQueue,
    //       "Caldera Air; Aaaaah!  Aaaaaaaah!"
    //     )
    //   ) {
    //     adventureMacroAuto(
    //       $location`The Bubblin\' Caldera`,
    //       Macro.while_(
    //         "!monstername lava lamprey",
    //         Macro.trySkill($skill`extract`).trySkill($skill`macrometeorite`)
    //       ).if_(
    //         "monstername lava lamprey",
    //         Macro.trySkill($skill`extract`)
    //           .item($item`DNA Extraction Syringe`)
    //           .skill($skill`feel hatred`)
    //       )
    //     );
    //     useDefaultFamiliar();
    //     cliExecute("hottub"); // removing lava effect
    //     setAutoAttack(0);
    //   } else throw "Something went wrong getting fish DNA.";
    // }

    // if (get("_dnaHybrid") === false && get("dnaSyringe") === "fish") {
    //   cliExecute("camp dnainject");
    // }

    if (!get("hasRange")) {
      ensureItem(1, $item`Dramatic&trade; range`);
      use(1, $item`Dramatic&trade; range`);
    }

    useSkill(1, $skill`Advanced Saucecrafting`);
    useSkill(1, $skill`Prevent Scurvy and Sobriety`);

    ensurePotionEffect($effect`Mystically Oiled`, $item`ointment of the occult`);

    // Maximize familiar weight
    cliExecute("fold makeshift garbage shirt");
    equip($item`makeshift garbage shirt`);
    equip($slot`acc2`, $item`Brutal brogues`);

    // LOV tunnel for elixirs, epaulettes, and heart surgery
    // TODO: still need to make this combat better
    if (!getPropertyBoolean("_loveTunnelUsed")) {
      useDefaultFamiliar();
      ensureEffect($effect`carol of the bulls`);
      ensureEffect($effect`carol of the hells`);
      setChoice(1222, 1); // Entrance
      setChoice(1223, 1); // Fight LOV Enforcer
      setChoice(1224, 2); // LOV Epaulettes
      setChoice(1225, 1); // Fight LOV Engineer
      setChoice(1226, 2); // Open Heart Surgery
      setChoice(1227, 1); // Fight LOV Equivocator
      setChoice(1228, 3); // Take chocolate
      Macro.if_('monstername "LOV enforcer"', Macro.attack().repeat())
        .if_('monstername "lov engineer"', Macro.skill($skill`saucegeyser`).repeat())
        .step(justKillTheThing)
        .setAutoAttack();
      // setAutoAttack("HCCS_LOV_tunnel");
      adv1($location`The Tunnel of L.O.V.E.`, -1, "");
      setAutoAttack(0);
    }

    equip($item`LOV epaulettes`);

    // spend 5 turns in DMT, skipping joy and cert, just get stats
    // while (get("_machineTunnelsAdv") < 5) {
    //   useFamiliar($familiar`machine elf`);
    //   adventureMacroAuto($location`The Deep Machine Tunnels`, kill());
    //   /* if ((availableAmount($item`abstraction: thought`) === 0) && (availableAmount($item`abstraction: certainty`) === 0) && (getProperty("_machineTunnelsAdv") < 5)) {
    //     setAutoAttack("melfgetthought");
    //     adv1($location`the deep machine tunnels`, -1, "");
    //     setAutoAttack(0);
    //   } else if ((availableAmount($item`abstraction: thought`) >= 1) && (availableAmount($item`abstraction: certainty`) === 0) && (getProperty("_machineTunnelsAdv") < 5)) {
    //     setAutoAttack("melfgetcertainty");
    //     adv1($location`the deep machine tunnels`, -1, "");
    //     setAutoAttack(0);
    //   } else {
    //     adventureKill($location`the deep machine tunnels`);
    //   } */
    // }

    useDefaultFamiliar();

    //witchess fights
    if (get("_witchessFights") < 5) {
      equip($item`fourth of may cosplay saber`);
      useDefaultFamiliar();
      while (toInt(getProperty("_witchessFights")) < 2) {
        Macro.step(justKillTheThing).setAutoAttack();
        visitUrl("campground.php?action=witchess");
        runChoice(1);
        visitUrl("choice.php?option=1&pwd=" + myHash() + "&whichchoice=1182&piece=1942", false);
        runCombat();
        setAutoAttack(0);
      }
      while (toInt(getProperty("_witchessFights")) === 2) {
        useDefaultFamiliar();
        Macro.attack().repeat().setAutoAttack();
        ensureEffect($effect`carol of the bulls`);
        visitUrl("campground.php?action=witchess");
        runChoice(1);
        visitUrl("choice.php?option=1&pwd=" + myHash() + "&whichchoice=1182&piece=1940", false);
        runCombat();
        setAutoAttack(0);
      }
      while (toInt(getProperty("_witchessFights")) === 3) {
        useDefaultFamiliar();
        Macro.attack().repeat().setAutoAttack();
        ensureEffect($effect`carol of the bulls`);
        useSkill($skill`Cannelloni Cocoon`);
        visitUrl("campground.php?action=witchess");
        runChoice(1);
        visitUrl("choice.php?option=1&pwd=" + myHash() + "&whichchoice=1182&piece=1941", false);
        runCombat();
        setAutoAttack(0);
      }
    }

    // get witchess buff, this should fall all the way through to fam wt
    if (haveEffect($effect`puzzle champ`) === 0) {
      cliExecute("witchess");
    }

    // Checking if it's gerald(ine) and accepting the quest if it is, otherwise just here to party.
    // if (get("_questPartyFairQuest") == "" && $location`The Neverending Party`.turnsSpent == 0) {
    //   setChoice(1322, 6); // Leave
    //   adv1($location`The Neverending Party`, -1, "");
    // }
    // if (get("_questPartyFairQuest") === "food" || get("_questPartyFairQuest") === "booze") {
    //   setChoice(1322, 1); // accept quest
    // } else {
    setChoice(1322, 2); // just here to party
    // }
    setChoice(1325, 2); // +20% mys exp buff

    // Professor 9x free sausage fight @ NEP
    if (getPropertyInt("_sausageFights") === 0) {
      useFamiliar($familiar`Pocket Professor`);
      tryEquip($item`Pocket Professor memory chip`);
      equip($item`Kramco Sausage-o-Matic&trade;`);
      equip($slot`acc2`, $item`Brutal brogues`);
      equip($slot`acc3`, $item`Beach Comb`);

      while (getPropertyInt("_sausageFights") === 0) {
        if (myHp() < 0.8 * myMaxhp()) {
          visitUrl("clan_viplounge.php?where=hottub");
        }

        // Just here to party.
        setChoice(1322, 2);
        adventureMacroAuto(
          $location`The Neverending Party`,
          Macro.if_('!monstername "sausage goblin"', new Macro().step("abort"))
            .trySkill(Skill.get("Lecture on Relativity"))
            .step(justKillTheThing)
        );
        setAutoAttack(0);
      }
    } else {
      print("YOU FUCKED UP THE KRAMCO CHAIN AGAIN, YOU DUMBASS! Go kill crayon elves instead.");
    }

    useDefaultFamiliar();

    equip($item`Kramco Sausage-o-Matic&trade;`);
    equip($slot`acc3`, $item`backup camera`);
    //equip($slot`shirt`, $item`none`);
    while (get("_backUpUses") < 7) {
      if (!haveEffect($effect`Tomes of Opportunity`)) {
        setChoice(1324, 1); //go to +mys exp buff nc
      } else {
        setChoice(1324, 5); //fight
      }
      if (getPropertyInt("_sausageFights") >= 3) {
        equip($item`familiar scrapbook`);
      }
      useDefaultFamiliar();
      adventureMacroAuto(
        $location`The Neverending Party`,
        Macro.if_("!monstername Sausage Goblin", Macro.skill("Back-Up to Your Last Enemy")).step(
          justKillTheThing
        )
      );
    }
    setAutoAttack(0);

    // Breakfast

    // Visiting Looking Glass in clan VIP lounge
    visitUrl("clan_viplounge.php?action=lookingglass&whichfloor=2");
    cliExecute("swim item");
    while (getPropertyInt("_genieWishesUsed") < 3) {
      cliExecute("genie wish for more wishes");
    }

    // Visiting the Ruined House
    //  visit_url('place.php?whichplace=desertbeach&action=db_nukehouse');

    useSkill(1, $skill`Advanced Cocktailcrafting`);
    useSkill(1, $skill`Pastamastery`);
    useSkill(1, $skill`Spaghetti Breakfast`);
    useSkill(1, $skill`Grab a Cold One`);
    useSkill(1, $skill`Acquire Rhinestones`);
    useSkill(1, $skill`Perfect Freeze`);
    //useSkill(1, $skill`summon kokomo resort pass`);
    //autosell(1, $item`kokomo resort pass`);
    autosell(3, $item`coconut shell`);
    autosell(3, $item`magical ice cubes`);
    autosell(3, $item`little paper umbrella`);

    // Autosell stuff
    //autosell(1, $item[strawberry]);
    //autosell(1, $item[orange]);
    //autosell(1, $item`razor-sharp can lid`);
    //autosell(5, $item[red pixel]);
    //autosell(5, $item`green pixel`);
    //autosell(5, $item`blue pixel`);
    //autosell(5, $item`white pixel`);

    if (haveEffect($effect`Carlweather\'s Cantata of Confrontation`) > 0) {
      cliExecute("shrug Carlweather's Cantata of Confrontation");
    }

    // equip($item`makeshift garbage shirt`);
    // useFamiliar($familiar`God Lobster`);
    // while (get("_godLobsterFights") < 2) {
    //   setProperty("choiceAdventure1310", "1");
    //   tryEquip($item`God Lobster\'s Scepter`);
    //   visitUrl("main.php?fightgodlobster=1");
    //   withMacro(Macro.skill($skill`saucegeyser`), runCombat);
    //   visitUrl("choice.php");
    //   if (handlingChoice()) runChoice(1);
    //   setAutoAttack(0);
    // }

    // fight a witchess queen for pointy crown, getting a couple weapon damage effects just in case
    if (toInt(getProperty("_witchessFights")) === 4) {
      useDefaultFamiliar();
      useSkill(1, $skill`Cannelloni Cocoon`);
      Macro.attack().repeat().setAutoAttack();
      ensureEffect($effect`carol of the bulls`);
      ensureEffect($effect`song of the north`);
      visitUrl("campground.php?action=witchess");
      runChoice(1);
      visitUrl("choice.php?option=1&pwd=" + myHash() + "&whichchoice=1182&piece=1939", false);
      runCombat();
      setAutoAttack(0);
    }

    useDefaultFamiliar();

    equip($slot`acc2`, $item`Lil\' Doctor&trade; Bag`);

    // 14 free NEP fights, using mob hit and xray
    while (
      getPropertyInt("_neverendingPartyFreeTurns") < 10 ||
      (haveSkill($skill`Chest X-Ray`) && getPropertyInt("_chestXRayUsed") < 3) ||
      (haveSkill($skill`Gingerbread Mob Hit`) && !getPropertyBoolean("_gingerbreadMobHitUsed"))
    ) {
      ensureNpcEffect($effect`Glittering Eyelashes`, 5, $item`glittery mascara`);
      ensureSong($effect`The Magical Mojomuscular Melody`);
      ensureSong($effect`Polka of Plenty`);
      ensureEffect($effect`inscrutable gaze`);
      ensureEffect($effect`pride of the puffin`);
      ensureEffect($effect`drescher\'s annoying noise`);
      ensureSong($effect`ur-kel\'s aria of annoyance`);
      ensureEffect($effect`Feeling Excited`);

      cliExecute("mood execute");

      // Otherwise fight.
      setChoice(1324, 5);
      // }

      ensureMpSausage(100);
      if (
        getPropertyInt("_neverendingPartyFreeTurns") < 10 &&
        getPropertyInt("_feelPrideUsed") < 3
      ) {
        useDefaultFamiliar();
        adventureMacroAuto(
          $location`The Neverending Party`,
          Macro.trySkill($skill`feel pride`).step(justKillTheThing)
        );
      } else if (getPropertyInt("_neverendingPartyFreeTurns") < 10) {
        useDefaultFamiliar();
        adventureMacroAuto($location`The Neverending Party`, Macro.step(justKillTheThing));
      } else {
        useDefaultFamiliar();
        adventureMacroAuto(
          $location`The Neverending Party`,
          Macro.trySkill($skill`chest x-ray`).trySkill($skill`gingerbread mob hit`)
        );
      }
    }

    equip($item`Fourth of May Cosplay Saber`);
    cliExecute("fold makeshift garbage shirt");
    equip($item`makeshift garbage shirt`);
    useDefaultFamiliar();

    if (getProperty("boomBoxSong") !== "These Fists Were Made for Punchin'") {
      cliExecute("boombox damage");
    }

    if (myClass() === $class`Pastamancer`) useSkill(1, $skill`Bind Undead Elbow Macaroni`);
    else ensurePotionEffect($effect`Expert Oiliness`, $item`oil of expertise`);

    // ensure_effect($effect[Gr8ness]);
    // ensure_effect($effect[Tomato Power]);
    ensureEffect($effect`Song of Starch`);
    ensureEffect($effect`Big`);
    ensureSong($effect`Stevedave\'s Shanty of Superiority`);
    ensureSong($effect`Power Ballad of the Arrowsmith`);
    ensureEffect($effect`Rage of the Reindeer`);
    ensureEffect($effect`Quiet Determination`);
    //TODO: uncomment when you know it
    //ensureEffect($effect`Disdain of the War Snapper`);
    ensureNpcEffect($effect`Go Get \'Em, Tiger!`, 5, $item`Ben-Gal&trade; balm`);

    synthesisPlanner.synthesize($effect`Synthesis: Strong`);

    //useFamiliar($familiar`disembodied hand`);
    useFamiliar($familiar`Left-Hand Man`);
    maximize("hp", false);

    // QUEST - Donate Blood (HP)
    if (myMaxhp() - myBuffedstat($stat`muscle`) - 3 < 1770) {
      error("Not enough HP to cap.");
      abort();
    }

    function hpTurns() {
      return 60 - floor((myMaxhp() - myBuffedstat($stat`muscle`) - 3) / 30);
    }

    if (hpTurns() > targetTurns.get(TEST_HP)) {
      throw (
        "Can't achieve target turns for HP test. Current: " +
        hpTurns() +
        " Target: " +
        targetTurns.get(TEST_HP)
      );
    }

    setProperty("_hccsHpTurnsUncapped", hpTurns() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_HP);
    HP_TURNS = myTurncount() - TEMP_TURNS;
    setProperty("_hccsHpTurns", HP_TURNS.toString());
    if (is100Run) {
      useFamiliar(familiarFor100Run);
    }
  }
}

function testMus() {
  if (!testDone(TEST_MUS)) {
    if (myClass() === $class`Pastamancer`) useSkill(1, $skill`Bind Undead Elbow Macaroni`);
    else ensurePotionEffect($effect`Expert Oiliness`, $item`oil of expertise`);

    tryUse(1, $item`astral six-pack`);
    //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis
    if (have($item`Swizzler`) && have($item`astral pilsner`)) {
      putCloset($item`Swizzler`, itemAmount($item`Swizzler`));
    }
    while (have($item`astral pilsner`) && myInebriety() < inebrietyLimit()) {
      ensureOde(1);
      drink(1, $item`astral pilsner`);
    }
    takeCloset($item`Swizzler`, closetAmount($item`Swizzler`));

    ensureEffect($effect`Big`);
    ensureEffect($effect`Song of Bravado`);
    ensureSong($effect`Stevedave\'s Shanty of Superiority`);
    ensureSong($effect`Power Ballad of the Arrowsmith`);
    ensureEffect($effect`Rage of the Reindeer`);
    ensureEffect($effect`Quiet Determination`);
    //TODO: uncomment when you know it
    //ensureEffect($effect`Disdain of the War Snapper`);
    // ensure_effect($effect[Tomato Power]);
    ensureNpcEffect($effect`Go Get \'Em, Tiger!`, 5, $item`Ben-Gal&trade; balm`);
    // ensure_effect($effect[Ham-Fisted]);
    //create(1, $item`philter of phorce`);
    ensureEffect($effect`Phorcefullness`);

    // Beach Comb
    ensureEffect($effect`Lack of Body-Building`);

    useFamiliar($familiar`Left-Hand Man`);
    maximize("muscle", false);

    // for (const increaser of [
    //   () => ensureEffect($effect`Lack of Body-Building`), // will stay on all the way to weapon damage.
    //   () => ensureEffect($effect`Ham-Fisted`),
    //   () => ensureInnerElf(),
    // ]) {
    //   if (myBuffedstat($stat`muscle`) - myBasestat($stat`mysticality`) < 1770) increaser();
    // }

    function musTurns() {
      if (myClass() === $class`Pastamancer`) {
        return 60 - floor((myBuffedstat($stat`muscle`) - myBasestat($stat`mysticality`)) / 30);
      } else {
        return 60 - floor((myBuffedstat($stat`muscle`) - myBasestat($stat`muscle`)) / 30);
      }
    }

    if (musTurns() > targetTurns.get(TEST_MUS)) {
      throw (
        "Can't achieve target turns for muscle test. Current: " +
        musTurns() +
        " Target: " +
        targetTurns.get(TEST_MUS)
      );
    }

    // cli_execute('modtrace mus');
    // abort();

    setProperty("_hccsMusTurnsUncapped", musTurns() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_MUS);
    MUS_TURNS = myTurncount() - TEMP_TURNS;
    setProperty("_hccsMusTurns", MUS_TURNS.toString());
    if (is100Run) {
      useFamiliar(familiarFor100Run);
    }
  }
}

function testMys() {
  if (!testDone(TEST_MYS)) {
    ensureEffect($effect`Big`);
    ensureEffect($effect`Song of Bravado`);
    ensureSong($effect`Stevedave\'s Shanty of Superiority`);
    //TODO: uncomment when you know it
    //ensureSong($effect`The Magical Mojomuscular Melody`);
    ensureEffect($effect`Quiet Judgement`);
    // ensure_effect($effect[Tomato Power]);
    ensureEffect($effect`Mystically Oiled`);
    ensureNpcEffect($effect`Glittering Eyelashes`, 5, $item`glittery mascara`);

    useFamiliar($familiar`Left-Hand Man`);
    maximize("mysticality", false);

    if (myBuffedstat($stat`mysticality`) - myBasestat($stat`mysticality`) < 1770) {
      error("Not enough mysticality to cap.");
      abort();
    }

    function mysTurns() {
      return 60 - floor((myBuffedstat($stat`mysticality`) - myBasestat($stat`mysticality`)) / 30);
    }

    if (mysTurns() > targetTurns.get(TEST_MYS)) {
      throw (
        "Can't achieve target turns for mysticality test. Current: " +
        mysTurns() +
        " Target: " +
        targetTurns.get(TEST_MYS)
      );
    }

    setProperty("_hccsMysTurnsUncapped", mysTurns() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_MYS);
    MYS_TURNS = myTurncount() - TEMP_TURNS;
    setProperty("_hccsMysTurns", MYS_TURNS.toString());
    if (is100Run) {
      useFamiliar(familiarFor100Run);
    }
  }
}

function testMox() {
  if (!testDone(TEST_MOX)) {
    if (myClass() === $class`Pastamancer`) useSkill(1, $skill`Bind Penne Dreadful`);
    else ensurePotionEffect($effect`Expert Oiliness`, $item`oil of expertise`);

    // Beach Comb
    ensureEffect($effect`Pomp & Circumsands`);

    //todo: uncomment if i get birds
    // use(1, $item`Bird-a-Day Calendar`);
    // ensureEffect($effect`Blessing of the Bird`);

    // Should be 11% NC and 50% moxie, will fall through to NC test
    // ensureEffect($effect`Blessing of your favorite Bird`);

    ensureEffect($effect`Big`);
    ensureEffect($effect`Song of Bravado`);
    ensureSong($effect`Stevedave\'s Shanty of Superiority`);
    ensureSong($effect`The Moxious Madrigal`);
    ensureEffect($effect`Quiet Desperation`);
    // ensure_effect($effect[Tomato Power]);
    ensureEffect($effect`Disco Fever`);
    ensureEffect($effect`Blubbered Up`);
    ensureEffect($effect`Mariachi Mood`);
    ensureNpcEffect($effect`Butt-Rock Hair`, 5, $item`hair spray`);
    use(availableAmount($item`rhinestone`), $item`rhinestone`);
    if (haveEffect($effect`Unrunnable Face`) === 0) {
      tryUse(1, $item`runproof mascara`);
    }

    synthesisPlanner.synthesize($effect`Synthesis: Cool`);

    useFamiliar($familiar`Left-Hand Man`);
    maximize("moxie", false);

    function moxTurns() {
      if (myClass() === $class`Pastamancer`) {
        return 60 - floor((myBuffedstat($stat`moxie`) - myBasestat($stat`mysticality`)) / 30);
      } else {
        return 60 - floor((myBuffedstat($stat`moxie`) - myBasestat($stat`moxie`)) / 30);
      }
    }

    if (moxTurns() > targetTurns.get(TEST_MOX)) {
      throw (
        "Can't achieve target turns for moxie test. Current: " +
        moxTurns() +
        " Target: " +
        targetTurns.get(TEST_MOX)
      );
    }

    setProperty("_hccsMoxTurnsUncapped", moxTurns() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_MOX);
    MOX_TURNS = myTurncount() - TEMP_TURNS;
    setProperty("_hccsMoxTurns", MOX_TURNS.toString());
    if (is100Run) {
      useFamiliar(familiarFor100Run);
    }
  }
}

function testHotRes() {
  if (!testDone(TEST_HOT_RES)) {
    ensureMpSausage(500);
    useDefaultFamiliar();
    fightSausageIfGuaranteed();

    // Make sure no moon spoon.
    //equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    //equip($slot`acc2`, $item`Powerful Glove`);
    //equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);

    if (availableAmount($item`heat-resistant gloves`) === 0) {
      adv1($location`LavaCo&trade; Lamp Factory`, -1, "");
      if (
        !containsText(
          $location`LavaCo&trade; Lamp Factory`.noncombatQueue,
          "LavaCo&trade; Welcomes You"
        )
      ) {
        throw "Something went wrong at LavaCo.";
      }
      equip($item`Fourth of May Cosplay Saber`);
      equip($slot`offhand`, $item`industrial fire extinguisher`);
      //equip($item`vampyric cloake`);
      setProperty("choiceAdventure1387", "3");
      mapMonster($location`LavaCo&trade; Lamp Factory`, $monster`Factory worker (female)`);
      setAutoAttack(0);
      withMacro(
        Macro.trySkill($skill`become a cloud of mist`)
          .skill($skill`Fire Extinguisher: Foam Yourself`)
          .skill($skill`meteor shower`)
          .skill($skill`use the force`),
        runCombat
      );
      while (lastChoice() === 1387 && handlingChoice()) {
        runChoice(3);
      }
      setProperty("mappingMonsters", "false");
    }

    // synth hot TODO: check for the right candyblast candies and summon candy hearts if not

    //synthesisPlanner.synthesize($effect`Synthesis: Hot`);

    // add +5 hot res to KGB, relies on Ezandora's script, naturally
    cliExecute("briefcase e hot");

    // set retrocape to elemental resistance
    cliExecute("retrocape mus hold");

    ensureEffect($effect`Blood Bond`);
    ensureEffect($effect`Leash of Linguini`);
    ensureEffect($effect`Empathy`);
    ensureEffect($effect`feeling peaceful`);

    // Pool buff. This will fall through to fam weight.
    ensureEffect($effect`Billiards Belligerence`);

    if (
      availableAmount($item`metal meteoroid`) > 0 &&
      availableAmount($item`meteorite guard`) === 0
    ) {
      cliExecute("create 1 meteorite guard");
    }

    ensureItem(1, $item`tenderizing hammer`);
    cliExecute("smash * ratty knitted cap");
    cliExecute("smash * red-hot sausage fork");
    autosell(10, $item`hot nuggets`);
    autosell(10, $item`twinkly powder`);

    ensureEffect($effect`Elemental Saucesphere`);
    ensureEffect($effect`Astral Shell`);

    // drink hot socks here if you're a tryhard

    // Beach comb buff.
    ensureEffect($effect`Hot-Headed`);

    // if (get_property('_horsery') != 'pale horse') cli_execute('horsery pale');

    useFamiliar($familiar`Exotic Parrot`);
    // if (availableAmount($item`cracker`) === 0 && getPropertyInt("tomeSummons") < 3) {
    //   retrieveItem(1, $item`box of Familiar jacks`);
    //   use(1, $item`box of Familiar Jacks`);
    //   equip($item`cracker`);
    // }

    if (!getPropertyBoolean("_mayoTankSoaked") && getWorkshed() === $item`portable Mayo Clinic`) {
      cliExecute("mayosoak");
    }

    // Build up 100 turns of Deep Dark Visions for spell damage later.
    while (
      haveSkill($skill`Deep Dark Visions`) &&
      haveEffect($effect`Visions of the Deep Dark Deeps`) < 50
    ) {
      if (myMp() < 20) {
        ensureCreateItem(1, $item`magical sausage`);
        eat(1, $item`magical sausage`);
      }
      while (myHp() < myMaxhp()) {
        useSkill(1, $skill`Cannelloni Cocoon`);
      }
      if (myMp() < 100) {
        ensureCreateItem(1, $item`magical sausage`);
        eat(1, $item`magical sausage`);
      }
      if (round(numericModifier("spooky resistance")) < 10) {
        throw "Not enough spooky res for Deep Dark Visions.";
      }
      useSkill(1, $skill`Deep Dark Visions`);
    }

    // Use pocket maze
    if (availableAmount($item`pocket maze`) > 0) ensureEffect($effect`Amazing`);

    //candle correspondence
    if (have($item`rainbow glitter candle`)) {
      ensureEffect($effect`Covered in the Rainbow`);
    }

    // Mafia sometimes can't figure out that multiple +weight things would get us to next tier.
    maximize("hot res, 0.01 familiar weight", false);

    function hotResTurns() {
      return 60 - round(numericModifier("hot resistance"));
    }

    if (hotResTurns() > targetTurns.get(TEST_HOT_RES)) {
      throw (
        "Can't achieve target turns for hot res test. Current: " +
        hotResTurns() +
        " Target: " +
        targetTurns.get(TEST_HOT_RES)
      );
    }

    // cli_execute('modtrace Hot Resistance');
    // abort();
    //logprint(cliExecuteOutput("modtrace hot resistance"));

    setProperty("_hccsHotResTurnsUncapped", hotResTurns() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_HOT_RES);
    HOT_RES_TURNS = myTurncount() - TEMP_TURNS;
    if (is100Run) {
      useFamiliar(familiarFor100Run);
    }
    setProperty("_hccsHotResTurns", HOT_RES_TURNS.toString());
  }
}

function testNonCombat() {
  if (!testDone(TEST_NONCOMBAT)) {
    fightSausageIfGuaranteed();

    if (myHp() < 30) useSkill(1, $skill`Cannelloni Cocoon`);
    ensureEffect($effect`Blood Bond`);
    ensureEffect($effect`Leash of Linguini`);
    ensureEffect($effect`Empathy`);

    // if (get("_godLobsterFights") < 3) {
    //   if (myHp() < 0.8 * myMaxhp()) useSkill(1, $skill`Cannelloni Cocoon`);
    //   useFamiliar($familiar`God Lobster`);
    //   // Get -combat buff.
    //   setProperty("choiceAdventure1310", "2");
    //   equip($item`God Lobster\'s Ring`);
    //   visitUrl("main.php?fightgodlobster=1");
    //   withMacro(Macro.skill($skill`saucegeyser`), runCombat);
    //   visitUrl("choice.php");
    //   if (handlingChoice()) runChoice(2);
    //   setAutoAttack(0);
    // }
    // setting KGB to NC, relies on Ezandora's script
    cliExecute("briefcase e -combat");

    // Pool buff. Should fall through to weapon damage.
    ensureEffect($effect`Billiards Belligerence`);

    equip($slot`acc3`, $item`Powerful Glove`);
    //ensureEffect($effect`gummed shoes`);
    ensureEffect($effect`The Sonata of Sneakiness`);
    ensureEffect($effect`Smooth Movements`);
    ensureEffect($effect`Invisible Avatar`);
    ensureEffect($effect`Silent Running`);
    ensureEffect($effect`Feeling Lonely`);

    // Rewards
    ensureEffect($effect`Throwing Some Shade`);
    // ensure_effect($effect[A Rose by Any Other Material]);
    // wish for disquiet riot because shades are hilariously expensive
    wishEffect($effect`disquiet riot`);
    useFamiliar($familiar`Disgeist`);

    // Pastamancer d1 is -combat.
    //TODO: uncomment if i buy bird iotm
    // if (myClass() === $class`pastamancer`) {
    //   ensureEffect($effect`Blessing of the Bird`);
    // }

    if (availableAmount($item`Daily Affirmation: Be Superficially interested`) > 0) {
      ensureEffect($effect`Become Superficially interested`);
    }

    maximize("-combat, 0.01 familiar weight", false);

    function nonCombatTurns() {
      //let's assume i will always have at least -25% combat rate to simplify calculation
      return 45 + (round(numericModifier("combat rate")) + 25) * 3;
    }

    if (nonCombatTurns() > targetTurns.get(TEST_NONCOMBAT)) {
      throw (
        "Can't achieve target turns for -combat test. Current: " +
        nonCombatTurns() +
        " Target: " +
        targetTurns.get(TEST_NONCOMBAT)
      );
    }

    // cli_execute('modtrace combat rate');
    // abort();

    setProperty("_hccsNonCombatTurnsUncapped", nonCombatTurns() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_NONCOMBAT);
    NONCOMBAT_TURNS = myTurncount() - TEMP_TURNS;
    if (is100Run) {
      useFamiliar(familiarFor100Run);
    }
    setProperty("_hccsNonCombatTurns", NONCOMBAT_TURNS.toString());
  }
}

function testFamiliarWeight() {
  if (!testDone(TEST_FAMILIAR)) {
    fightSausageIfGuaranteed();

    // These should have fallen through all the way from leveling.
    //ensureEffect($effect`Fidoxene`);
    ensureEffect($effect`Do I Know You From Somewhere?`);
    // Pool buff.
    ensureEffect($effect`Billiards Belligerence`);

    //if (availableAmount($item`rope`) === 0) cliExecute("play rope");

    if (myHp() < 30) useSkill(1, $skill`Cannelloni Cocoon`);
    ensureEffect($effect`Blood Bond`);
    ensureEffect($effect`Leash of Linguini`);
    ensureEffect($effect`Empathy`);
    ensureEffect($effect`robot friends`);
    //ensureEffect($effect`human-machine hybrid`);
    if (have($item`short stack of pancakes`)) ensureEffect($effect`shortly stacked`);
    /*
    if (availableAmount($item`cracker`) > 0 && getPropertyInt("tomeSummons") < 3) {
      useFamiliar($familiar`Exotic Parrot`);
      equip($item`cracker`);
    }
  */
    if (haveEffect($effect`Meteor Showered`) === 0) {
      equip($item`Fourth of May Cosplay Saber`);
      equip($item`familiar scrapbook`);
      setChoice(1387, 1); //we cant force drops so just banish
      adventureMacroAuto(
        $location`The Neverending Party`,
        Macro.trySkill($skill`Meteor Shower`).trySkill($skill`Use the Force`)
      );
      setAutoAttack(0);
    }

    //i don't have a garbage fire but no harm leaving this in
    if (
      availableAmount($item`burning newspaper`) > 0 &&
      availableAmount($item`burning paper crane`) < 1
    ) {
      cliExecute("create 1 burning paper crane");
    }

    if (!have($item`sombrero-mounted sparkler`)) {
      buy(1, $item`sombrero-mounted sparkler`);
    }
    ensureEffect($effect`You Can Really Taste the Dormous`);
    //if (!getPropertyBoolean("_clanFortuneBuffUsed")) cliExecute("fortune buff familiar");

    // checking here to see if we had a tome summon for a cracker or if we should use BBB
    // if (availableAmount($item`cracker`) > 0) {
    //   useFamiliar($familiar`exotic parrot`);
    // } else if (availableAmount($item`bugged beanie`) === 1) {
    //   useFamiliar($familiar`baby bugged bugbear`);
    // }
    maximize("familiar weight", false);

    function familiarTurns() {
      return (
        60 -
        floor(
          (familiarWeight(myFamiliar()) + round(numericModifier("familiar weight"))) / 5 + 0.001
        )
      );
    }

    if (familiarTurns() > targetTurns.get(TEST_FAMILIAR)) {
      throw (
        "Can't achieve target turns for familiar weight test. Current: " +
        familiarTurns() +
        " Target: " +
        targetTurns.get(TEST_FAMILIAR)
      );
    }

    //cliExecute("modtrace familiar weight");
    //abort();

    setProperty("_hccsFamiliarTurnsUncapped", familiarTurns() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_FAMILIAR);
    FAMILIAR_TURNS = myTurncount() - TEMP_TURNS;
    setProperty("_hccsFamiliarTurns", FAMILIAR_TURNS.toString());
  }
}

function testWeaponDamage() {
  if (!testDone(TEST_WEAPON)) {
    fightSausageIfGuaranteed();

    if (myInebriety() < inebrietyLimit() - 2 && !have($effect`In a Lather`)) {
      //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis
      putCloset($item`Swizzler`, itemAmount($item`Swizzler`));
      ensureOde(2);
      cliExecute("drink 1 Sockdollager");
      takeCloset($item`Swizzler`, closetAmount($item`Swizzler`));
    }

    // Get inner elf for weapon damage
    // if (haveEffect($effect`inner elf`) === 0 && getPropertyInt("_snokebombUsed") < 3) {
    //   cliExecute("/whitelist hobopolis vacation home");
    //   ensureEffect($effect`blood bubble`);
    //   useFamiliar($familiar`machine elf`);
    //   setProperty("choiceAdventure326", "1");
    //   adventureMacro($location`The Slime Tube`, Macro.skill($skill`snokebomb`));
    //   useDefaultFamiliar();
    //   cliExecute("/whitelist alliance from hell");
    // } else {
    //   print("Something went wrong with getting inner elf");
    // }
    // Paint crayon elf for DNA and ghost buff (Saber YR)
    /*
    if (!getPropertyBoolean("_chateauMonsterFought")) {
      const chateauText = visitUrl("place.php?whichplace=chateau", false);
      const m = createMatcher("alt="Painting of a? ([^(]*) .1."", chateauText);
      if (find(m) && group(m, 1) === "Black Crayon Crimbo Elf") {
        cliExecute("mood apathetic");
        useFamiliar($familiar`ghost of crimbo carols`);
        equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
        if (getPropertyInt("_reflexHammerUsed") === 3) {
          error("You do not have any banishes left");
        }
        setHccsCombatMode(MODE_CUSTOM, mSkill(mItem(mNew(), $item`DNA extraction syringe`), $skill`Reflex Hammer`));
        visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
        runCombat();
        useDefaultFamiliar();
      } else {
        error("Wrong painting.");
      }
    // } */
    // if (!get("_chateauMonsterFought")) {
    //   // const chateauText = visitUrl("place.php?whichplace=chateau", false);
    //   // const match = chateauText.match(/alt="Painting of an? ([^(]*) .1."/);
    //   // if (getPropertyInt("camelSpit") === 100) useFamiliar($familiar`Melodramedary`);
    //   //useFamiliar($familiar`ghost of crimbo carols`);
    //   //equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
    //   // if (get("_reflexHammerUsed") > 2) {
    //   //   error("You do not have any banishes left");
    //   // }
    //   //TODO: what am i supposed to do here?
    //   Macro.tryItem($item`DNA extraction syringe`)
    //     .trySkill($skill`reflex hammer`)
    //     .attack()
    //     .setAutoAttack();
    //   visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
    //   runCombat();
    //   //useDefaultFamiliar();
    // } else {
    //   throw "You already fought your painting";
    // }

    if (
      !getPropertyBoolean("_chateauMonsterFought") &&
      availableAmount($item`corrupted marrow`) === 0 &&
      haveEffect($effect`cowrruption`) === 0
    ) {
      cliExecute("mood apathetic");
      equip($item`Fourth of May Cosplay Saber`);
      equip($item`familiar scrapbook`);
      Macro.skill($skill`meteor shower`)
        .skill($skill`use the force`)
        .setAutoAttack();
      visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
      runCombat();
      runChoice(3);
    }
    setAutoAttack(0);

    //geneTonic("elf");
    //ensureEffect($effect`human-elf hybrid`);
    //TODO: fax something?

    if (availableAmount($item`twinkly nuggets`) > 0) {
      ensureEffect($effect`Twinkly Weapon`);
    }

    ensureEffect($effect`Carol of the Bulls`);
    ensureEffect($effect`Song of the North`);
    ensureEffect($effect`Rage of the Reindeer`);
    ensureEffect($effect`Frenzied, Bloody`);
    ensureEffect($effect`Scowl of the Auk`);
    ensureEffect($effect`Disdain of the War Snapper`);
    ensureEffect($effect`Tenacity of the Snapper`);
    ensureSong($effect`Jackasses\' Symphony of Destruction`);
    if (availableAmount($item`lov elixir \#3`) > 0) {
      ensureEffect($effect`The Power of LOV`);
    }

    if (availableAmount($item`vial of hamethyst juice`) > 0) {
      ensureEffect($effect`Ham-Fisted`);
    }

    if (availableAmount($item`Fabiotion`) > 0) {
      ensureEffect($effect`Faboooo`);
    }

    // make KGB set to weapon
    cliExecute("briefcase e weapon");

    // Beach Comb
    ensureEffect($effect`Lack of Body-Building`);
    // Boombox potion - did we get one?
    if (availableAmount($item`Punching Potion`) > 0) {
      ensureEffect($effect`Feeling Punchy`);
    }

    // Pool buff. Should have fallen through.
    ensureEffect($effect`Billiards Belligerence`);

    // Corrupted marrow
    ensureEffect($effect`Cowrruption`);

    // Pastamancer d1 is weapon damage.
    //TODO: uncomment if i buy bird iotm
    //ensureEffect($effect`Blessing of your Favorite Bird`);
    // ensureEffect($effect`Blessing of the Bird`);
    ensureNpcEffect($effect`Engorged Weapon`, 1, $item`Meleegra&trade; pills`);
    wishEffect($effect`Outer Wolf&trade;`);
    //wishEffect($effect`Wasabi With You`);
    // this is just an assert, effectively.
    // ensureEffect($effect`Meteor Showered`);
    ensureEffect($effect`Bow-Legged Swagger`);

    if (have($item`glass of raw eggs`) && !have($effect`Boxing Day Breakfast`)) {
      eat(1, $item`glass of raw eggs`);
    }

    //useFamiliar($familiar`disembodied hand`);
    useFamiliar($familiar`Left-Hand Man`);
    maximize("weapon damage", false);

    function weaponTurns() {
      //code shamelessly copied from TourGuide
      let modifier_1 = numericModifier("Weapon Damage");
      let modifier_2 = numericModifier("Weapon Damage Percent");

      $slots`hat,weapon,off-hand,back,shirt,pants,acc1,acc2,acc3,familiar`.forEach((s: Slot) => {
        let it = equippedItem(s);
        if (toSlot(it) != $slot`weapon`) return;
        let power = getPower(it);
        let addition = toFloat(power) * 0.15;

        modifier_1 -= addition;
      });
      {
      }
      if (haveEffect($effect`bow-legged swagger`) > 0) {
        modifier_1 *= 2;
        modifier_2 *= 2;
      }
      return 60 - (floor(modifier_1 / 50 + 0.001) + floor(modifier_2 / 50 + 0.001));
    }

    if (weaponTurns() > 5) {
      // Rictus of Yeg = 200% Weapon damage
      //if weapon turns are less than 5, we want to use it on spell damage instead for -4 turns there
      if (!getPropertyBoolean("_cargoPocketEmptied") && haveEffect($effect`Rictus of Yeg`) === 0) {
        if (availableAmount($item`Yeg\'s Motel toothbrush`) === 0) cliExecute("cargo 284");
        ensureEffect($effect`Rictus of Yeg`);
      }
    }

    if (weaponTurns() > targetTurns.get(TEST_WEAPON)) {
      throw (
        "Can't achieve target turns for weapon damage test. Current: " +
        weaponTurns() +
        " Target: " +
        targetTurns.get(TEST_WEAPON)
      );
    }

    // cli_execute('modtrace weapon damage');
    // abort();

    setProperty("_hccsWeaponTurnsUncapped", weaponTurns() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_WEAPON);
    WEAPON_TURNS = myTurncount() - TEMP_TURNS;
    setProperty("_hccsWeaponTurns", WEAPON_TURNS.toString());
  }
}

function testSpellDamage() {
  if (!testDone(TEST_SPELL)) {
    fightSausageIfGuaranteed();

    //simmering costs 1 adv. remove if i manage to cap spell damage
    ensureEffect($effect`Simmering`); //+100% spell damage
    ensureEffect($effect`Song of Sauce`);
    ensureEffect($effect`Carol of the Hells`);
    ensureEffect($effect`Arched Eyebrow of the Archmage`);
    ensureSong($effect`Jackasses\' Symphony of Destruction`);
    if (availableAmount($item`lov elixir \#6`) > 0) {
      ensureEffect($effect`The Magic of LOV`);
    }

    // Pool buff
    if (getPropertyInt("_poolGames") < 3) {
      ensureEffect($effect`Mental A-cue-ity`);
    }

    // Tea party
    // ensureSewerItem(1, $item`mariachi hat`);
    // ensureEffect($effect`Full Bottle in front of Me`);

    useSkill(1, $skill`Spirit of Cayenne`);

    // Get flimsy hardwood scraps.
    visitUrl("shop.php?whichshop=lathe");
    if (availableAmount($item`flimsy hardwood scraps`) > 0) {
      retrieveItem(1, $item`weeping willow wand`);
    }
    ensureItem(1, $item`obsidian nutcracker`);

    cliExecute("briefcase e spell");

    // Get inner elf for spell damage
    // if (haveEffect($effect`inner elf`) === 0 && getPropertyInt("_snokebombUsed") < 3) {
    //   cliExecute("/whitelist hobopolis vacation home");
    //   ensureEffect($effect`blood bubble`);
    //   useFamiliar($familiar`machine elf`);
    //   setProperty("choiceAdventure326", "1");
    //   adventureMacro($location`The Slime Tube`, Macro.skill($skill`snokebomb`));
    //   useDefaultFamiliar();
    //   cliExecute("/whitelist alliance from hell");
    // } else {
    //   print("Something went wrong with getting inner elf");
    // }

    if (myClass() === $class`sauceror` && !getPropertyBoolean("_barrelPrayer")) {
      cliExecute("barrelprayer buff");
    }

    // Sigils of Yeg = 200% SD
    if (!getPropertyBoolean("_cargoPocketEmptied") && haveEffect($effect`Sigils of Yeg`) === 0) {
      if (availableAmount($item`Yeg\'s Motel hand soap`) === 0) cliExecute("cargo 177");
      ensureEffect($effect`Sigils of Yeg`);
    }

    ensureEffect($effect`AAA-Charged`); //+50% spell dmg
    ensureEffect($effect`Lantern-Charged`); //+50% spell dmg, +100% item drop, shocking lick

    if (availableAmount($item`Bettie page`) > 0) {
      ensureEffect($effect`Paging Betty`);
    }

    if (availableAmount($item`Staff of the Headmaster's Victuals`)) {
      retrieveItem($item`Staff of the Headmaster's Victuals`);
    }

    //spent free kills on toxic teacups for 12% spell dmg per kill?

    //TODO: probably try a different location since we cant guarantee our familiar won;t attack
    // Meteor showered
    if (haveEffect($effect`Meteor Showered`) === 0) {
      equip($item`Fourth of May Cosplay Saber`);
      equip($item`familiar scrapbook`);
      visitUrl("adventure.php?snarfblat=442");
      setChoice(1387, 3);
      adventureMacroAuto(
        $location`Barf Mountain`,
        Macro.skill($skill`Meteor Shower`).skill($skill`Use the Force`)
      );
    }
    setAutoAttack(0);

    // wish for healthy green glow, +10 familiar weight
    wishEffect($effect`healthy green glow`);

    //useFamiliar($familiar`disembodied hand`);
    useFamiliar($familiar`Left-Hand Man`);
    maximize("spell damage", false);

    if (round(numericModifier("spell damage percent")) % 50 >= 40) {
      ensureItem(1, $item`soda water`);
      ensurePotionEffect($effect`Concentration`, $item`cordial of concentration`);
    }

    if (round(numericModifier("spell damage")) % 50 >= 39) {
      ensureItem(1, $item`vial of Gnomochloric acid`);
      ensurePotionEffect($effect`Baconstoned`, $item`vial of baconstone juice`);
    }

    function spellTurns() {
      return (
        60 -
        floor(numericModifier("spell damage") / 50 + 0.001) -
        floor(numericModifier("spell damage percent") / 50 + 0.001)
      );
    }

    while (spellTurns() > myAdventures()) {
      eat(1, $item`magical sausage`);
    }

    if (spellTurns() > targetTurns.get(TEST_SPELL)) {
      throw (
        "Can't achieve target turns for spell damage test. Current: " +
        spellTurns() +
        " Target: " +
        targetTurns.get(TEST_SPELL)
      );
    }

    //cliExecute("modtrace spell damage");
    //abort();

    setProperty("_hccsSpellTurnsUncapped", spellTurns() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_SPELL);
    SPELL_TURNS = myTurncount() - TEMP_TURNS;
    setProperty("_hccsSpellTurns", SPELL_TURNS.toString());
    if (is100Run) {
      useFamiliar(familiarFor100Run);
    }
  }
}

function testItemDrop() {
  if (!testDone(TEST_ITEM)) {
    ensureMpSausage(500);

    fightSausageIfGuaranteed();

    if (myInebriety() < inebrietyLimit() - 1 && !have($effect`Sacré Mental`)) {
      //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis
      putCloset($item`Swizzler`, itemAmount($item`Swizzler`));
      ensureOde(1);
      drink(1, $item`Sacramento wine`);
      takeCloset($item`Swizzler`, closetAmount($item`Swizzler`));
    }

    // kramco messes up maps
    equip($item`familiar scrapbook`);

    //getting a lil ninja costume for the tot
    if (
      availableAmount($item`li'l ninja costume`) === 0 &&
      getPropertyInt("_shatteringPunchUsed") < 3
    ) {
      Macro.skill($skill`shattering punch`).setAutoAttack();
      mapMonster($location`The Haiku Dungeon`, $monster`Amateur ninja`);
      setLocation($location`none`);
      setAutoAttack(0);
    }

    // use abstraction: certainty if you have it
    // ensureEffect($effect`certainty`);
    // pulls wheel of fortune from deck, gets rope and wrench for later
    if (getPropertyInt("_deckCardsDrawn") === 10) {
      cliExecute("cheat buff items");
    }
    // get pirate DNA and make a gene tonic
    // if (get("dnaSyringe") !== "pirate" && haveEffect($effect`Human-Pirate Hybrid`) === 0) {
    //   equip($slot`acc1`, $item`Kremlin\'s Greatest Briefcase`);
    //   if (get("_kgbTranquilizerDartUses") >= 3) {
    //     error("Out of KGB banishes");
    //   }
    //   // adv once for the opening free NC, should check NC queue here
    //   print($location`Pirates of the Garbage Barges`.noncombatQueue);
    //   adv1($location`Pirates of the Garbage Barges`, -1, "");
    //   print($location`Pirates of the Garbage Barges`.noncombatQueue);
    //   if (
    //     containsText(
    //       $location`Pirates of the Garbage Barges`.noncombatQueue,
    //       "Dead Men Smell No Tales"
    //     )
    //   ) {
    //     adventureMacroAuto(
    //       $location`Pirates of the Garbage Barges`,
    //       Macro.item($item`DNA extraction syringe`).skill($skill`KGB tranquilizer dart`)
    //     );
    //     geneTonic("pirate");
    //     ensureEffect($effect`Human-Pirate Hybrid`);
    //     setAutoAttack(0);
    //   } else throw "Something went wrong getting pirate DNA.";
    // }
    //useDefaultFamiliar();
    // if (haveEffect($effect`Bat-Adjacent Form`) === 0) {
    //   if (getPropertyInt("_reflexHammerUsed") >= 3) error("Out of reflex hammers!");
    //   equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
    //   equip($item`vampyric cloake`);
    //   adventureMacroAuto(
    //     $location`The Neverending Party`,
    //     Macro.skill($skill`Become a Bat`).skill($skill`Reflex Hammer`)
    //   );
    //   setAutoAttack(0);
    // }
    if (!getPropertyBoolean("_clanFortuneBuffUsed")) {
      ensureEffect($effect`There\'s No N In Love`);
    }

    ensureEffect($effect`Fat Leon\'s Phat Loot Lyric`);
    ensureEffect($effect`Singer\'s Faithful Ocelot`);
    //TODO: uncomment when i learn skill
    //ensureEffect($effect`The Spirit of Taking`);
    ensureEffect($effect`items.enh`);

    // see what class we are, maybe a couple other buffs
    if (myClass() === $class`pastamancer`) {
      cliExecute("barrelprayer buff");
    }

    //TODO: uncomment if i buy birds
    // if (myClass() === $class`sauceror`) {
    //   useSkill(1, $skill`Seek out a Bird`); // seek out a bird
    // }

    // Use bag of grain.
    ensureEffect($effect`Nearly All-Natural`);

    ensureEffect($effect`Feeling Lost`);
    ensureEffect($effect`Steely-Eyed Squint`);

    //candle correspondence
    if (have($item`Salsa Caliente candle`)) {
      ensureEffect($effect`El Aroma de Salsa`);
    }

    // get big smile of the blender if available, someday use this to replace something?
    // if (getPropertyInt("_campAwaySmileBuffs") === 1) {
    //   visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    // }

    useFamiliar($familiar`Trick-or-Treating Tot`);
    equip($item`li'l ninja costume`); // ninja costume for 150% item

    maximize(
      "item, 2 booze drop, -equip broken champagne bottle, -equip surprisingly capacious handbag",
      false
    );

    //synthesisPlanner.synthesize($effect`Synthesis: Collection`);

    function itemdrop() {
      return (
        60 -
        floor(numericModifier("Item Drop") / 30 + 0.001) -
        floor(numericModifier("Booze Drop") / 15 + 0.001)
      );
    }

    if (itemdrop() > targetTurns.get(TEST_ITEM)) {
      throw (
        "Can't achieve target turns for item drop test. Current: " +
        itemdrop() +
        " Target: " +
        targetTurns.get(TEST_ITEM)
      );
    }

    // cli_execute('modtrace item');
    // abort();

    setProperty("_hccsItemTurnsUncapped", itemdrop() + "");
    TEMP_TURNS = myTurncount();
    doTest(TEST_ITEM);
    ITEM_TURNS = myTurncount() - TEMP_TURNS;
    if (is100Run) {
      useFamiliar(familiarFor100Run);
    }
    setProperty("_hccsItemTurns", ITEM_TURNS.toString());
  }
}

export function main(argString = "") {
  targetTurns.set(TEST_HP, 1);
  targetTurns.set(TEST_MUS, 1);
  targetTurns.set(TEST_MYS, 1);
  targetTurns.set(TEST_MOX, 1);
  targetTurns.set(TEST_HOT_RES, 1);
  targetTurns.set(TEST_NONCOMBAT, 1);
  targetTurns.set(TEST_FAMILIAR, 30);
  targetTurns.set(TEST_WEAPON, 1);
  targetTurns.set(TEST_SPELL, 29);
  targetTurns.set(TEST_ITEM, 1);

  try {
    if (is100Run) {
      familiarFor100Run = toFamiliar(getProperty("_hccsFamiliar"));
      if (familiarFor100Run == $familiar`none`) {
        if (userConfirm("Is " + myFamiliar() + " the familiar you want?")) {
          familiarFor100Run = myFamiliar();
          setProperty("_hccsFamiliar", familiarFor100Run + "");
        } else {
          abort("Pick the correct familiar");
        }
      }
    }

    // Don't buy stuff from NPC stores.
    setProperty("_saved_autoSatisfyWithNPCs", getProperty("autoSatisfyWithNPCs"));
    setProperty("autoSatisfyWithNPCs", "false");

    // Do buy stuff from coinmasters (hermit).
    setProperty("_saved_autoSatisfyWithCoinmasters", getProperty("autoSatisfyWithCoinmasters"));
    setProperty("autoSatisfyWithCoinmasters", "true");

    // Initialize council.
    visitUrl("council.php");

    if (get("backupCameraReverserEnabled") === false) {
      cliExecute("backupcamera reverser on");
    }

    // All combat handled by our consult script (hccs_combat.ash).
    cliExecute("ccs libram");

    // Turn off Lil' Doctor quests.
    setChoice(1340, 3);

    // in case you're re-running it
    setAutoAttack(0);

    // Default equipment.
    //TODO: set mode for cape and camera. perhaps modify briefcase?
    equip($item`Fourth of May Cosplay Saber`);
    equip($item`familiar scrapbook`);
    // equip($item[Kramco Sausage-o-Matic&trade;]);
    cliExecute("retrocape mysticality thrill");
    equip($item`unwrapped knock-off retro superhero cape`);
    equip($item`Cargo Cultist Shorts`);
    equip($slot`acc1`, $item`your cowboy boots`);
    equip($slot`acc2`, $item`Kremlin's Greatest Briefcase`);
    equip($slot`acc3`, $item`backup camera`);

    if (is100Run) {
      useFamiliar(familiarFor100Run);
    }

    testCoilWire();
    testHP();
    testMus();
    testMys();
    testMox();
    testHotRes();
    testNonCombat();
    testFamiliarWeight();
    testWeaponDamage();
    testSpellDamage();
    testItemDrop();

    cliExecute("mood default");
    cliExecute("ccs default");
    cliExecute("boombox food");
    cliExecute("/whitelist Reddit United");

    visitUrl("peevpee.php?action=smashstone&confirm=on");
    print("Stone smashed. Get your PVP on!", "green");
    // spar for 6 fights
    //NOTE: sparring actually costs an adv
    // if (get("_daycareRecruits") === 0 && hippyStoneBroken() === true) {
    //   visitUrl("place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
    //   runChoice(3);
    //   runChoice(1);
    //   runChoice(4);
    //   runChoice(5);
    //   runChoice(4);
    // }

    // cliExecute("pvp fame Loot Hunter");

    END_TIME = gametimeToInt();
    //donate your body to science
    print("Donating your body to science!", "blue");
    visitUrl("council.php");
    visitUrl("choice.php?whichchoice=1089&option=30&pwd");
  } finally {
    setProperty("autoSatisfyWithNPCs", "true");
    setProperty("autoSatisfyWithCoinmasters", getProperty("_saved_autoSatisfyWithCoinmasters"));
    setProperty("hpAutoRecovery", "0.8");

    print(
      "This loop took " +
        floor((END_TIME - START_TIME) / 1000 / 60) +
        " minutes and " +
        ceil(((END_TIME - START_TIME) / 1000) % 60) +
        " seconds, for a 1 day, " +
        myTurncount() +
        " turn HCCS run. Organ use was " +
        myFullness() +
        "/" +
        myInebriety() +
        "/" +
        mySpleenUse() +
        ". I drank " +
        (6 - availableAmount($item`astral pilsner`)) +
        " Astral Pilsners.",
      "green"
    );

    print("HP test: " + getProperty("_hccsHpTurns"), "green");
    print("Muscle test: " + getProperty("_hccsMusTurns"), "green");
    print("Myst test: " + getProperty("_hccsMysTurns"), "green");
    print("Moxie test: " + getProperty("_hccsMoxTurns"), "green");
    print("Hot Res test: " + getProperty("_hccsHotResTurns"), "green");
    print("Noncombat test: " + getProperty("_hccsNonCombatTurns"), "green");
    print("Fam Weight test: " + getProperty("_hccsFamiliarTurns"), "green");
    print("Weapon Damage test: " + getProperty("_hccsWeaponTurns"), "green");
    print("Spell Damage Test: " + getProperty("_hccsSpellTurns"), "green");
    print("Item Drop test: " + getProperty("_hccsItemTurns"), "green");

    print("--------Uncapped turns--------", "green");
    print("HP test: " + getProperty("_hccsHpTurnsUncapped"), "green");
    print("Muscle test: " + getProperty("_hccsMusTurnsUncapped"), "green");
    print("Myst test: " + getProperty("_hccsMysTurnsUncapped"), "green");
    print("Moxie test: " + getProperty("_hccsMoxTurnsUncapped"), "green");
    print("Hot Res test: " + getProperty("_hccsHotResTurnsUncapped"), "green");
    print("Noncombat test: " + getProperty("_hccsNonCombatTurnsUncapped"), "green");
    print("Fam Weight test: " + getProperty("_hccsFamiliarTurnsUncapped"), "green");
    print("Weapon Damage test: " + getProperty("_hccsWeaponTurnsUncapped"), "green");
    print("Spell Damage Test: " + getProperty("_hccsSpellTurnsUncapped"), "green");
    print("Item Drop test: " + getProperty("_hccsItemTurnsUncapped"), "green");

    if (get("_questPartyFairQuest") === "food") {
      print("Hey, go talk to Geraldine!", "blue");
    } else if (get("_questPartyFairQuest") === "booze") {
      print("Hey, go talk to Gerald!", "blue");
    }
  }
}
