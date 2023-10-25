import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges
} from '@angular/core';
import {ArmeService} from "../service/arme.service";
import {Arme} from "../data/arme";
import {Hero} from "../data/hero";
import {Observable} from "rxjs";
import {ComponentDataServiceComponent} from "../component-data-service/component-data-service.component";
import {HeroService} from "../service/hero.service";
import {MessageService} from "../service/message.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dropdown-card',
  templateUrl: './dropdown-card.component.html',
  styleUrls: ['./dropdown-card.component.css']
})
export class DropdownCardComponent extends ComponentDataServiceComponent{
  constructor(private  armeService2: ArmeService,
              private  heroService2: HeroService,
              protected messageService: MessageService,
              protected  route2: ActivatedRoute,
              protected location: Location) {
    super(heroService2,armeService2,route2);
  }
  @Output() stateChange = new EventEmitter<Hero>();
  @Input()  hero?: Hero;
  private ele? : HTMLElement;
  test : Observable<Hero> | undefined;

  armes: Arme[] = [];
  is_diplaying : boolean = false;

  async ngOnInit(){
    let tempo = await this.getArmes();
    this.armes = tempo.map(e =>
      Object.assign(new Arme(e.getId, e.getAttaque, e.getDegats, e.getEsquive, e.getPv,
        e.Name, e.getRef), e)
    );
    this.hero = Object.assign(new Hero(this.hero?.getId, this.hero?.getAttaque, this.hero?.getDegats, this.hero?.getEsquive, this.hero?.getPv, this.hero?.Name, this.hero?.getRef), this.hero)

    if(this.hero){
      if(this.hero.getRef){
        let arme: Arme;
        this.armes.forEach((a)=>{
          if(a.getId == this.hero?.getRef){
            arme = a;
          }
        });
        ///can can't be undefined
        this.linkArme(arme!);
      }
    }
  }





  display():void{

    this.ele = document.getElementById('dropdown') ?? undefined;
    if(this.ele){

      this.is_diplaying
        ? this.ele.classList.add('hidden')
        : this.ele.classList.remove('hidden');

      this.is_diplaying = !this.is_diplaying;
    }
  }

  linkArme(arme:Arme){
    if (this.hero instanceof Hero) {
      this.hero.setArme = arme;
    }

    if(this.ele){
      this.ele!.classList.add('hidden');
      this.is_diplaying = false;
    }

    this.stateChange.emit(this.hero);
  }

}

