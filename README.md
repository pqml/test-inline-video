<h1 align="center">test-inline-video</h1>
<h3 align="center">Test if inline video mode is available</h3>
<br><br><br>

## Example
Example on [pqml.github.io/test-inline-video/](https://pqml.github.io/test-inline-video/)

<br><br>

## Features & Requirements
- Try to autoplay a tiny base64 video to test inline video availability
- Small module: 1kb gziped (video included)
- Promise-based test: the promise will be resolved if the video **can play** inline
- You can use this library to test low battery mode on iOS: inline videos don't play when it's enabled
  - The lib measure framerate to see if there is fps throttling : this is often a sign of low battery mode enabled
- :warning: Test-inline-video use Promises. Use a polyfill if you have to support IE / old browser versions


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

testInlineVideo()
  .then(() => console.log('Supports inline video'))
  // if the video is not played 3sec after the call, we reject the test
  .catch(result => {
    console.warn('inline video not supported')

    // result.badFps will be set to true if there is fps throttling during the check
    // You can use it to diplay a "low battery mode" specific message
    if (result.badFps) console.warn('Probably on low-battery mode')
  });
```

##### Installation & usage from a browser

```html
<script src="//unpkg.com/test-inline-video"></script>
<script>
  windowtestInlineVideo()
    .then(() => console.log('Supports inline video'))
    .catch(result => {
      console.warn('inline video not supported')
      if (result.badFps) console.warn('Probably on low-battery mode')
    });
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
