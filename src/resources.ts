import {
    abort,
    cliExecute,
    create,
    eat,
    Effect,
    haveEffect,
    Item,
    itemAmount,
    itemType,
    Location,
    Monster,
    myFullness,
    myInebriety,
    print,
    retrieveItem,
    runChoice,
    runCombat,
    Skill,
    toItem,
    toSkill,
    toUrl,
    useSkill,
    visitUrl,
} from "kolmafia";
import { $effect, $item, $skill, get, have, Macro } from "libram";

export class ResourceTracker {
    deckCards: string[] = [];
    genieWishes: Effect[] = [];
    // Items represent clip art summons.
    tomeSummons: (Skill | Item)[] = [];
    pulls: Item[] = [];
    consumedFood = new Map<Item, number>();
    consumedBooze = new Map<Item, number>();
    saberForces: (Item | Effect)[] = [];
    lockets: Monster[] = [];
    maps: Monster[] = [];

    deck(card: string, attempt = false): void {
        if (get("_deckCardsSeen").toLowerCase().includes(card)) return;
        if (get("_deckCardsDrawn") <= 10) {
            cliExecute(`play ${card}`);
            this.deckCards.push(card);
        } else if (!attempt) {
            print(`WARNING: Tried to pull ${card} from deck, but we're out of draws.`, "orange");
        }
    }

    wish(effect: Effect, attempt = false): void {
        if (have(effect)) return;
        if (3 - get("_genieWishesUsed") + itemAmount($item`pocket wish`) > 0) {
            cliExecute(`genie effect ${effect}`);
            this.genieWishes.push(effect);
        } else if (!attempt) {
            print(`WARNING: Tried to wish for ${effect}, but we're out of wishes.`, "orange");
        }
    }

    clipArt(item: Item, attempt = false): void {
        if (get("tomeSummons") < 3) {
            retrieveItem(item);
            this.tomeSummons.push(item);
        } else if (!attempt) {
            print(`WARNING: Tried to summon clip art, but we're out of tome summons.`, "orange");
        }
    }

    tome(skillOrItem: Skill | Item, attempt = false): void {
        if (get("tomeSummons") < 3) {
            if (skillOrItem instanceof Skill) useSkill(skillOrItem);
            else create(skillOrItem);
            this.tomeSummons.push(skillOrItem);
        } else if (!attempt) {
            print(`WARNING: Tried to use tome summon ${skillOrItem}, but we're out.`, "orange");
        }
    }

    consumeTo(threshold: number, item: Item): void {
        const typ = itemType(item);
        if (typ === "booze") {
            const count = Math.floor((threshold - myInebriety()) / item.inebriety);
            if (count > 0) {
                useSkill(
                    Math.ceil((count * item.inebriety - haveEffect($effect`Ode to Booze`)) / 5),
                    $skill`The Ode to Booze`
                );
                cliExecute(`drink ${count} ${item}`);
                this.consumedBooze.set(item, (this.consumedBooze.get(item) ?? 0) + count);
            }
        } else if (typ === "food") {
            const count = Math.floor((threshold - myFullness()) / item.fullness);
            if (count > 0) {
                eat(count, item);
                this.consumedFood.set(item, (this.consumedFood.get(item) ?? 0) + count);
            }
        }
    }

    mapMacro(location: Location, monster: Monster, macro: Macro): void {
        if (!macro.toString().includes("Use the Force")) {
            //do not send as autoattack if we are using the saber since that messes up tracking
            macro.setAutoAttack();
        } else {
            macro.save();
        }
            useSkill($skill`Map the Monsters`);
        if (!get("mappingMonsters")) throw `I am not actually mapping anything. Weird!`;
        else {
            let i = 0;
            while (get("mappingMonsters")) {
                if (i > 0) abort(`something went wrong mapping`);
                visitUrl(toUrl(location));
                runChoice(1, `heyscriptswhatsupwinkwink=${monster.id}`);
                runCombat(macro.toString());
                i++;
            }
            this.maps.push(monster);
        }
    }

    summarize(): void {
        print("====== RESOURCE SUMMARY ======");
        print(`Deck: ${this.deckCards.join(", ")}`);
        print(`Wishes: ${this.genieWishes.map((effect) => effect.name).join(", ")}`);
        print(`Tomes: ${this.tomeSummons.map((skillOrItem) => skillOrItem.name).join(", ")}`);
        print(`Pulls: ${this.pulls.map((item) => item.name).join(", ")}`);
        print(`Sabers: ${this.saberForces.map((effectOrItem) => effectOrItem.name).join(", ")}`);
        print(`Locket Fights: ${this.lockets.map((monster) => monster.name).join(", ")}`);
        print(`Maps: ${this.maps.map((monster) => monster.name).join(", ")}`);
        if (this.consumedFood.size > 0) {
            print("FOOD");
            for (const [food, count] of this.consumedFood) {
                print(`${count} ${count > 1 ? food.plural : food.name}`);
            }
        }
        if (this.consumedBooze.size > 0) {
            print("BOOZE");
            for (const [booze, count] of this.consumedBooze) {
                print(`${count} ${count > 1 ? booze.plural : booze.name}`);
            }
        }
    }

    serialize(): string {
        return JSON.stringify({
            deckCards: this.deckCards,
            genieWishes: this.genieWishes.map((effect) => effect.name),
            tomeSummons: this.tomeSummons.map((itemOrSkill) => itemOrSkill.name),
            pulls: this.pulls.map((item) => item.name),
            consumedFood: [...this.consumedFood.entries()].map(([food, count]) => [
                food.name,
                count,
            ]),
            consumedBooze: [...this.consumedBooze.entries()].map(([booze, count]) => [
                booze.name,
                count,
            ]),
        });
    }

    static deserialize(data: string): ResourceTracker {
        const { deckCards, genieWishes, tomeSummons, pulls, consumedFood, consumedBooze } =
            JSON.parse(data);
        const result = new ResourceTracker();
        result.deckCards = deckCards ?? [];
        result.genieWishes = genieWishes ? genieWishes.map((name: string) => Effect.get(name)) : [];
        result.tomeSummons = tomeSummons
            ? tomeSummons.map((name: string) => {
                  const skill = toSkill(name);
                  const item = toItem(name);
                  return skill !== $skill`none` ? skill : item;
              })
            : [];
        result.pulls = pulls ? pulls.map((name: string) => Item.get(name)) : [];
        result.consumedFood = new Map(
            consumedFood
                ? consumedFood.map(([name, count]: [string, number]) => [Item.get(name), count])
                : []
        );
        result.consumedBooze = new Map(
            consumedBooze
                ? consumedBooze.map(([name, count]: [string, number]) => [Item.get(name), count])
                : []
        );
        return result;
    }
}
