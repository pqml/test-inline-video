import VIDEO from './video'
import { css, attr } from './dom'

let visibilityEvt
if (typeof document.hidden !== 'undefined') visibilityEvt = { name: 'visibilitychange', key: 'hidden' }
else if (typeof document.msHidden !== 'undefined') visibilityEvt = { name: 'msvisibilitychange', key: 'msHidden' }
else if (typeof document.webkitHidden !== 'undefined') visibilityEvt = { name: 'webkitvisibilitychange', key: 'webkitHidden' }

function createVideo () {
  let video = document.createElement('video')

  // set video as inline video
  attr(video, {
    'autoplay': '',
    'muted': '',
    'playsinline': '',
    'webkit-playsinline': ''
  })

  // stylize the video to make it almost invisible
  css(video, {
    zIndex: 10000, // Place the video to be visible to avoid iOS not playing it
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: 1 + 'px',
    height: 1 + 'px',
    opacity: 0.01, // can't be 0 or the video won't play on some devices
    pointerEvents: 'none'
  })

  return video
}

export default function testInlineVideo (opts) {
  return new Promise((resolve, reject) => {
    let timer, video
    opts = opts || {}
    opts.timeout = opts.timeout || 2000

    init()

    function init () {
      video = createVideo()
      video.onload = () => { video.play() }
      video.src = VIDEO
      video.addEventListener('timeupdate', onActive)
      document.body.appendChild(video)
      if (visibilityEvt) document.addEventListener(visibilityEvt.name, onVisibilityChange, false)
      timer = createTimer()
    }

    function createTimer () {
      return window.setTimeout(() => {
        dispose()
        reject(new Error('No support for inline video'))
      }, opts.timeout)
    }

    // stop the timer if the user hide the tab, to avoid false-negative results
    function onVisibilityChange () {
      window.clearTimeout(timer)
      if (!document[visibilityEvt.key]) {
        timer = createTimer()
      }
    }

    function onActive () {
      dispose()
      resolve()
    }

    function dispose () {
      if (visibilityEvt) document.removeEventListener(visibilityEvt.name, onVisibilityChange, false)
      window.clearTimeout(timer)
      timer = null
      video.removeEventListener('timeupdate', onActive)
      document.body.removeChild(video)
      video = null
    }
  })
}
