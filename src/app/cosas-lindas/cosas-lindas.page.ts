import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { CameraService } from '../service/camera.service';
import { DatabaseService } from '../service/database.service';
import { path } from '../service/variables';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  temp: any = null;
  length: number = 0;
  isLoading: boolean = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll : IonInfiniteScroll;

  constructor(
    private camera : CameraService,
    private db : DatabaseService,
    private store : AngularFireStorage,
    private route : Router,
    private toast : ToastService,
    ) { }

  ngOnInit() {
    this.db.getListD(path.CosasLindas).subscribe((data : []) => {
      this.temp = data.sort((a : any,b : any)=> {
        if(a.published > b.published){
          return -1;
        }else if(b.published > a.published){
          return 1;
        }

        return 0;
      });

    })
  }

  async takePicture(){
    const imageData = await this.camera.takePicture();
    let id : any= await this.db.getObject(path.id_cosasLindas);
    let correo = localStorage.getItem('correo');
    this.isLoading = true;
    id += 1;
    try {
      const r = await this.store.ref(path.CosasLindas+correo+'_'+id).putString(imageData,'base64', {contentType: 'image/png'});
      const url = await r.ref.getDownloadURL();
      await this.db.createElement(path.CosasLindas+correo.replace('.','_')+'_'+id,{
        id,
        url,
        correo,
        published: Date.now(),
        votedBy: []
      });

      this.toast.presentToast('Se a subido la imagen');
      await this.db.updateChild(path.id_cosasLindas,id++);
    } catch (error) {
      this.toast.presentToast('Error al subir la imagen');
    }finally{
      this.isLoading = false;
    }
  }

  votar(correo: string, id: number){
    this.route.navigate(['../votar/'+correo+'/'+id]);
  }
}
