
import scopeCSS from 'scope-css'

/*
{
  type: 'text',
  modules:{
    css:{
      css: 'p{color:res;}',
      props: '--myColor:red; --otherProp: green;'
    }
  }
} */

const module = function (element, mod, config) {
  if (config.contextType !== 'block') return

  const props = mod.props
  if (props) {
    const prps = props.split(';')
    prps.forEach(p => {
      const parts = p.split(':')
      element.style.setProperty(parts[0], parts[1])
    })
  }

  const css = mod.css
  const n = Math.random() + ''
  const m = n.split('.')
  const rnd = 'css' + m[1] + 'sndb'

  const scoped = scopeCSS(' ' + css, '.' + rnd)

  element.classList.add(rnd)

  const style = document.createElement('style')
  style.type = 'text/css'
  style.append(scoped)
  element.appendChild(style)
}

module.runBefore = true

module.install = Presenta => {
  Presenta.addModule('css', module)
}

export default module

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(module)
}
