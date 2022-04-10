import { equippedItem, print, wait } from "kolmafia";
import { $class, $item, $slot, ascend, Lifestyle, Paths, prepareAscension } from "libram";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function main(args = ""): void {
    const myworkshed = args.split(" ").includes("dna")
        ? `Little Geneticist DNA-Splicing Lab`
        : args.split(" ").includes("dna") ? `Asdon Martin keyfob`
        : `cold medicine cabinet`;

    let myClass = $class`Pastamancer`;

    if (args.split(" ").includes("sauceror")) {
        myClass = $class`Sauceror`;
    }

    if (equippedItem($slot`bootskin`) !== $item`frontwinder skin`) {
        throw "Your cowboy boots have the wrong skin";
    }

    if (equippedItem($slot`bootspur`) !== $item`nicksilver spurs`) {
        throw "Your cowboy boots have the wrong spurs";
    }

    print(
        `You're about to ascend as a ${myClass} with a ${myworkshed}! you provided ${args} as options`,
        "green"
    );

    wait(15);

    prepareAscension({
        //workshed: myworkshed,
        //garden: "Peppermint Pip Packet",
        eudora: "Our Daily Candles™ order form",

        chateau: {
            desk: "Swiss piggy bank",
            nightstand: "foreign language tapes",
            ceiling: "ceiling fan",
        },
    });

    ascend(
        Paths.CommunityService,
        myClass,
        Lifestyle.softcore,
        "blender",  //+10% mys gain, +5 advs from booze //TODO: change to another sign if i don't need the candies or the mys gain
        $item`astral six-pack`,
        $item`astral statuette`
    );
}
