onkeydown = function(e) {
  console.log(e.key, e)
  if (idx(['Alt','Control','Meta','Shift'],e.key)) return
  var abbr = event2abbr(e)
  var cmd = abbr2cmd(abbr)
  if(!cmd) return
  if(isf(cmd)){
    e.preventDefault()
    cmd(abbr)
  }
  else
    trigger(cmd,abbr,e)
}

function event2abbr (e) {
  var a = ''
  if(e.altKey) a+='a'
  if(e.ctrlKey) a+='c'
  if(e.metaKey) a+='d'
  if(e.shiftKey) a+='s'
  return a+(shortMap[e.key]||e.key)
}

function abbr2cmd (abbr) {
  var m = s
  ech( s.kmap.split('.'), prop=>m=m[prop] )
  m = m && m.$m || m
  return m[abbr] || s.$m[abbr]
}

function trigger(path,abbr,e) {
  var a = s
  ech( path.split('.'), prop=>a=a[prop] )
  if(a){
    e.preventDefault()
    a(abbr,e)
  }
}

var shortMap = {
  ArrowUp:'up',
  ArrowDown:'down',
  ArrowLeft:'left',
  ArrowRight:'right',
  PageUp:'pageup',
  PageDown:'pagedown',
  Escape:'esc',
  Enter:'ent',
  Tab:'tab',
  Backspace:'bks',
  Delete:'del',
  Home:'home',
  End:'end',
  Insert:'ins'
}
