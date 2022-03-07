import { equippedItem, print, wait } from "kolmafia";
import { $class, $item, $slot, ascend, Lifestyle, Paths, prepareAscension } from "libram";

// if (equippedItem($slot`bootskin`) !== $item`frontwinder skin`) {
//   throw "Your cowboy boots have the wrong skin";
// }

// if (equippedItem($slot`bootspur`) !== $item`thicksilver spurs`) {
//   throw "Your cowboy boots have the wrong spurs";
// }

print("you're about to ascend! wait, is that good?", "green");

wait(15);

prepareAscension(
  {
    //workshed: $item`Little Geneticist DNA-Splicing Lab`,
    //garden: $item`Peppermint Pip Packet`,
    eudora: `Our Daily Candles™ order form`,
    chateau: {
      desk: `Swiss piggy bank`,
      nightstand: `foreign language tapes`,
      ceiling: `ceiling fan`,
    },
    throwOnFail: false,
  }
);

ascend(
  Paths.CommunityService,
  $class`Sauceror`,
  Lifestyle.hardcore,
  "blender",
  $item`astral six-pack`,
  $item`astral statuette`
);
