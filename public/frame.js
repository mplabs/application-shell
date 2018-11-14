(function() {
  window.onmessage = e => console.log(`Child received: '${e.data}'`)

  window.parent.postMessage(`Hello from ${window.location.pathname}!`, window.location.origin)
}())