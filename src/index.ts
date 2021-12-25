import { abort, myPathId, setAutoAttack } from "kolmafia";
import { testDoneNew } from "./hccs";
import { getReady } from "./runstart";
import { coilwire } from "./tests";

// set autoattack(0) at the start for reentrant purposes
if (myPathId() !== 25) abort();
setAutoAttack(0);

if (!testDoneNew("coil")) {
  getReady();
  coilwire();
}
