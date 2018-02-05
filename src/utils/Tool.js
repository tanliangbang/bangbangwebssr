import md5 from './md5'
const Tool = {}
/**
 * 格式化时间
 *
 * @param {any}
 * @returns
 */
Tool.formatDate1 = function (str) {
  let date = new Date(str)
  let time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if (time / 1000 < 60) {
    return '刚刚'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
}

/**
 * 格式化时间2
 *
 * @param {any} t
 * @returns
 */
Tool.formatDate2 = function (currDate, str) {
  if (currDate === '' || currDate == null) {
    return
  }
  let nowDate = new Date(currDate)
  let year = nowDate.getFullYear() //  获取完整的年份(4位,1970-????)
  let month = nowDate.getMonth() + 1 //  获取当前月份(0-11,0代表1月)
  let day = nowDate.getDate() //  获取当前日(1-31)  v
  let hh = nowDate.getHours()
  let mm = nowDate.getMinutes()
  let ss = nowDate.getSeconds()
  if (str === 'china') {
    return (year + '年' + month + '月' + day + '日' + '  ' + hh + ':' + mm + ':' + ss)
  }
  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  if (hh < 10) {
    hh = '0' + hh
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  if (ss < 10) {
    ss = '0' + ss
  }
  return (year + str + month + str + day + '  ' + hh + ':' + mm + ':' + ss)
}

/**
 * 本地数据存储或读取
 *
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
  if (arguments.length === 1) {
    return localStorage.getItem(key)
  } else {
    return localStorage.setItem(key, value)
  }
}

/**
 * 删除本地数据
 *
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
  if (key) {
    return localStorage.removeItem(key)
  }
  return localStorage.removeItem()
}

Tool.md5 = md5.hex_md5

export default Tool
