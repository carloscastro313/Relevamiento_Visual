import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { CameraService } from '../service/camera.service';
import { DatabaseService } from '../service/database.service';
import { ToastService } from '../service/toast.service';
import { path } from '../service/variables';

@Component({
  selector: 'app-fotos-subidas',
  templateUrl: './fotos-subidas.page.html',
  styleUrls: ['./fotos-subidas.page.scss'],
})
export class FotosSubidasPage implements OnInit {

  temp: any = null;
  length: number = 0;



  constructor(
    private camera : CameraService,
    private db : DatabaseService,
    private store : AngularFireStorage,
    private route : Router,
    private toast : ToastService,
    ) { }

  ngOnInit() {
    this.db.getListD(path.CosasLindas).subscribe((data : any) => {
      const correo = localStorage.getItem('correo');
      const fotos : any = data.filter(a => a.correo == correo);
      fotos.forEach(a => {
        a.tipo = 'CosasLindas';
      });
      this.db.getListD(path.CosasFeas).subscribe((d : any) => {
        const fotos2 : any = d.filter((a : any) => a.correo == correo);
        fotos2.forEach(a => {
          a.tipo = 'CosasFeas';
        })
        fotos.push(...fotos2);
        console.log(fotos);
        this.temp = fotos.sort((a : any,b : any)=> {
          if(a.published > b.published){
            return -1;
          }else if(b.published > a.published){
            return 1;
          }

          return 0;
        });


      })
    })
  }

  votar(correo: string, id: number){
    this.route.navigate(['../votar/'+correo+'/'+id]);
  }

}
