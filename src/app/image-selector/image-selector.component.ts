import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Entity} from "../data/entity";

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {

  @Input() entity? : Entity;
  @Output() stateChange = new EventEmitter<string>();
  @Input() value : number = 0;

  map : Map<string, boolean> = new Map();
  initMap(){

    if(this.value == 0){
      this.map.set('sword' , false);
      this.map.set('axe' , false);
      this.map.set('staff' , false);
      this.map.set('bow' , false);
    }else if(this.value == 1){
      this.map.set('swordman' , false);
      this.map.set('warrior' , false);
      this.map.set('mage' , false);
      this.map.set('archer' , false);
    }
  }

  initImage(){
    /**
     * si map contient entity.image : map[image]= true*/
    if(this.entity){
      this.map.set(this.entity.getImage , true);
    }else{
      this.map.set(this.map.entries().next().value, true );
    }
  }

  ngOnInit(): void {
    this.initMap();
    this.initImage();
  }

  select(key : string){

    this.map.forEach((v , k) =>{
      this.map.set(k, false);
    })

    this.map.set(key, true );
    this.linkImage(key);
  }

  linkImage(path:string){
    this.stateChange.emit(path);
  }
}
