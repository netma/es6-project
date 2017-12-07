import { CONFIG } from './config';

export class PicturesProvider {
  constructor() {
    this.params = CONFIG;
  }

  getRandomPicture() {
    return new Promise((resolve, reject)=>{
      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.params.queryRandomPictureUrl + this.params.applicationId);
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(Error(xhr.statusText));
        }
      };
      xhr.onerror = () => reject(Error(xhr.statusText));
      xhr.send();
    });
  }
}
