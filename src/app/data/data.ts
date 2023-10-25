export class Data {
  constructor(id?: string, attaque?: number, degat?: number,
              esquive?: number, pv?: number, name?: string, ref?: string, img?: string) {
    this.id = id ?? '';
    this.attaque = attaque ?? 0;
    this.degats = degat ?? 0;
    this.esquive = esquive ?? 0;
    this.point_de_vie = pv ?? 0;
    this.name = name ?? '';
    this.ref = ref ?? '';
    this.image = img ?? '';
  }

  protected id: string = ''
  protected name: string = '';
  protected attaque: number = 0;
  protected esquive: number = 0;
  protected degats: number = 0;
  protected point_de_vie: number = 0;
  protected ref: string = '';
  protected image: string = '';

}
