import {
    abort,
    adv1,
    autosell,
    availableAmount,
    buy,
    cliExecute,
    cliExecuteOutput,
    closetAmount,
    containsText,
    create,
    drink,
    eat,
    equip,
    getProperty,
    handlingChoice,
    haveEffect,
    inebrietyLimit,
    itemAmount,
    logprint,
    maximize,
    mpCost,
    myBasestat,
    myBuffedstat,
    myClass,
    myFullness,
    myGardenType,
    myHp,
    myInebriety,
    myLevel,
    myMaxhp,
    myMaxmp,
    myMp,
    mySpleenUse,
    numericModifier,
    print,
    putCloset,
    retrieveItem,
    runChoice,
    runCombat,
    setAutoAttack,
    setProperty,
    sweetSynthesis,
    takeCloset,
    use,
    useFamiliar,
    useSkill,
    visitUrl,
} from "kolmafia";
import {
    $class,
    $classes,
    $coinmaster,
    $effect,
    $familiar,
    $item,
    $items,
    $location,
    $monster,
    $skill,
    $slot,
    $stat,
    adventureMacro,
    adventureMacroAuto,
    AsdonMartin,
    Clan,
    CombatLoversLocket,
    CommunityService,
    ensureEffect,
    get,
    have,
    set,
    SongBoom,
} from "libram";
import { familiarFor100Run, is100Run, propertyManager, resources, synthesisPlanner } from ".";
import Macro, { withMacro } from "./combat";
import {
    ensureCreateItem,
    ensureInnerElf,
    ensureItem,
    ensureMpSausage,
    ensureMpTonic,
    ensureNpcEffect,
    ensureOde,
    ensurePotionEffect,
    ensurePullEffect,
    ensureSewerItem,
    ensureSong,
    equalizeStat,
    incrementProperty,
    pullIfPossible,
    setChoice,
    tryEnsureEffect,
    tryUse,
    useDefaultFamiliar,
} from "./lib";
import { globalOptions } from "./options";
import uniform, {
    famweightOutfit,
    hotresOutfit,
    hpOutfit,
    itemOutfit,
    moxieOutfit,
    muscleOutfit,
    mysticalityOutfit,
    noncombatOutfit,
    spellOutfit,
    weaponOutfit,
    wireOutfit,
} from "./outfits";

