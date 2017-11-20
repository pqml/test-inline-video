<h1 align="center">test-inline-video</h1>
<h3 align="center">Test if inline video mode is available</h3>

<br><br>


## Installation
```sh
npm install -S test-inline-video
```
<br>

## Example
```js
import testInlineVideo from 'test-inline-video';

testInlineVideo({ timeout: 3000 }) // default: 2sec
  .then(() => {
    console.log('support inline video');
  })
  // if the video is not played 3sec after the call, we reject the test
  .catch(() => {
    console.warn('unsupport inline video');
  });
```
<br>

## License
MIT.
