/**
 * @description 常用工具方法
 * @author mole
 * @Date 2018.08.17 Happy Valentine's Day
 */

export function sessionStorageSet(key, value) {
  return window.sessionStorage.setItem(key, JSON.stringify(value))
}

export function sessionStorageGet(key) {

  return JSON.parse(window.sessionStorage.getItem(key)) || null
}

export function sessionStorageRemove(key) {
  return window.sessionStorage.removeItem(key)
}

export function localStorageSet(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value))
}

export function localStorageGet(key) {
  return JSON.parse(window.localStorage.getItem(key)) || null
}

export function localStorageRemove(key) {
  return window.localStorage.removeItem(key)
}