export function coilPrep() {
    Clan.join("Bonus Adventures from Hell");
    if (get("_clanFortuneConsultUses") < 3) {
        while (get("_clanFortuneConsultUses") < 3) {
            cliExecute("fortune cheesefax garbage garbage thick");
            cliExecute("wait 5");
        }
    }

    ensureMpTonic(1);
    if (myLevel() === 1 && mySpleenUse() === 0) {
        while (get("_universeCalculated") < get("skillLevel144")) {
            cliExecute("numberology 69");
        }
    }

    if (get("_deckCardsDrawn") < 5) resources.deck("1952");
    autosell(1, $item`1952 Mickey Mantle card`);
    buy(1, $item`Desert Bus pass`);

    // Buy toy accordion
    ensureItem(1, $item`toy accordion`);

    if (!get("_chateauDeskHarvested")) {
        // Chateau piggy bank
        visitUrl("place.php?whichplace=chateau&action=chateau_desk1");
    }

    // Upgrade saber for fam wt
    if (get("_saberMod") === 0) {
        visitUrl("main.php?action=may4");
        runChoice(4);
    }

    // Vote.
    if (get("_voteModifier") === "") {
        visitUrl("place.php?whichplace=town_right&action=townright_vote");
        visitUrl("choice.php?option=1&whichchoice=1331&g=2&local%5B%5D=1&local%5B%5D=2");
        // Make sure initiative-tracking works.
        visitUrl("place.php?whichplace=town_right&action=townright_vote");
    }

    //TODO: reenable if i get peppermint garden
    // pick garden for synth.
    // if (myGardenType() === "peppermint") {
    //     cliExecute("garden pick");
    // } else {
    //     print(
    //         "WARNING: This script is built for peppermint garden. Switch gardens or find other candy.",
    //         "red"
    //     );
    // }

    //TODO: enable if i buy bird calendar
    // Initialize bird calendar
    //use(1, $item`Bird-a-Day calendar`);

    // get cowboy boots
    visitUrl("place.php?whichplace=town_right&action=townright_ltt");

    // Sell pork gems + tent
    visitUrl("tutorial.php?action=toot");
    tryUse(1, $item`letter from King Ralph XI`);
    tryUse(1, $item`pork elf goodies sack`);
    autosell(5, $item`baconstone`);
    autosell(5, $item`hamethyst`);

    // get things to cast buffs
    ensureSewerItem(1, $item`turtle totem`);
    ensureSewerItem(1, $item`saucepan`);

    //TODO: reenable if i get detective agency (unlikely)
    // Detective Agency for NC test
    // requires Ezandora's script
    // shouldn't need this if we have the PM bird, but we still want detective badge
    // if (get("_detectiveCasesCompleted") < 3 && myClass() !== $class`Pastamancer`)
    //     cliExecute("detective solver");
    // else visitUrl("place.php?whichplace=town_wrong&action=townwrong_precinct");

    // Set doc bag choice
    setChoice(1340, 3);

    //TODO:  Check if something else might had been better
    //20% item drop, +20% stats weapon
    if (!have($item`oversized sparkler`)) {
        visitUrl("clan_viplounge.php?action=fwshop&whichfloor=2"); //a bug prevents buying if you haven't visited shop first
        buy(1, $item`oversized sparkler`);
    }

    // make pantogram pants for hilarity and spell damage
    if (availableAmount($item`pantogram pants`) === 0) {
        // retrieveItem(1, $item`ten-leaf clover`);
        cliExecute("pantogram hot|-combat|silent");
    }

    // Grab fish hatchett here, for fam wt, -combat, and muscle tests
    // TODO: see if you can cut this
    retrieveItem(1, $item`fish hatchet`);

    if (!get("_borrowedTimeUsed")) {
        if (!have($item`borrowed time`)) resources.clipArt($item`borrowed time`);
        use($item`borrowed time`);
    }

    while (get("_smithsnessSummons") < 1) {
        ensureMpTonic(6);
        resources.tome($skill`Summon Smithsness`);
    }

    //TODO: i don't have borrowed time so need to eat/drink here to get to 60 adventures
    if (myFullness() === 0) {
        buy($item`pickled egg`, 2);
        eat(2, $item`This Charming Flan`);
    }

    if (!have($item`dromedary drinking helmet`) && get("tomeSummons") < 3 && !is100Run) {
        resources.clipArt($item`box of Familiar Jacks`);
        useFamiliar($familiar`Melodramedary`);
        use($item`box of Familiar Jacks`);
    }

    // fight a ghost and kramco before coiling
    function firstFights() {
        uniform(
            ...$items`protonic accelerator pack, Daylight Shavings Helmet, Kramco Sausage-o-Matic™`
        );
        useDefaultFamiliar();
        adventureMacroAuto(
            $location`Noob Cave`,
            Macro.skill($skill`Micrometeorite`)
                .item($item`Time-Spinner`)
                .attack()
                .repeat()
        );

        if (have($item`magical sausage casing`)) {
            create(1, $item`magical sausage`);
        }
        if (have($item`magical sausage`)) {
            eat(1, $item`magical sausage`);
        }

        const ghostLocation = get("ghostLocation");
        if (ghostLocation) {
            uniform(...$items`latte lovers member's mug, protonic accelerator pack`);
            useDefaultFamiliar();
            adventureMacro(
                ghostLocation,
                Macro.skill($skill`Micrometeorite`)
                    .item($item`Time-Spinner`)
                    .skill($skill`Curse of Weaksauce`)
                    .trySkill($skill`Shoot Ghost`)
                    .trySkill($skill`Shoot Ghost`)
                    .trySkill($skill`Shoot Ghost`)
                    .trySkill($skill`Trap Ghost`)
            );
        }
    }

    firstFights();

    visitUrl("council.php");
    wireOutfit();
}

export function moxPrep() {
    equalizeStat($stat`Moxie`);

    // Beach Comb
    ensureEffect($effect`Pomp & Circumsands`);

    //TODO: uncomment if i get bird calendar
    // PM day 1 is moxie, as is sauce
    //ensureEffect($effect`Blessing of the Bird`);

    ensureEffect($effect`Song of Bravado`);
    ensureSong($effect`Stevedave's Shanty of Superiority`);
    ensureEffect($effect`Quiet Desperation`);
    ensureEffect($effect`Disco Fever`);
    ensureEffect($effect`Big`);
    ensureEffect($effect`Blubbered Up`);
    ensureNpcEffect($effect`Butt-Rock Hair`, 5, $item`hair spray`);
    useSkill($skill`Acquire Rhinestones`);
    use(availableAmount($item`rhinestone`), $item`rhinestone`);
    if (!have($effect`Unrunnable Face`)) {
        tryUse(1, $item`runproof mascara`);
    }

    useFamiliar($familiar`Left-Hand Man`);
    //maximize("moxie", false);
    moxieOutfit();
    if (globalOptions.debug) {
        print(`equalized base stat: ${myBasestat($stat`mysticality`)}`);
        print(`buffed moxie: ${myBuffedstat($stat`moxie`)}`);
        logprint(cliExecuteOutput("modtrace mox"));
    }
}

