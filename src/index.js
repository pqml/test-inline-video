const w = window
const raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame
const perf = w.performance || Date
const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
const saveData = !!navigator.connection && navigator.connection.saveData

let visibilityEvt
if (typeof document.hidden !== 'undefined') visibilityEvt = { name: 'visibilitychange', key: 'hidden' }
else if (typeof document.msHidden !== 'undefined') visibilityEvt = { name: 'msvisibilitychange', key: 'msHidden' }
else if (typeof document.webkitHidden !== 'undefined') visibilityEvt = { name: 'webkitvisibilitychange', key: 'webkitHidden' }

function median (values = []) {
  var numbers = values.slice(0).sort((a, b) => a - b)
  var middle = Math.floor(numbers.length / 2)
  var isEven = numbers.length % 2 === 0
  return isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle]
}

export default function testInlineVideo (opts = {}) {
  return new Promise((resolve, reject) => {
    let video, playing, nt, skip
    let fpsCounts = 0
    let fpsValues = []
    let lt = 0
    const out = { autoplay: true, saveData: saveData, iOS: iOS, badFps: false, error: null }

    video = document.createElement('video')
    document.body.appendChild(video)
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('width', '1px')
    video.setAttribute('height', '1px')
    video.muted = true
    video.playsinline = true
    video.webkitPlaysinline = true
    video.style.cssText = 'z-index:10000;position:fixed;top:50%;left:50%;width:1px;height:1px;opacity:0.01;pointer-events:none;user-select:none'

    new Promise(resolve => resolve(video.play())).catch(() => {})
    if (video.paused) {
      out.autoplay = false
      out.error = new Error('No support for inline video')
    }

    lt = perf.now()
    opts.testFramerate ? raf(count) : resolve(out)

    function count () {
      nt = perf.now()
      if (skip) {
        skip = false
        lt = nt
        raf(count)
        return
      }
      fpsValues.push(nt - lt)
      lt = nt
      if (++fpsCounts < 12) {
        raf(count)
      } else {
        if (visibilityEvt) document.removeEventListener(visibilityEvt.name, visibilityChange, false)
        if (1000 / median(fpsValues) < 45) out.badFps = true
        resolve(out)
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
