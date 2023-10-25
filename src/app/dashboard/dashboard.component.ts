import {Component} from '@angular/core';
import {Hero} from '../data/hero';
import {HeroService} from '../service/hero.service';
import {ComponentDataServiceComponent} from "../component-data-service/component-data-service.component";
import {ArmeService} from "../service/arme.service";
import {MessageService} from "../service/message.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends ComponentDataServiceComponent {
  constructor(private armeService2: ArmeService,
              private heroService2: HeroService,
              protected messageService: MessageService,
              protected route2: ActivatedRoute,
              protected location: Location) {
    super(heroService2, armeService2, route2);
  }

  heroes: Hero[] = [];

  async ngOnInit() {
    let tempo = await this.getHeroes().then();
    this.heroes = tempo.map((e) =>
      Object.assign(new Hero(e.getId, e.getAttaque, e.getDegats, e.getEsquive, e.getPv,
        e.Name, e.getRef), e)
    )
    this.heroes = this.heroes.slice(0,5);
  }

}
