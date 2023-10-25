import {Hero} from "./hero";
import {Entity} from "./entity";

export class Arme extends Entity {
  private hero?: Hero;

  constructor(id?: string, attaque?: number, degat?: number,
              esquive?: number, pv?: number, name?: string, ref?: string, img?: string) {
    super(id, attaque, degat, esquive, pv, name, ref, img)
  }

  set SetHero(hero: Hero) {
    this.hero = hero;
  }

  get getHero(): Hero | undefined {
    return this.hero;
  }

  override getStats(): number {
    return super.getStats();
  }

  override addStat(stat: string) {
    // @ts-ignore
    if (this[stat] < 5) {
      super.addStat(stat);
    }
  }

  override subStat(stat: string) {
    // @ts-ignore
    if (this[stat] > -5) {
      super.subStat(stat);
    }
  }

  getMaxPoint(): number {
    return Math.abs(this.getAttaque) + Math.abs(this.getDegats) + Math.abs(this.getEsquive) + Math.abs(this.getPv);
  }

  override isValide(): boolean {
    return this.getStats() == 0;
  }
}




