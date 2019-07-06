/*
 * webpackConfig过滤器：把webpack配置中的条件语句替换掉
 */
function webpackConfigFilter(webpackConfig) {
  function realValue(x) {
    if (x.condition == undefined) return x
    if (x.condition) return x.ifTrue
    else return x.ifFalse
  }

  function filtArray(a) {
    return a.map(realValue).filter(x => x != null && x != undefined)
  }

  function filtObject(o) {
    for (var i in o) {
      if (o[i] instanceof Array) {
        o[i] = filtArray(o[i])
      } else if (o[i].condition != undefined) {
        o[i] = realValue(o[i])
      } else if (typeof o[i] == "object") {
        o[i] = filtObject(o[i])
      }
    }
    return o
  }
  return filtObject(webpackConfig)
}
module.exports = webpackConfigFilter
