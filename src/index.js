export default function testInlineVideo (opts) {
  return new Promise((resolve, reject) => {
    opts = opts || {}
    opts.timeout = opts.timeout || 2000
    let inlineVideo = document.createElement('video')
    inlineVideo.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAFttZGF0AAAAMmWIhD///8PAnFAAFPf3333331111111111111111111111111111111111111111114AAAABUGaOeDKAAAABkGaVHgygAAAAAZBmnZ4MoAAAAMKbW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAB9AAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAjt0cmFrAAAAXHRraGQAAAAPAAAAAAAAAAAAAAABAAAAAAAAB9AAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAGQAAABkAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAfQAAAAAAABAAAAAAGzbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAAAgAAAARVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABXm1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAR5zdGJsAAAAlnN0c2QAAAAAAAAAAQAAAIZhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAGQAZABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAMGF2Y0MBQsAK/+EAGGdCwArZhz+efARAAAADAEAAAAMBA8SJmgEABWjJYPLIAAAAGHN0dHMAAAAAAAAAAQAAAAQAAAABAAAAFHN0c3MAAAAAAAAAAQAAAAEAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAQAAAABAAAAJHN0c3oAAAAAAAAAAAAAAAQAAAA2AAAACQAAAAoAAAAKAAAAFHN0Y28AAAAAAAAAAQAAADAAAABbdWR0YQAAAFNtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAACZpbHN0AAAAHql0b28AAAAWZGF0YQAAAAEAAAAAR29vZ2xl'
    inlineVideo.setAttribute('autoplay', '')
    inlineVideo.setAttribute('muted', '')
    inlineVideo.setAttribute('playsinline', '')
    inlineVideo.setAttribute('webkit-playsinline', '')
    inlineVideo.play()

    inlineVideo.style['position'] = 'fixed'
    inlineVideo.style['top'] = 0
    inlineVideo.style['bottom'] = 0
    inlineVideo.style['z-index'] = 9000
    inlineVideo.style['width'] = 1
    inlineVideo.style['height'] = 1
    inlineVideo.style['pointer-events'] = 'none'
    inlineVideo.style['opacity'] = 0

    const timer = window.setTimeout(() => {
      dispose()
      return reject(new Error('No support for inline video'))
    }, opts.timeout)

    document.body.appendChild(inlineVideo)
    inlineVideo.addEventListener('timeupdate', onActive)

    function onActive () {
      dispose()
      return resolve()
    }

    function dispose () {
      window.clearTimeout(timer)
      inlineVideo.removeEventListener('timeupdate', onActive)
      document.body.removeChild(inlineVideo)
      inlineVideo = null
    }
  })
}