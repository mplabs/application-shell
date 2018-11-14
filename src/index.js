import Navigo from 'navigo'
import styles from './style.scss'

const router = new Navigo()

// Setup routing
router.on({
  '/app1': navigateTo.bind(null, `${window.location.origin}/app1.html`),
  '/app2': navigateTo.bind(null, `${window.location.origin}/app2.html`),
  '/app3': navigateTo.bind(null, `${window.location.origin}/app3.html`),
  '*': navigateTo.bind(null, `${window.location.origin}/app1.html`)
})
.resolve()

const iframe = document.getElementById('iframe')
iframe.addEventListener('load', handleIframeLoad)

// Setup parent listener
const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent'
const eventer = window[eventMethod]
const messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message'
eventer(messageEvent, e => console.log(`Parent received: '${e.data}'`))

// Setup routes
Router
  .config({ mode: 'history '})
  .add(/app1/, navigateTo.bind(null, `${window.location.origin}/app1.html`))
  .add(/app2/, navigateTo.bind(null, `${window.location.origin}/app2.html`))
  .add(/app3/, navigateTo.bind(null, `${window.location.origin}/app3.html`))
  .navigate()
  .listen()

function handleIframeLoad() {
  this.contentWindow.document
    .querySelectorAll('a')
    .forEach(link => link.addEventListener('click', evt => {
      const { hash, pathname, search } = evt.target
      evt.preventDefault()
      Router.navigate(`${pathname}${search}${hash}`)
    }))
  // iframe.contentWindow.addEventListener('pushState', () => {}, { capture: true })
  iframe.contentWindow.document.addEventListener('click', (evt) => console.log(`Click inside iframe`))
}

// Update iframe
function navigateTo(route) {
  iframe.setAttribute('src', route)
  setTimeout(() => {
    iframe.contentWindow.postMessage('Hello iFrame!', window.location.origin)
  }, 1000)
}

// Hot module reloading
if (module.hot) {
  module.hot.accept()
}
