import {Data} from "./data";

export abstract class Entity extends Data {
  constructor(id?: string, attaque?: number, degat?: number,
              esquive?: number, pv?: number, name?: string, ref?: string, img?: string) {
    super(id, attaque, degat, esquive, pv, name, ref, img);
  }


  addStat(stat: string): void {
    // @ts-ignore
    this[stat]++;
  }

  subStat(stat: string): void {
    // @ts-ignore
    this[stat]--;
  }

  getStats(): number {
    return this.getAttaque + this.getDegats + this.getEsquive + this.getPv;
  }

  getStateFor(stat: string): number {
    // @ts-ignore
    return this[stat];
  }

  /** GET / SET **/
  get getId(): string {
    return this.id;
  }

  set setId(value: string) {
    this.id = value;
  }

  get getAttaque(): number {
    return this.attaque;
  }

  set setAttaque(value: number) {
    this.attaque = value;
  }

  get getEsquive(): number {
    return this.esquive;
  }

  set setEsquive(value: number) {
    this.esquive = value;
  }

  get getDegats(): number {
    return this.degats;
  }

  set setDegats(value: number) {
    this.degats = value;
  }

  get getPv(): number {
    return this.point_de_vie;
  }

  set setPv(value: number) {
    this.point_de_vie = value;
  }

  get getRef(): string {
    return this.ref;
  }

  set setRef(value: string) {
    this.ref = value;
  }

  get getImage(): string {
    return this.image;
  }

  set setImage(img: string) {
    this.image = img;
  }

  /**
   * Special get / set
   * do the trick for two way binding*/
  get Name(): string {
    return this.name;
  }

  set Name(value: string) {
    this.name = value;
  }

  protected abstract isValide(): boolean;
}

