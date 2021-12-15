import { availableAmount, mpCost, myMaxmp, myMp, useSkill } from "kolmafia";
import { $item, $skill, get } from "libram";

function nextLibramCost() {
  return mpCost($skill`Summon BRICKOs`);
}

export function castBestLibram() {
  if (get("_brickoEyeSummons") < 3) {
    useSkill($skill`Summon BRICKOs`);
  } else if (
    availableAmount($item`green candy heart`) < 1 &&
    !get("csServicesPerformed").includes("Breed More Collies")
  ) {
    // need an alternative to testDone(), since that hits council.php
    useSkill($skill`Summon Candy Heart`);
  } else if (
    availableAmount($item`lavender candy heart`) < 1 &&
    !get("csServicesPerformed").includes("Make Margaritas")
  ) {
    useSkill($skill`Summon Candy Heart`);
  } else if (
    availableAmount($item`love song of icy revenge`) < 3 &&
    !get("csServicesPerformed").includes("Breed More Collies")
  ) {
    useSkill($skill`Summon Love Song`);
  } else {
    useSkill($skill`Summon Party Favor`);
  }
}

export function libramBurn() {
  while (myMp() / myMaxmp() > 0.2 && nextLibramCost() <= myMp()) {
    castBestLibram();
  }
}
