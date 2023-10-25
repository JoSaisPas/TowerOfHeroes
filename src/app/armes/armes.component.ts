import {Component} from '@angular/core';
import {MessageService} from "../service/message.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ArmeService} from "../service/arme.service";
import {Arme} from "../data/arme";
import {Hero} from "../data/hero";
import {Observable, Subscription} from "rxjs";
import {ComponentDataServiceComponent} from "../component-data-service/component-data-service.component";
import {HeroService} from "../service/hero.service";


@Component({
  selector: 'app-armes',
  templateUrl: './armes.component.html',
  styleUrls: ['./armes.component.css']
})
export class ArmesComponent extends ComponentDataServiceComponent {

  constructor(private armeService2: ArmeService,
              private heroService2: HeroService,
              protected messageService: MessageService,
              protected route2: ActivatedRoute,
              protected location: Location) {
    super(heroService2, armeService2, route2);
  }

  armes: Arme[] = [];
  sortedName: boolean = false;
  sortedValue: boolean = false;


  sortString(a: Arme, b: Arme) {
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


  sortNumber(a: Arme, b: Arme, namePara: String) {
    // @ts-ignore
    return a[namePara] - b[namePara];
  }

  getArmesSortOnNameASC(): void {
    this.armes.sort((a, b) => this.sortString(a, b));
  }

  getArmesSortOnNameDESC(): void {
    this.armes.sort((a, b) => this.sortString(b, a));
  }

  sortName() {
    this.sortedName = !this.sortedName;
    if (this.sortedName) {
      this.getArmesSortOnNameASC();
    } else {
      this.getArmesSortOnNameDESC();
    }
  }

  sortAtt(name: String) {
    this.sortedValue = !this.sortedValue;
    this.sortedValue
      ? this.armes.sort((a, b) => this.sortNumber(b, a, name))
      : this.armes.sort((a, b) => this.sortNumber(a, b, name));
  }


  async ngOnInit() {
    //Async
    let tempo = await this.getArmes();
    //Once resolve, cast data into wanted object
    this.armes = tempo.map(e =>
      Object.assign(new Arme(e.getId, e.getAttaque, e.getDegats, e.getEsquive, e.getPv,
        e.Name, e.getRef, e.getImage), e)
    );
  }

}
