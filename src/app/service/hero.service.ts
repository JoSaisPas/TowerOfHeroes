import { Injectable } from '@angular/core';
import {Hero} from '../data/hero';
import {Data} from '../data/data'
import {first, map, Observable, of} from 'rxjs';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private static url:string = 'Hero';

  constructor(private readonly afs: AngularFirestore) { }

  getHeroes(): Observable<Hero[]> {
    // Documentation AngularFire sur les collections
    // https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md
    let heroCollection = this.afs.collection<Data>(HeroService.url);
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    let heroes: Observable<Hero[]> =
      heroCollection.snapshotChanges().pipe(
        map(ele => ele.map(e =>{
            const data = e.payload.doc.data();
            const id = e.payload.doc.id;
            let hero_t = new Hero(id, data['attaque'], data['degats'], data['esquive'], data['point_de_vie'], data['name'], data['ref'], undefined,data['image'])
            return {...hero_t} as Hero
          }
        )) );
    return heroes;
  }


  saveHero(id: string, hero? : Hero){
    let test = this.afs.doc<Hero>('Hero/'+id);
    let heroCollection = this.afs.collection<Data>(HeroService.url);
    if(hero){
      heroCollection.doc(id).update({
        attaque: hero.getAttaque,
        degats: hero.getDegats,
        esquive: hero.getEsquive,
        name: hero.Name,
        point_de_vie: hero.getPv,
        ref:  hero.getRef ?? '',
        image: hero.getImage,
      }).then(r => undefined);
    }
  }


  getHero(id: String) : Observable<Hero | undefined> {
    let test = this.afs.doc<Hero>('Hero/'+id);
    let hero  = test.valueChanges().pipe(first());
    return hero;
  }


  createHero() : Hero{
    let id = this.afs.createId();

    // @ts-ignore
    let data : Data  ={attaque: 1, degats: 1, esquive: 1, id: id, name: "Hero", point_de_vie: 1, image: 'swordman'}
    let create = this.afs.collection<Data>(HeroService.url).doc(id).set(data);
    let hero : Hero = new Hero(id.toString(), 0,0,0,0,'', '', undefined, '');
    return hero;
  }

}
