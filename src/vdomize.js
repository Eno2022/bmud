module.exports = (...arr)=>arr2element(arr)

function arr2element(arr) {
  var props = arr[1]
  var childStart = 1
  if (iso(props)) {
    childStart = 2
  } else {
    props = {}
  }

  var type = arr[0]
  if(iss(type)){
    type = parseTag(type)
    if(type.id) props.id = type.id;
    if(type.className) {
      props.className = ((props.className || "") + type.className).trim()
    }
    type = type.name
  }

  var children = []
  each(arr, function(child) {
    if (isa(child)) {
      children.push(arr2element(child))
    } else if (child) {
      children.push(child)
    }
  }, childStart)

  return require('react').createElement(type, props, ...children)
}

function parseTag(str) {
  var tag = {
    name: "",
    id: "",
    className: ""
  }
  var isId = false
  var isClass = false

  each(str, function(char) {
    if (char == "#") {
      isId = true
    } else if (char == ".") {
      tag.className += " "
      isClass = true
      isId = false
    } else {
      if (isId) {
        tag.id += char
      } else if (isClass) {
        tag.className += char
      } else {
        tag.name += char
      }
    }
  })

  tag.name = tag.name || "div"
  return tag
}

function each(seq, fn, start) {
  if (!seq || !fn) return;
  for (var i = start || 0; i < seq.length; i++) {
    fn(seq[i], i)
  }
}
