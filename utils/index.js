/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
import pako from 'pako';

const isServer = typeof window === 'undefined';
export const unzip = (binaryString) => {
  return pako.inflate(binaryString, { to: 'string' });
};

export const zip = (str) => {
  return pako.deflate(str, { to: 'string' });
};

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time, 0);
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time *= 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value]; }
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
  return timeStr;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if ((`${time}`).length === 10) {
    time = parseInt(time, 0) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;
  if (diff < 30) {
    return '刚刚';
  } if (diff < 3600) {
    // less 1 hour
    return `${Math.ceil(diff / 60)}分钟前`;
  } if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`;
  } if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  }
  return (
    `${d.getMonth()
      + 1
    }月${
      d.getDate()
    }日${
      d.getHours()
    }时${
      d.getMinutes()
    }分`
  );
}

export const setCookie = (name, value) => {
  if (!isServer) {
    const Days = 5;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path=/`;
  }
};
export const getCookie = (name) => {
  if (!isServer) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
      return unescape(arr[2]);
    }
  }
  return null;
};
export const getServerCookie = (cookie, name) => {
  if (cookie) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = cookie.match(reg);
    if (arr) {
      return unescape(arr[2]);
    }
  }
  return null;
};
export const delCookie = (name) => {
  if (!isServer) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null)document.cookie = `${name}=${cval};expires=${exp.toGMTString()};path=/`;
  }
};

/**
 * 计算markdown目录
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export const getCatalog = (article) => {
  const catalog = [];
  // const reg = /(#+)\s+?(.+?)\n/g; // 匹配 ####
  const reg = /data-id="([^/s]*?)"\s?data-level="([^/s]*?)"\s?data-text="([^/s]*?)"/g; // 匹配 htm
  let regExecRes = null;
  while ((regExecRes = reg.exec(article))) {
    catalog.push({
      id: regExecRes[1],
      level: regExecRes[2],
      title: regExecRes[3]
    });
  }
  return catalog;
};

/**
 * 计算markdown文章字数
 * @param {string} data 文章
 */
export function wordCount(data) {
  const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  const m = data.match(pattern);
  let count = 0;
  if (m === null) return count;
  for (let i = 0; i < m.length; i++) {
    count += m[i].length;
  }
  return count;
}
