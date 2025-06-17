export type BrowserStorageType = 'local' | 'session'

export const getStoreBrowser = (type: BrowserStorageType = 'session') => {
  if (typeof window !== 'undefined') {
    return type === 'local' ? window.localStorage : window.sessionStorage
  }
  return {
    getItem: (_key: string) => null,
    setItem: (_key: string, _value: string) => {},
    removeItem: (_key: string) => {}
  }
}
