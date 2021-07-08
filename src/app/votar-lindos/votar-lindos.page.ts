import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { path } from '../service/variables';

@Component({
  selector: 'app-votar-lindos',
  templateUrl: './votar-lindos.page.html',
  styleUrls: ['./votar-lindos.page.scss'],
})
export class VotarLindosPage implements OnInit {

  fotoElegida: any = null;
  pathFoto : string;
  constructor(
    private db : DatabaseService,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.params.subscribe(async a => {
      const correo : string = a.correo;
      const id = a.id
      this.pathFoto = path.CosasLindas+correo.replace('.','_')+'_'+id;
      this.fotoElegida= await this.db.getObject(this.pathFoto);
    });
  }

  like(value: boolean){
    const correo : string = localStorage.getItem('correo');
    if(!this.fotoElegida.like){
      this.fotoElegida.like = [];
    }
    if(value){
      this.fotoElegida.like.push(correo);
    }else{
      let aux = this.fotoElegida.like.indexOf(correo);
      this.fotoElegida.like.splice(aux,1);
    }
    this.db.updateList(this.pathFoto,{
      like : this.fotoElegida.like
    })
  }

}
