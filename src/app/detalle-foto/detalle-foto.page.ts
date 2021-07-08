import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-detalle-foto',
  templateUrl: './detalle-foto.page.html',
  styleUrls: ['./detalle-foto.page.scss'],
})
export class DetalleFotoPage implements OnInit {
  foto: any;
  pathFoto: string;

  constructor(
    private db: DatabaseService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    try {
      const correo = localStorage.getItem('correo');
      this.route.params.subscribe(async ({id,tipo}) => {

        this.pathFoto = `/${tipo}/${correo.replace('.','_')}_${id}`;
        this.foto= await this.db.getObject(this.pathFoto);
        this.foto.published = new Date(this.foto.published).toISOString().substring(0,10)
        console.log(this.foto);
      });
    } catch (error) {
      console.log(error);
    }

  }

}