export function hpPrep() {
    equalizeStat($stat`Muscle`);

    ensureEffect($effect`Song of Starch`);
    ensureEffect($effect`Big`);
    ensureEffect($effect`Rage of the Reindeer`);
    ensureEffect($effect`Quiet Determination`);
    ensureEffect($effect`Disdain of the War Snapper`);
    ensureNpcEffect($effect`Go Get 'Em, Tiger!`, 5, $item`Ben-Gal™ Balm`);

    // FIXME: Outfit
    //maximize("hp", false);
    hpOutfit();
    if (globalOptions.debug) {
        logprint(cliExecuteOutput("modtrace hp"));
    }
}

export function musPrep() {
    equalizeStat($stat`Muscle`);

    ensureEffect($effect`Song of Bravado`);
    ensureSong($effect`Stevedave's Shanty of Superiority`);
    ensureSong($effect`Power Ballad of the Arrowsmith`);
    ensureEffect($effect`Rage of the Reindeer`);
    ensureEffect($effect`Quiet Determination`);
    ensureEffect($effect`Lack of Body-Building`);
    ensureEffect($effect`Big`);
    if (myClass() !== $class`Turtle Tamer`) ensureEffect($effect`Disdain of the War Snapper`);
    ensureNpcEffect($effect`Go Get 'Em, Tiger!`, 5, $item`Ben-Gal™ Balm`);

    useFamiliar($familiar`Left-Hand Man`);
    //maximize("muscle", false);

    muscleOutfit();
    //if (CommunityService.Muscle.prediction > 1) ensureInnerElf();
    if (globalOptions.debug) {
        print(`equalized base stat: ${myBasestat($stat`mysticality`)}`);
        print(`buffed muscle: ${myBuffedstat($stat`muscle`)}`);
        logprint(cliExecuteOutput("modtrace muscle"));
    }
}

export function mysPrep() {
    ensureEffect($effect`Big`);
    ensureEffect($effect`Song of Bravado`);
    ensureSong($effect`Stevedave's Shanty of Superiority`);
    ensureEffect($effect`Quiet Judgement`);
    //ensureEffect($effect`Mystically Oiled`);
    ensureNpcEffect($effect`Glittering Eyelashes`, 5, $item`glittery mascara`);

    //maximize("mysticality", false);
    mysticalityOutfit();
    if (globalOptions.debug) {
        logprint(cliExecuteOutput("modtrace mys"));
    }
}

export function nonCombatPrep() {
    if (get("_godLobsterFights") < 3 && !is100Run) {
        if (myHp() < 0.8 * myMaxhp()) useSkill(1, $skill`Cannelloni Cocoon`);
        useFamiliar($familiar`God Lobster`);
        // Get -combat buff.
        propertyManager.setChoices({ [1310]: 2 });
        equip($item`God Lobster's Ring`);
        visitUrl("main.php?fightgodlobster=1");
        withMacro(Macro.kill(), () => runCombat());
        if (handlingChoice()) runChoice(2);
    }

    cliExecute("briefcase e -combat");

    //if (getProperty("_horsery") !== "dark horse") cliExecute("horsery dark");

    if (myHp() < 30) useSkill(1, $skill`Cannelloni Cocoon`);
    ensureEffect($effect`Blood Bond`);
    ensureEffect($effect`Leash of Linguini`);
    ensureEffect($effect`Empathy`);

    equip($slot`acc2`, $item`Powerful Glove`);

    ensureEffect($effect`The Sonata of Sneakiness`);
    ensureEffect($effect`Smooth Movements`);
    ensureEffect($effect`Invisible Avatar`);
    ensureEffect($effect`Silent Running`);
    ensureEffect($effect`Feeling Lonely`);

    // Rewards
    ensureEffect($effect`Throwing Some Shade`);

    if (globalOptions.workshed === "Asdon") AsdonMartin.drive($effect`Driving Stealthily`, 1);

    // Without the PM bird, we need shoe gum
    // if (myClass() !== $class`Pastamancer`)
    //     ensurePotionEffect($effect`Gummed Shoes`, $item`shoe gum`);

    //TODO: uncomment when i get bird calendar
    // Pastamancer d1 is -combat.
    // if (myClass() === $class`Pastamancer`) ensureEffect($effect`Blessing of the Bird`);

    cliExecute("acquire 1 unbreakable umbrella; umbrella nc");

    //maximize("-combat, 0.01 familiar weight", false);
    noncombatOutfit();

    if (globalOptions.debug) {
        logprint(cliExecuteOutput("modtrace combat rate"));
    }
}

