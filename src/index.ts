import {
    abort,
    cliExecute,
    Familiar,
    getProperty,
    hippyStoneBroken,
    myDaycount,
    myFamiliar,
    myLevel,
    myTurncount,
    print,
    setAutoAttack,
    setProperty,
    toFamiliar,
    useFamiliar,
    userConfirm,
    visitUrl,
} from "kolmafia";
import { $effects, $familiar, Clan, CommunityService } from "libram";
import { get, PropertiesManager } from "libram/dist/property";
import { level } from "./level";
import { ResourceTracker } from "./resources";
import { SynthesisPlanner } from "./synthesis";
import {
    coilPrep,
    famWtPrep,
    hotResPrep,
    hpPrep,
    itemPrep,
    moxPrep,
    musPrep,
    mysPrep,
    nonCombatPrep,
    spellPrep,
    WeaponPrep,
} from "./tests";

export const resources = new ResourceTracker();
export const propertyManager = new PropertiesManager();
//are we going for an 100% familiar run?
export const is100Run = false;
export let familiarFor100Run: Familiar;
// Sweet Synthesis plan.
// This is the sequence of synthesis effects; we will, if possible, come up with a plan for allocating candy to each of these.
export const synthesisPlanner = new SynthesisPlanner(
  //$effects`Synthesis: Learning, Synthesis: Smart, Synthesis: Strong, Synthesis: Cool, Synthesis: Collection`
  $effects`Synthesis: Learning, Synthesis: Smart`
);

const assertTest = (action: string, test: string) => {
    if (action === "failed") throw `${test} test failed to complete.`;
};

export function endOfRunPvp(): void {
    // break stone
    if (!hippyStoneBroken()) visitUrl("peevpee.php?action=smashstone&confirm=on");

    // run optimizer and fight, choosing whatever mini you like this season
    // cliExecute("uberpvpoptimizer");
    // cliExecute("pvp fame maul power");
}

if (is100Run) {
    familiarFor100Run = toFamiliar(getProperty("_hccsFamiliar"));
    if (familiarFor100Run === $familiar`none`) {
        if (userConfirm(`Is ${myFamiliar()} the familiar you want?`)) {
            familiarFor100Run = myFamiliar();
            setProperty("_hccsFamiliar", `${familiarFor100Run}`);
        } else {
            abort("Pick the correct familiar");
        }
    }
    useFamiliar(familiarFor100Run);
}

cliExecute("mood apathetic");

// All combat handled by our consult script (libramMacro.js).
cliExecute("ccs libram");

//Clan.join("Bonus Adventures from Hell");
try {
    assertTest(CommunityService.CoilWire.run(coilPrep, 60), "Coil Wire");
    if (myLevel() < 14 || !CommunityService.HP.isDone()) level();
    assertTest(CommunityService.HP.run(hpPrep, 1), "HP");
    assertTest(CommunityService.Muscle.run(musPrep, 1), "Muscle");
    assertTest(CommunityService.Moxie.run(moxPrep, 1), "Moxie");
    assertTest(CommunityService.Mysticality.run(mysPrep, 1), "Mysticality");
    assertTest(CommunityService.HotRes.run(hotResPrep, 1), "Hot Res");
    assertTest(CommunityService.Noncombat.run(nonCombatPrep, 1), "Noncombat");
    assertTest(CommunityService.FamiliarWeight.run(famWtPrep, 28), "Familiar Weight");
    assertTest(CommunityService.WeaponDamage.run(WeaponPrep, 1), "Weapon Damage");
    assertTest(CommunityService.SpellDamage.run(spellPrep, 18), "Spell Damage");
    assertTest(CommunityService.BoozeDrop.run(itemPrep, 1), "Item");
} finally {
    propertyManager.resetAll();
    setAutoAttack(0);
    cliExecute("ccs default");
    cliExecute("mood default");
    Clan.join("The Average Clan");
    CommunityService.printLog("green");
}

// only do pvp and donate if we're done with all the quests
if (get("csServicesPerformed").split(",").length === 11) {
    endOfRunPvp();
    CommunityService.donate();
    CommunityService.printLog("green");
    print();
    print(`That is a ${myDaycount()} day, ${myTurncount()} turn HCCS run. Nice work!`, `green`);
    print();
    resources.summarize();
} else print("You don't actually appear to be done.", "red");
