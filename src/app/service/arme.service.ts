import { Injectable } from '@angular/core';
import {Arme} from '../data/arme';
import {Data} from '../data/data';
import {first, map, Observable, of} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Hero} from "../data/hero";
//import {Hero, HeroTest} from "../data/hero";
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class ArmeService {
  private static url:string = 'Arme';

  constructor(private readonly afs: AngularFirestore) { }

  getArmes(): Observable<Arme[]> {
    // Documentation AngularFire sur les collections
    // https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md
    let armeCollection = this.afs.collection<Data>(ArmeService.url);
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    let armes: Observable<Arme[]> = armeCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        let arme = new Arme(id, data['attaque'], data['degats'], data['esquive'], data['point_de_vie'], data['name'], data['ref'], data['image'])
        return { ...arme } as Arme;
      })),
    );
    return armes;
  }


  saveArme(id: string, arme? : Arme){
    let arme_data = this.afs.doc<Arme>('Arme/'+id);

    let armesCollection = this.afs.collection<Data>(ArmeService.url);
    if(arme){
      armesCollection.doc(id).update({
        attaque: arme.getAttaque,
        degats: arme.getDegats,
        esquive: arme.getEsquive,
        name: arme.Name,
        point_de_vie: arme.getPv,
        id_hero:  arme.getRef ?? '',
        image : arme.getImage
      }).then(r => undefined);
    }
  }


  getArme(id: String) : Observable<Arme | undefined> {
    let item = this.afs.doc<Arme>('Arme/'+id);
    let arme  = item.valueChanges();
    return arme;
  }


  createArme() : Arme{
    let id = this.afs.createId();
    // @ts-ignore
    const data: Data = { name : 'Pioche', attaque : 0, esquive : 0, degats : 0, point_de_vie :0, image: 'sword'};
    //Important, sert à identifier qu'elle collection on vise
    let create = this.afs.collection<Data>(ArmeService.url).doc(id).set(data);
    let arme : Arme = new Arme(id.toString(), 0,0,0,0,'', '');
    return arme;
  }
}