export function hotResPrep() {
    if (is100Run) {
        useFamiliar(familiarFor100Run);
    }
    ensureMpTonic(500);

    // These should have fallen through all the way from leveling.
    //TODO: uncomment when i get pillkeeper
    //ensureEffect($effect`Fidoxene`);
    ensureEffect($effect`Do I Know You From Somewhere?`);
    ensureEffect($effect`Puzzle Champ`);
    ensureEffect($effect`Billiards Belligerence`);
    ensureEffect($effect`Astral Shell`);
    ensureEffect($effect`Elemental Saucesphere`);
    if (have($item`ratty knitted cap`)) {
        cliExecute(`smash ${availableAmount($item`ratty knitted cap`)} ratty knitted cap`);
    }
    if (have($item`red-hot sausage fork`)) {
        cliExecute(`smash ${availableAmount($item`red-hot sausage fork`)} red-hot sausage fork`);
    }

    ensureEffect($effect`Blood Bond`);
    ensureEffect($effect`Leash of Linguini`);
    ensureEffect($effect`Empathy`);


    // Beach comb buff.
    ensureEffect($effect`Hot-Headed`);

    if (!have($effect`Fireproof Foam Suit`)) {
        equip($slot`weapon`, $item`industrial fire extinguisher`);
        equip($slot`off-hand`, $item`Fourth of May Cosplay Saber`);
        //TODO: enable if i get vampyric cloake
        //equip($item`vampyric cloake`);
        propertyManager.setChoices({ [1387]: 3 });
        adv1($location`LavaCo™ Lamp Factory`, -1, "");
        resources.mapMacro(
            $location`LavaCo™ Lamp Factory`,
            $monster`factory worker (female)`,
            Macro.trySkill($skill`Become a Cloud of Mist`)
                .skill($skill`Fire Extinguisher: Foam Yourself`)
                .skill($skill`Use the Force`)
        );
        if (handlingChoice()) runChoice(-1);
        resources.saberForces.push($effect`Fireproof Foam Suit`);
    }

    useFamiliar($familiar`Exotic Parrot`);
    while (
        have($skill`Deep Dark Visions`) &&
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
        if (Math.round(numericModifier("spooky resistance")) < 10) {
            ensureEffect($effect`Does It Have a Skull In There??`);
            if (Math.round(numericModifier("spooky resistance")) < 10) {
                throw "Not enough spooky res for Deep Dark Visions.";
            }
        }
        useSkill(1, $skill`Deep Dark Visions`);
    }

    if (
        availableAmount($item`sleaze powder`) > 0 ||
        availableAmount($item`lotion of sleaziness`) > 0
    ) {
        ensurePotionEffect($effect`Sleazy Hands`, $item`lotion of sleaziness`);
    }

    ensureEffect($effect`Feeling Peaceful`);

    useFamiliar($familiar`Exotic Parrot`);

    // Mafia sometimes can't figure out that multiple +weight things would get us to next tier.

    cliExecute("briefcase e hot -combat");
    cliExecute("retrocape mus hold");
    if (
        availableAmount($item`metal meteoroid`) > 0 &&
        availableAmount($item`meteorite guard`) === 0
    ) {
        cliExecute("create 1 meteorite guard");
    }
    hotresOutfit();
    if (globalOptions.debug) {
        logprint(cliExecuteOutput("modtrace hot res"));
    }
}

