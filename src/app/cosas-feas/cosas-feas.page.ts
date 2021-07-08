import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraService } from '../service/camera.service';
import { DatabaseService } from '../service/database.service';
import {path} from '../service/variables';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastService } from '../service/toast.service';
import { AlertController } from '@ionic/angular';

declare var window: any;

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {

  temp: any;
  isLoading: boolean = false;
  constructor(
    private camera : CameraService,
    private db : DatabaseService,
    private domSanitizer: DomSanitizer,
    private webview: WebView,
    private store : AngularFireStorage,
    private toast : ToastService,
    private alert : AlertController
    ) { }

  ngOnInit() {
    this.db.getListD(path.CosasFeas).subscribe((data : any) => {
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
    let id : any= await this.db.getObject(path.id_cosasFeas);
    let correo = localStorage.getItem('correo');
    id += 1;
    this.isLoading = true;
    try {
      const r = await this.store.ref(path.CosasFeas+correo+'_'+id).putString(imageData,'base64', {contentType: 'image/png'});
      const url = await r.ref.getDownloadURL();
      await this.db.createElement(path.CosasFeas+correo.replace('.','_')+'_'+id,{
        id,
        url,
        correo,
        published: Date.now(),
        votedBy: []
      });
      console.log(id);
      this.toast.presentToast('Se a subido la imagen');
      await this.db.updateChild(path.id_cosasFeas,id);
    } catch (error) {
      this.toast.presentToast('Error al subir la imagen');
    }finally{
      this.isLoading = false;
    }

  }

  async presentAlert(msg) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
