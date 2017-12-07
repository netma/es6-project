import { PicturesProvider } from '../../providers/pictures/pictures-provider';

export class BackgroundComponent {
  constructor() {
    this.picture = new PicturesProvider();
    this.content = document.querySelector('section');
    this.loadPicture();
  }

  loadPicture() {
    if (!this.content) {
      return;
    }
    this.picture
      .getRandomPicture()
      .then(res=>{
        this.content.style.background = `url(${res.urls.regular}) center center no-repeat`;
        this.content.style.backgroundSize = `cover`;

        return res;
      })
      .then(res=>{
        this.content.querySelector('header').insertAdjacentHTML('afterbegin', `
          <button id="download-background">download</button>
        `);
        document.getElementById('download-background').addEventListener('click', _=>{
          window.open(res.links.download, true);
        });
        this.content.querySelector('footer').insertAdjacentHTML('beforeend', `
          <p>Photo by <a href="${res.user.links.html}" target="_blank">${res.user.name}</a></p>
        `);

        return res;
      })
      .then(res=> {
        let img = new Image();
        img.src = res.urls.regular;
        img.addEventListener('load', _=> {
          document.body.style.opacity = 1;
        })
      })
      .catch(err=>{
        alert(err.toString())
      })
  }
}
