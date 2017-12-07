import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: '4050fb33f473268ed19b15297cf1fcbae1ecae9e7cc90e8a4f787e27726d63ae',
  secret: '5cf781e0074ae7bbe5e713f97cde2ccf3d257a9bf489e41cabd50d1e5fab7975',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob'
});

export function getRandomBackground() {

  unsplash.photos.getRandomPhoto()
    .then(toJson)
    .then(json => {
      console.log(json);
  });

}
