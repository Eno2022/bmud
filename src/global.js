iso = function(v) { return Object.prototype.toString.call(v) == "[object Object]" }
isa = Array.isArray
iss = v=> typeof v == 'string'
isf = v=> typeof v == 'function'

ech = function(seq, callback) {
  if (!seq || !callback) return
  if (iso(seq)){
    for (var prop in seq) {
      if(prop[0] != '$')
        callback(seq[prop], prop)
    }
  }
  else {
    for (var i = 0; i < seq.length; i++) {
      callback(seq[i], i)
    }
  }
}
map = function(seq, fn) {
  var rt = []
  if (!seq || !fn) return rt
  if (iso(seq)){
    for (var prop in seq) {
      if(prop[0] != '$')
        rt.push( fn(seq[prop], prop) )
    }
  }
  else {
    for (var i = 0; i < seq.length; i++) {
      var v = fn(seq[i],i)
      if(v!=null)
        rt.push(v)
    }
  }
  return rt
}
idx = function(seq,v) {
  return seq.indexOf(v) != -1
}
