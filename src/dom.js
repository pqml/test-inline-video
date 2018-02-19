export function css (element, style) {
  for (let k in style) element.style[k] = style[k]
}

export function attr (element, attrs) {
  for (let k in attrs) element.setAttribute(k, attrs[k])
}