export function famWtPrep() {
    if (is100Run) {
        useFamiliar(familiarFor100Run);
    }
    if (myHp() < 30) useSkill(1, $skill`Cannelloni Cocoon`);
    ensureEffect($effect`Blood Bond`);
    ensureEffect($effect`Leash of Linguini`);
    ensureEffect($effect`Empathy`);

    // These should have fallen through all the way from leveling.
    //TODO: uncomment when i get pillkeeper
    //ensureEffect($effect`Fidoxene`);
    ensureEffect($effect`Do I Know You From Somewhere?`);
    ensureEffect($effect`Puzzle Champ`);
    ensureEffect($effect`Billiards Belligerence`);
    tryEnsureEffect($effect`Shortly Stacked`);

    // NC reward
    ensureEffect($effect`Robot Friends`);

    useFamiliar($familiar`Baby Bugged Bugbear`);
    visitUrl("arena.php");

    // use freeruns at gingerbread city to get gingerbread spice latte
    // if (
    //     haveEffect($effect`Whole Latte Love`) === 0 &&
    //     availableAmount($item`gingerbread spice latte`) === 0
    // ) {
    //     useFamiliar($familiar`Chocolate Lab`);
    //     // TODO: get rid of this maximize call
    //     maximize("sprinkle drop", false);
    //     if (!get("_gingerbreadClockAdvanced")) {
    //         visitUrl("adventure.php?snarfblat=477");
    //         runChoice(1);
    //     }
    //     if (availableAmount($item`sprinkles`) < 50) {
    //         equip($slot`acc1`, $item`Lil' Doctor™ bag`);
    //         adventureMacroAuto(
    //             $location`Gingerbread Upscale Retail District`,
    //             Macro.if_(
    //                 "monstername gingerbread gentrifier",
    //                 Macro.skill($skill`Macrometeorite`)
    //             ).skill($skill`Chest X-Ray`)
    //         );
    //         setAutoAttack(0);
    //     }
    //     if (availableAmount($item`sprinkles`) >= 50) {
    //         useFamiliar($familiar`Frumious Bandersnatch`);
    //         ensureEffect($effect`Ode to Booze`);
    //         setChoice(1208, 3);
    //         while (
    //             availableAmount($item`gingerbread spice latte`) === 0 &&
    //             haveEffect($effect`Whole Latte Love`) === 0
    //         ) {
    //             adventureMacro($location`Gingerbread Upscale Retail District`, Macro.runaway());
    //         }
    //     } else {
    //         throw "Something went wrong getting sprinkles";
    //     }
    //     use($item`gingerbread spice latte`);
    //     useDefaultFamiliar();
    // }

    if (haveEffect($effect`Meteor Showered`) === 0) {
        equip($item`Fourth of May Cosplay Saber`);
        adventureMacro(
            $location`The Neverending Party`,
            Macro.skill($skill`Meteor Shower`).skill($skill`Use the Force`)
        );
        if (haveEffect($effect`Meteor Showered`) > 0) incrementProperty("_meteorShowerUses");
        resources.saberForces.push($effect`Meteor Showered`);
    }

    // make a crane if we have one
    if (
        availableAmount($item`burning newspaper`) > 0 &&
        availableAmount($item`burning paper crane`) < 1
    ) {
        cliExecute("create 1 burning paper crane");
    }

    if (!have($item`sombrero-mounted sparkler`)) {
        buy(1, $item`sombrero-mounted sparkler`);
    }
    ensureEffect($effect`You Can Really Taste the Dormouse`);

    // try to get a green heart
    while (
        have($skill`Summon Candy Heart`) &&
        myMp() / myMaxmp() > 0.3 &&
        mpCost($skill`Summon BRICKOs`) <= myMp()
    ) {
        useSkill($skill`Summon Candy Heart`);
    }

    tryEnsureEffect($effect`Heart of Green`);

    pullIfPossible($item`Great Wolf's beastly trousers`, -1);

    //maximize("familiar weight", false);

    famweightOutfit();
    if (globalOptions.debug) {
        print(
            `debug: your short order cook charges were at ${get(
                "_shortOrderCookCharge"
            )} charges and your trash fire is at ${get("garbageFireProgress")}`
        );
        logprint(cliExecuteOutput("modtrace familiar weight"));
    }
}

