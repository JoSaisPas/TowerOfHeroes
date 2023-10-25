import {Component, OnInit} from '@angular/core';
import { HeroService } from '../service/hero.service';
import {Hero} from '../data/hero';
import { MessageService } from '../service/message.service';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {Arme} from "../data/arme";
import {ArmeService} from "../service/arme.service";
import {ComponentDataServiceComponent} from "../component-data-service/component-data-service.component";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent extends ComponentDataServiceComponent implements OnInit{
  constructor(private  armeService2: ArmeService,
              private  heroService2: HeroService,
              protected messageService: MessageService,
              protected  route2: ActivatedRoute,
              protected location: Location) {
    super(heroService2,armeService2,route2);
  }

  heroes: Hero[] = [];
  sortedName : boolean = false;
  sortedValue : boolean = false;
  hero?: Hero;
  obs? : Subscription;
  arme?:Arme;

  async ngOnInit(){
    ///Get heroes
    let tempo = await this.getHeroes();
    this.heroes = tempo.map( (e) =>
      Object.assign(new Hero(e.getId, e.getAttaque, e.getDegats, e.getEsquive, e.getPv,
        e.Name, e.getRef), e)
    );

    ///assign a weapon to an hero if getRef is defined
    for (const hero1 of this.heroes) {
      if(hero1.getRef){
        let arme_tempo = await this.getArme(hero1.getRef);
        this.arme = Object.assign(new Arme(hero1.getRef, arme_tempo?.getAttaque, arme_tempo?.getDegats, arme_tempo?.getEsquive, arme_tempo?.getPv, arme_tempo?.Name, arme_tempo?.getRef), arme_tempo);
          hero1.setArme = this.arme!;
      }
    }
  }

  sortString(a:Hero, b:Hero){
    {
      const nameA = a.Name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.Name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    }
  }

  sortNumber(a:Hero, b:Hero, namePara:String){
    // @ts-ignore
    return a[namePara] - b[namePara];
  }

  getHeroesSortOnNameASC():void{
    this.heroes.sort((a, b) => this.sortString(a,b));
  }
  getHeroesSortOnNameDESC():void{
    this.heroes.sort((a, b) => this.sortString(b,a));
  }

  sortName(){
    this.sortedName = !this.sortedName;
    if(this.sortedName){
      this.getHeroesSortOnNameASC();
    }else{
      this.getHeroesSortOnNameDESC();
    }
  }

  sortAtt(name:String){
    this.sortedValue = !this.sortedValue;
    this.sortedValue
      ? this.heroes.sort((a,b) => this.sortNumber(b,a,name))
      : this.heroes.sort((a,b) => this.sortNumber(a,b,name));
  }

}
