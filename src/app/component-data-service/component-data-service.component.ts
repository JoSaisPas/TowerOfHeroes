import {Component} from '@angular/core';
import {HeroService} from "../service/hero.service";
import {ArmeService} from "../service/arme.service";
import {ActivatedRoute} from "@angular/router";
import {Hero} from "../data/hero";
import {Arme} from "../data/arme";

@Component({
  selector: 'app-component-data-service',
  templateUrl: './component-data-service.component.html',
  styleUrls: ['./component-data-service.component.css']
})
export class ComponentDataServiceComponent {
  constructor(protected heroService: HeroService,
              protected armeService: ArmeService,
              protected route: ActivatedRoute,
  ) {
  }

  async getHeroes(): Promise<Array<Hero>> {
    let datas;
    return new Promise((resolve, reject) => {
      this.heroService.getHeroes()
        .subscribe(heroes => {
            datas = heroes;
            resolve(datas);
          }
        );
    })
  }

  async getHero(id: string): Promise<Hero | undefined> {
    let data;
    return new Promise((resolve, reject) => {
      this.heroService.getHero(id)
        .subscribe(
          hero => {
            data = hero;
            resolve(data);
          }
        );
    });
  }

  async getArmes(): Promise<Array<Arme>> {
    let datas;
    return new Promise((resolve, reject) => {
      this.armeService.getArmes()
        .subscribe(armes => {
            datas = armes;
            resolve(datas);
          }
        );
    });
  }

  async getArme(id: string): Promise<Arme | undefined> {
    let data;
    return new Promise((resolve, reject) => {
      this.armeService.getArme(id)
        .subscribe(
          _arme => {
            data = _arme;
            resolve(data);
          }
        );
    });
  }

}
