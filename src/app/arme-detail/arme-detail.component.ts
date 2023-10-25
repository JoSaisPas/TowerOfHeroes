import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {ArmeService} from "../service/arme.service";
import {Arme} from "../data/arme";
import {ComponentDataServiceComponent} from "../component-data-service/component-data-service.component";
import {HeroService} from "../service/hero.service";
import {MessageService} from "../service/message.service";

@Component({
  selector: 'app-arme-detail',
  templateUrl: './arme-detail.component.html',
  styleUrls: ['./arme-detail.component.css']
})
export class ArmeDetailComponent extends ComponentDataServiceComponent {
  constructor(private armeService2: ArmeService,
              private heroService2: HeroService,
              protected messageService: MessageService,
              protected route2: ActivatedRoute,
              protected location: Location,
              private rooter: Router) {
    super(heroService2, armeService2, route2);
  }

  @Input() arme?: Arme;

  ngOnInit(): void {
    this.init();
  }

  async init() {
    const id = String(this.route2.snapshot.paramMap.get('id'));
    if (id == 'null') {
      this.arme = this.armeService2.createArme();
      this.rooter.navigate(['detailArme/' + this.arme?.getId])
    } else {
      let tempo = await this.getArme(id);
      this.arme = Object.assign(new Arme(id, tempo?.getAttaque, tempo?.getDegats, tempo?.getEsquive, tempo?.getPv, tempo?.Name, tempo?.getRef), tempo);

    }
  }


  goBack(): void {
    this.location.back();
  }

  addStat(indexH: string, state: string) {
    this.arme?.addStat(state)
    this.update();
  }

  subStat(indexH: string, state: string) {
    this.arme?.subStat(state)
    this.update();
  }


  update() {
    const id = String(this.route2.snapshot.paramMap.get('id'));
    this.armeService.saveArme(id, this.arme);
  }

  resetPoints() {
    this.arme!.setAttaque = 0;
    this.arme!.setEsquive = 0;
    this.arme!.setDegats = 0;
    this.arme!.setPv = 0;
    this.update();
  }

  updateImage(path: string) {
    this.arme!.setImage = path;
    this.update();
  }
}
