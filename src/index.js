import VIDEO from './video'

const w = window
const raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame
var perf = w.performance || Date

let visibilityEvt
if (typeof document.hidden !== 'undefined') visibilityEvt = { name: 'visibilitychange', key: 'hidden' }
else if (typeof document.msHidden !== 'undefined') visibilityEvt = { name: 'msvisibilitychange', key: 'msHidden' }
else if (typeof document.webkitHidden !== 'undefined') visibilityEvt = { name: 'webkitvisibilitychange', key: 'webkitHidden' }

export default function testInlineVideo () {
  return new Promise((resolve, reject) => {
    let video, playing, nt, skip
    let fpsCounts = 0
    let fpsSum = 0
    let lt = 0
    const out = { badFps: false, error: new Error('No support for inline video') }

    video = document.createElement('video')
    document.body.appendChild(video)
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.style.cssText = 'z-index:10000;position:fixed;top:50%;left:50%;width:1px;height:1px;opacity:0.01;pointer-events:none;user-select:none'
    video.autoplay = true
    video.muted = true
    video.src = VIDEO
    video.play()

    video.onplay = () => {
      playing = true
    }

    video.oncanplay = () => {
      dispose()
      lt = perf.now()
      if (playing) {
        resolve(out)
      } else {
        if (raf) {
          if (visibilityEvt) document.addEventListener(visibilityEvt.name, visibilityChange, false)
          raf(count)
        } else {
          reject(out)
        }
      }
    }

    function count () {
      nt = perf.now()
      if (skip) {
        skip = false
        lt = nt
        raf(count)
        return
      }
      fpsSum += nt - lt
      lt = nt
      if (++fpsCounts < 12) {
        raf(count)
      } else {
        if (visibilityEvt) document.removeEventListener(visibilityEvt.name, visibilityChange, false)
        if (fpsCounts / fpsSum * 1000 < 45) out.badFps = true
        reject(out)
      }
    }

    // reset current fps counting
    function visibilityChange () {
      skip = true
    }

    function dispose () {
      document.body.removeChild(video)
      video.onplay = null
      video.oncanplay = null
      video.pause()
      video = null
    }
  })
}
