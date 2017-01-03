s = {
  $m: {},
  save(...args){
    props = args
  },
  load(...props) {
    ech(props, function(prop){
      var v = localStorage[prop]
      if(v) {
        v = JSON.parse(v)
        if(iso(v)) {
          if(!s[prop]) s[prop] = {}
          mergewithoutempty(s[prop], v)
        }
        else s[prop] = v
      }
    })
  }
}

var props = []
window.addEventListener('blur', function () {
  ech(props, function(prop){
    var o = JSON.stringify(s[prop])
    if(o.length)
      localStorage[prop] = o
  })
})

observe(s,'s',global)

function observe (vv,pp,oo) {
  // console.log(vv,pp, 'observe')
  if(!iso(vv) && !isa(vv) || pp[0]=='$') return
  oo[pp] = new Proxy(vv, {set})
  ech(vv,function(value,prop) {
    observe(value,prop,vv)
  })
}
function set (oo,pp,vv,r) {
  // console.log('set', pp,vv,oo[pp+'_fn'])
  var ret = Reflect.set(oo, pp, vv, r)
  var fn = oo[pp+'_fn']
  if(fn) fn(vv)
  else update()
  if(typeof vv=='object') observe(vv,pp,oo)
  return ret
}

function mergewithoutempty (target, obj) {
  ech(obj, function (v, p) {
    if(iso(v) && !Object.keys(obj).length) return
    target[p] = v
  })
}
