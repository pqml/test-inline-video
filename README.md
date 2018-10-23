<h1 align="center">test-inline-video</h1>
<h3 align="center">Test if inline video mode is available</h3>
<br><br><br>

## Example
Example on [pqml.github.io/test-inline-video/](https://pqml.github.io/test-inline-video/)

<br><br>

## Features & Requirements
- Small module: < 800b gziped
- :warning: **Test-inline-video use Promises.** Use a [polyfill](https://www.npmjs.com/package/promise-polyfill) if you have to support IE / old browser versions
- The lib returns a `dataSave` property to check if browser Data Saving is enabled.
  - This is useful for Android: [Chrome Data Saver](https://support.google.com/chrome/answer/2392284?co=GENIE.Platform%3DAndroid&hl=en) turn off autoplay.
- You can also use this library to test low battery mode on iOS: inline videos don't play when it's enabled
  - The lib can measure framerate with the `measureFps` option to see if there is also FPS throttling: on iOS this is also a sign of low battery mode enabled
  - The framereate measure makes the test a bit longer - do not use this option if you don't need it

<br><br>

## Module Installation & Usage

##### Installation from npm
```sh
# using npm
$ npm install --save test-inline-video

# or using yarn
$ yarn add test-inline-video
```

##### Usage with npm and a module bundler
```js
import testInlineVideo from 'test-inline-video' // ES6 module import
const testInlineVideo = require('test-inline-video') // CommonJS module import

// Also test for framerate throttling
testInlineVideo({ testFramerate: true })
  .then(function (result) {
    // resut.autoplay return true of false if videos can autoplay
    if (result.autoplay) {
      log('Inline video mode is available!');
    } else {
      // Default error message : 'No support for inline video'
      log(result.error.message);
      // Test for FPS throttling on iOS
      if (result.badFps && result.iOS) log('You are probably in low-battery mode');
      // Test for Data Saver
      if (result.saveData) log('Please, disable your browser Data Saver');
    }
  })
```

##### Installation & usage from a browser

```html
<script src="//unpkg.com/test-inline-video"></script>
<script>
  // Don't forget the Promise polyfill if you need one
  windowtestInlineVideo()
    .then(function (result) {
      // resut.autoplay return true of false if videos can autoplay
      if (result.autoplay) {
        log('Inline video mode is available!');
      } else {
        log('No autoplay support');
      }
    })
</script>
```

<br><br>

## Development commands

- `npm install` - Install all npm dependencies
- `npm run start` - Start the dev server with livereload on the example folder
- `npm run build` - Bundle your library in CJS / UMD / ESM
- `npm run deploy` - Deploy your example folder on a gh-page branch
- `npm run test` - Lint your js inside the src folder

<br><br>

## License
MIT.
