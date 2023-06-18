function singleton(name, value) {
  const yolo = global
  yolo.__singletons ??= {}
  yolo.__singletons[name] ??= value()
  return yolo.__singletons[name]
}

module.exports = { singleton }