export function WeaponPrep() {
    if (is100Run) {
        useFamiliar(familiarFor100Run);
    }

    if (myInebriety() < inebrietyLimit() - 2 && !have($effect`In a Lather`)) {
        //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis
        putCloset($item`Swizzler`, itemAmount($item`Swizzler`));
        ensureOde(2);
        cliExecute("drink 1 Sockdollager");
        resources.consumedBooze.set(
            $item`Sockdollager`,
            (resources.consumedBooze.get($item`Sockdollager`) ?? 0) + 1
        );
        takeCloset($item`Swizzler`, closetAmount($item`Swizzler`));
    }

    if (haveEffect($effect`Do You Crush What I Crush?`) === 0) {
        useFamiliar($familiar`Ghost of Crimbo Carols`);
        adventureMacro($location`The Dire Warren`, Macro.skill($skill`Feel Hatred`));
    }

    // if (
    //     $classes`Seal Clubber, Pastamancer`.includes(myClass()) &&
    //     haveEffect($effect`Saucefingers`) + haveEffect($effect`Elbow Sauce`) === 0
    // ) {
    //     useFamiliar($familiar`Mini-Adventurer`);
    //     equip($item`latte lovers member's mug`);
    //     setChoice(768, 4); // Make mini-adv a Sauceror.
    //     if (get("miniAdvClass") !== 4) {
    //         if (get("_latteBanishUsed")) throw "Latte banish used!";
    //         adventureMacro(
    //             $location`The Dire Warren`,
    //             Macro.skill($skill`Throw Latte on Opponent`)
    //         );
    //     }
    //     if (get("_latteBanishUsed")) throw "Latte banish used!";
    //     adventureMacro($location`The Dire Warren`, Macro.skill($skill`Throw Latte on Opponent`));
    // }

    ensureEffect($effect`Carol of the Bulls`);
    ensureEffect($effect`Song of the North`);
    ensureEffect($effect`Rage of the Reindeer`);
    ensureEffect($effect`Frenzied, Bloody`);
    ensureEffect($effect`Scowl of the Auk`);
    if (myClass() !== $class`Turtle Tamer`) ensureEffect($effect`Disdain of the War Snapper`);
    ensureEffect($effect`Tenacity of the Snapper`);
    ensureSong($effect`Jackasses' Symphony of Destruction`);

    ensureEffect($effect`Billiards Belligerence`);

    // Beach Comb
    if (!containsText(getProperty("_beachHeadsUsed"), "6")) {
        ensureEffect($effect`Lack of Body-Building`);
    }

    if (availableAmount($item`LOV Elixir #3`) > 0) ensureEffect($effect`The Power of LOV`);

    //TODO: uncomment when i get bird calendar
    // Pastamancer d1 is weapon damage.
    //ensureEffect($effect`Blessing of the Bird`);
    //tryEnsureEffect($effect`Blessing of your favorite Bird`);

    if (myClass() === $class`Seal Clubber`) {
        cliExecute("barrelprayer buff");
    }

    //ensureInnerElf();

    // free run from fluffy bunny for crimbo ghost buff
    if (!is100Run && !have($effect`Do You Crush What I Crush?`)) {
        useFamiliar($familiar`Ghost of Crimbo Carols`);
        equip($slot`acc3`, $item`Lil' Doctor™ bag`);
        // Don't use Kramco here.
        equip($slot`off-hand`, $item`none`);
        adventureMacroAuto($location`The Dire Warren`, Macro.skill($skill`Reflex Hammer`));
    }

    // fax ungulith (Saber YR)
    if (!have($item`corrupted marrow`) && !have($effect`Cowrruption`)) {
        if (get("camelSpit") === 100 && have($familiar`Melodramedary`) && !is100Run) {
            useFamiliar($familiar`Melodramedary`);
        }
        equip($item`Fourth of May Cosplay Saber`, $slot`weapon`);
        setChoice(1387, 3);
        Macro.skill($skill`Meteor Shower`)
            .trySkill($skill`%fn\, spit on me!`)
            .skill($skill`Use the Force`)
            .setAutoAttack();
        if (CombatLoversLocket.availableLocketMonsters().includes($monster`ungulith`)) {
            CombatLoversLocket.reminisce($monster`ungulith`);
        } else {
            throw "You don't have ungulith in your locket, and you don't have corrupted marrow, so that's bad.";
        }
        if (handlingChoice()) runChoice(-1);
        if (have($item`corrupted marrow`)) {
            set("_locketMonstersFought", `1932,${get("_locketMonstersFought")}`);
            resources.lockets.push($monster`ungulith`);
            resources.saberForces.push($effect`Meteor Showered`);
        }
        if (have($effect`Spit Upon`) && get("camelSpit") === 100) setProperty("camelSpit", "0");
        if (have($effect`Meteor Showered`)) set("_meteorShowerUses", 1 + get("_meteorShowerUses"));
        setAutoAttack(0);
        useDefaultFamiliar();
    }

    // Corrupted marrow
    ensureEffect($effect`Cowrruption`);

    ensureNpcEffect($effect`Engorged Weapon`, 1, $item`Meleegra™ pills`);

    SongBoom.setSong("These Fists Were Made for Punchin'");

    ensureEffect($effect`Bow-Legged Swagger`);

    ensurePullEffect($effect`Wasabi With You`, $item`wasabi marble soda`);
    ensurePullEffect(
        $effect`Things Man Was Not Meant to Eat`,
        $item`fudge-shaped hole in space-time`
    );

    // resources.wish($effect`Outer Wolf™`);

    // make KGB set to weapon
    cliExecute("briefcase e weapon spell");
    useFamiliar($familiar`Left-Hand Man`);
    //maximize("weapon damage", false);

    weaponOutfit();

    if (CommunityService.WeaponDamage.prediction > 5) {
        // Rictus of Yeg = 200% Weapon damage
        //if weapon turns are less than 5, we want to use it on spell damage instead for -4 turns there
        if (!get("_cargoPocketEmptied") && !have($effect`Rictus of Yeg`)) {
            if (availableAmount($item`Yeg's Motel toothbrush`) === 0) cliExecute("cargo 284");
            ensureEffect($effect`Rictus of Yeg`);
        }
    }

    if (globalOptions.debug) {
        logprint(cliExecuteOutput("modtrace weapon damage"));
    }
}

