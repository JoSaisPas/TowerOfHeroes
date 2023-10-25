import {Arme} from "./arme";
import {Entity} from "./entity";

export class Hero extends Entity {
  private arme?: Arme;

  constructor(id?: string, attaque?: number, degat?: number, esquive?: number, pv?: number, name?: string, ref?: string, arme?: Arme, img?: string) {
    super(id, attaque, degat, esquive, pv, name, ref, img)
  }

  set setArme(arme: Arme) {
    this.arme = arme;
    this.setRef = arme.getId;
  }

  get getArme(): Arme | undefined {
    return this.arme;
  }

  get getAttaqueTotal(): number {
    return this.getAttaque + (this.getArme?.getAttaque ?? 0);
  }

  get getEsquiveTotal(): number {
    return this.getEsquive + (this.getArme?.getEsquive ?? 0);
  }

  get getDegatsTotal(): number {
    return this.getDegats + (this.getArme?.getDegats ?? 0);
  }

  get getPvTotal(): number {
    return this.getPv + (this.getArme?.getPv ?? 0);
  }

  override isValide(): boolean {
    return this.getStats() == 40;
  }


  override subStat(stat: string) {
    // @ts-ignore
    if (this[stat] > 1) {
      super.subStat(stat);
    }
  }
}
