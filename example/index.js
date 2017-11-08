import TestInlineVideo from '../src/index.js';

TestInlineVideo()
  .then(() => {
    console.log('support inline video');
  })
  .catch(() => {
    console.warn('unsupport inline video');
  })