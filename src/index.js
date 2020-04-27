/**
 *
 * @param {*} func 执行函数
 * @param {*} wait 等待时间
 * @param {*} immediate 是否立即执行
 */
const debounce = function(func, wait, immediate) {
  // 定时器
  var timeout;
  // 返回值
  var result;
  var debounced = function () {
    // 绑定this
    var context = this;
    // 绑定参数列表
    var args = arguments;

    if(timeout) {
      clearTimeout(timeout);
    }
    if(immediate) {
      // 执行状态,如果执行过了并且时间未到，不再执行
      var status = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if(status) {
        result = func.apply(context, args);
      }
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
  // 取消当前的计时器
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

/**
 *
 * @param {*} func 执行函数
 * @param {*} wait 等待时间
 * @param { leading 第一次是否立即执行, trailing 是否禁止停止触发后的回调 } options
 */
const throttle = function(func, wait, options) {
  var timeout; // 定时器
  var context; // this
  var args; // 参数列表
  var previous = 0; // 时间戳计数
  if(!options) {
    options = {};
  }
  var later = function() {
    // 判断第一次是否立即执行
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if(!timeout) {
      context = null;
      args = null;
    }
  };
  var throttle = function() {
    var now = new Date().getTime();
    if (!previous && options.leading === false) {
      previous = now;
    }
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if(remaining <= 0 || remaining > wait) {
      if(timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if(!timeout) {
        context = null;
        args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttle;
};

/**
 * 类型判断函数
 * @param {*} obj 要判断的对象
 */
const judgeType = function() {
  var class2Type = {};
  'Boolean Number String Function Array Date RegExp Object Error'
    .split(' ')
    .map(function(item) {
      class2Type[`[object ${item}]`] = item.toLowerCase();
      return item;
    });
  return function(obj) {
    if (obj === null) {
      return `${obj}`;
    }
    return typeof obj === 'object' || typeof obj === 'function' ?
      class2Type[Object.prototype.toString.call(obj)] || 'object' :
      typeof obj;
  };
};

/**
 * 浅拷贝函数，不递归拷贝
 * @param {*} obj 要拷贝的函数
 */
const shallowCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') {
    return;
  }
  // 判断obj的类型
  var newObj = obj instanceof Array ? [] : {};
  for(var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};
/**
 * 深拷贝函数，递归
 * @param {*} obj
 */
const deepCopy = function(obj) {
  if (typeof obj !== 'object') {
    return;
  }
  var newObj = obj instanceof Array ? [] : {};
  for(var key in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
};

export default {
  debounce,
  throttle,
  judgeType: judgeType(),
  shallowCopy,
  deepCopy
};