export function spellPrep() {
    if (is100Run) {
        useFamiliar(familiarFor100Run);
    }

    //simmering (+100% spell damage) costs 1 adv. remove if i manage to cap spell damage
    ensureEffect($effect`Simmering`);
    ensureEffect($effect`Song of Sauce`);
    ensureEffect($effect`Carol of the Hells`);
    tryEnsureEffect($effect`Arched Eyebrow of the Archmage`);
    ensureSong($effect`Jackasses' Symphony of Destruction`);

    // if (!get("grimoire3Summons") && have($skill`Summon Alice's Army Cards`)) {
    //     useSkill(1, $skill`Summon Alice's Army Cards`);
    //     buy($coinmaster`Game Shoppe Snacks`, 1, $item`tobiko marble soda`);
    // }

    //TODO: pull for -3 turns?
    //ensureEffect($effect`Pisces in the Skyces`);

    // Pool buff
    if (get("_poolGames") < 3) ensureEffect($effect`Mental A-cue-ity`);

    // Beach Comb
    ensureEffect($effect`We're All Made of Starfish`);

    if (availableAmount($item`Bettie page`) > 0) {
        ensureEffect($effect`Paging Betty`);
    }

    // Tea party
    // TODO: Is this the hatter buff we want?
    // if (!get("_madTeaParty")) {
    //     visitUrl("clan_viplounge.php?action=lookingglass&whichfloor=2");
    //     retrieveItem($item`mariachi hat`);
    //     ensureEffect($effect`Full Bottle in front of Me`);
    // }

    useSkill(1, $skill`Spirit of Cayenne`);

    if (availableAmount($item`flask of baconstone juice`) > 0) {
        ensureEffect($effect`Baconstoned`);
    }

    if (myClass() === $class`Sauceror`) {
        cliExecute("barrelprayer buff");
    }

    //ensureInnerElf();

    if (haveEffect($effect`Meteor Showered`) === 0 && get("_meteorShowerUses") < 5) {
        equip($item`Fourth of May Cosplay Saber`);
        adventureMacroAuto(
            $location`The Neverending Party`,
            Macro.skill($skill`Meteor Shower`).skill($skill`Use the Force`)
        );
        if (haveEffect($effect`Meteor Showered`) > 0) incrementProperty("_meteorShowerUses");
        resources.saberForces.push($effect`Meteor Showered`);
    }

    // Sigils of Yeg = 200% SD
    if (!get("_cargoPocketEmptied") && !have($effect`Sigils of Yeg`)) {
        if (!have($item`Yeg's Motel hand soap`)) cliExecute("cargo 177");
        ensureEffect($effect`Sigils of Yeg`);
    }

    if (availableAmount($item`LOV Elixir #6`) > 0) ensureEffect($effect`The Magic of LOV`);

    // ensureEffect($effect`AAA-Charged`); //+50% spell dmg
    // ensureEffect($effect`Lantern-Charged`); //+50% spell dmg, +100% item drop, shocking lick

    // Get flimsy hardwood scraps.
    visitUrl("shop.php?whichshop=lathe");
    if (availableAmount($item`flimsy hardwood scraps`) > 0) {
        retrieveItem(1, $item`weeping willow wand`);
    }

    if (availableAmount($item`Staff of the Headmaster's Victuals`)) {
        retrieveItem($item`Staff of the Headmaster's Victuals`);
    }

    cliExecute("briefcase enchantment spell");

    //maximize("spell damage", false);

    pullIfPossible($item`Staff of the Deepest Freeze`, -1);
    ensurePullEffect($effect`Pisces in the Skyces`, $item`tobiko marble soda`);
    ensurePullEffect($effect`Things Man Was Not Meant to Eat`,$item`fudge-shaped hole in space-time`);

    // pull wrench from deck for +100% spell dmg
    if (get("_deckCardsDrawn") === 5 && !have($item`Staff of the Deepest Freeze`)) {
        resources.deck("wrench");
    }

    spellOutfit();
    if (globalOptions.debug) {
        logprint(cliExecuteOutput("modtrace spell damage"));
    }
}

