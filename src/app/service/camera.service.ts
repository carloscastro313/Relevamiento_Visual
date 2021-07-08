import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { resolve } from 'node:path';
import { rejects } from 'node:assert';
import { File } from '@ionic-native/file/ngx';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root'
})
export class CameraService {

  options: CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    targetHeight: 340,
    targetWidth: 420
  };

  constructor(
    private camera: Camera,
    private file: File,
    private toast: ToastService
    ) {

  }

  async takePicture(){

    return this.camera.getPicture(this.options);

  }

  fileToBase64(fileUri: string){
    const fileNameIndex: number = fileUri.lastIndexOf('/') + 1;

    // file:///storage/emulated/0/Android/data/com.myDomain.myApp/cache/
    const cacheDirectoryFromFileUri = fileUri.substring(0, fileNameIndex );

    //  FB_IMG_1532921240445.jpg?1532982282636
    const fileName = fileUri.substring(fileNameIndex);

    return this.file.readAsDataURL(cacheDirectoryFromFileUri,fileName)
  }

}
