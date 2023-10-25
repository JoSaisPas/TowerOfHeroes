import {Hero} from '../data/hero';
import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';


import {HeroService} from '../service/hero.service';
import {Subscription} from "rxjs";
import {ArmeService} from "../service/arme.service";
import {Arme} from "../data/arme";
import {ComponentDataServiceComponent} from "../component-data-service/component-data-service.component";
import {MessageService} from "../service/message.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent extends ComponentDataServiceComponent {
  constructor(private armeService2: ArmeService,
              private heroService2: HeroService,
              protected messageService: MessageService,
              protected route2: ActivatedRoute,
              protected location: Location,
              private router: Router) {
    super(heroService2, armeService2, route2);
  }

  @Input() hero?: Hero;

  arme?: Arme;
  obs?: Subscription;

  ngOnInit() {
    this.init();

  }

  async init() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id == 'null') {
      this.hero = this.heroService.createHero();
      this.router.navigate(['detail/' + this.hero.getId])
    } else {
      let tempo = await this.getHero(id);
      this.hero = Object.assign(new Hero(id, tempo?.getAttaque, tempo?.getDegats, tempo?.getEsquive, tempo?.getPv, tempo?.Name), tempo);

    }

  }

  goBack(): void {
    this.location.back();
  }

  addStat(state: string) {
    if(this.hero?.getStats()! < 40){
      this.hero?.addStat(state)
      this.update();
    }

  }

  subbStat(indexH: string, state: string) {
    this.hero?.subStat(state)
    this.update();
  }

  update() {
    if (this.hero!.Name != '') {
      const id = String(this.route.snapshot.paramMap.get('id'));
      this.heroService.saveHero(id, this.hero);
    }

  }

  updateHeroWithArme(hero: Hero) {
    if (!this.hero?.getRef || this.hero?.getRef != hero.getRef) {
      const id = String(this.route.snapshot.paramMap.get('id'));
      this.heroService.saveHero(id, hero);
    }
    this.hero!.setArme = hero.getArme!;
    this.arme = this.hero?.getArme;
  }


  getNumberStat(): number | undefined {
    if (this.hero) {
      return this.hero?.getAttaque + this.hero?.getEsquive + this.hero?.getDegats + this.hero?.getPv;
    }
    return 0;
  }

  resetPoints() {
    this.hero!.setAttaque = 0;
    this.hero!.setEsquive = 0;
    this.hero!.setDegats = 0;
    this.hero!.setPv = 0;
    this.update();
  }

  updateImage(path: string) {
    this.hero!.setImage = path;
    this.update();
  }
}