export function itemPrep() {
    if (is100Run) {
        useFamiliar(familiarFor100Run);
    }
    ensureMpSausage(500);

    if (myInebriety() < inebrietyLimit() - 1 && !have($effect`Sacré Mental`)) {
        //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis
        putCloset($item`Swizzler`, itemAmount($item`Swizzler`));
        ensureOde(1);
        drink(1, $item`Sacramento wine`);
        resources.consumedBooze.set(
            $item`Sacramento wine`,
            (resources.consumedBooze.get($item`Sacramento wine`) ?? 0) + 1
        );
        takeCloset($item`Swizzler`, closetAmount($item`Swizzler`));
    }

    if (availableAmount($item`li'l ninja costume`) === 0 && !get("_gingerbreadMobHitUsed")) {
        if (!is100Run) {
            useFamiliar($familiar`none`);
        }
        if (have($effect`Feeling Lost`)) throw "You have teleportitis, this will go badly for you";
        //if (get("_reflexHammerUsed") >= 3) throw "Out of reflex hammers!";
        //TODO: enable if i get vampyric cloake
        //equip($item`vampyric cloake`);
        //equip($slot`acc3`, $item`Lil' Doctor™ bag`);
        resources.mapMacro(
            $location`The Haiku Dungeon`,
            $monster`amateur ninja`,
            Macro.trySkill($skill`Become a Bat`)
                .trySkill($skill`Bowl Straight Up`)
                .skill($skill`Gingerbread Mob Hit`)
        );
    }

    if (get("_deckCardsDrawn") <= 10 && !have($effect`Fortune of the Wheel`)) {
        resources.deck("buff items");
    }

    if (!get("_clanFortuneBuffUsed")) {
        ensureEffect($effect`There's No N in Love`);
    }

    ensureEffect($effect`Fat Leon's Phat Loot Lyric`);
    ensureEffect($effect`Singer's Faithful Ocelot`);
    ensureEffect($effect`The Spirit of Taking`);
    tryEnsureEffect($effect`Heart of Lavender`);

    ensureEffect($effect`items.enh`);

    //candle correspondence
    if (have($item`Salsa Caliente™ candle`)) {
        ensureEffect($effect`El Aroma de Salsa`);
    }

    // Use bag of grain.
    ensureEffect($effect`Nearly All-Natural`);

    // if (haveEffect($effect`Synthesis: Collection`) === 0) {
    //     use(1, $item`peppermint sprout`);
    //     sweetSynthesis($item`peppermint sprout`, $item`peppermint twist`);
    // }

    if (globalOptions.workshed === "Asdon") AsdonMartin.drive($effect`Driving Observantly`, 1);

    if (myClass() === $class`Pastamancer`) {
        cliExecute("barrelprayer buff");
    }

    cliExecute("acquire 1 unbreakable umbrella; umbrella item");

    ensureEffect($effect`Steely-Eyed Squint`);

    // only get Feeling Lost if this is the last test of the run
    // TODO: figure out a final check here to make it not get the buff unless it will get the test to 1 turn
    if (get("csServicesPerformed").split(",").length === 10) ensureEffect($effect`Feeling Lost`);

    // maximize("item, 2 booze drop, -equip broken champagne bottle, -equip surprisingly capacious handbag",false );

    itemOutfit();
    if (globalOptions.debug) {
        logprint(cliExecuteOutput("modtrace item"));
        logprint(cliExecuteOutput("modtrace booze"));
    }
}
