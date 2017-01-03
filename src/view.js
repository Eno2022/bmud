var {createClass} = require('react')
var {render} = require('react-dom')
var vdomize = require('./vdomize.js')

s = {}
var app = createClass({
  componentDidMount() {
    update = this.forceUpdate.bind(this)
  },
  render() {
    return vdomize('#app.row', ...map( s.view, n =>s[n].$v(s[n]) ))
  }
})

document.body.insertAdjacentHTML('afterbegin', '<div id="root"></div>')
render(vdomize(app), document.getElementById('root'))
