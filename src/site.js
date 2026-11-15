import { address } from '@content/site'

const directions = {
  origin: '我的位置',
  destination: address,
  region: '南昌市',
  mode: 'driving',
}
export const mapLink = 'https://api.map.baidu.com/direction?' + new URLSearchParams({
  ...directions,
  output: 'html',
  src: 'webapp.sanjiang.teahouse',
})
const appleMapLink = 'maps://?' + new URLSearchParams({ daddr: address, dirflg: 'd' })
const webMapOption = { label: '百度地图网页版', description: '无需安装 App，可查看路线', icon: 'pavilion', href: mapLink }

export const isWeChatBrowser = (userAgent = '') => /MicroMessenger/i.test(userAgent)

export function mobileMapOptions({ userAgent = '', platform = '', maxTouchPoints = 0 } = {}) {
  if (isWeChatBrowser(userAgent)) return [webMapOption]

  const isIOS = /iPhone|iPad|iPod/i.test(userAgent) || (platform === 'MacIntel' && maxTouchPoints > 1)
  if (!isIOS && !/Android/i.test(userAgent)) return []

  const baiduRoute = 'map/direction?' + new URLSearchParams({
    ...directions,
    coord_type: 'bd09ll',
    src: `${isIOS ? 'ios' : 'andr'}.sanjiang.teahouse`,
  })
  const useIntent = !isIOS && /Chrome\//i.test(userAgent) && !/; wv\)/i.test(userAgent)
  const appLink = (scheme, route, packageName) => useIntent
    ? `intent://${route}#Intent;scheme=${scheme};package=${packageName};end`
    : `${scheme}://${route}`
  const amapRoute = isIOS
    ? 'path?' + new URLSearchParams({ sourceApplication: 'sanjiang.teahouse', dname: address, t: '0', m: '0' })
    : 'poi?' + new URLSearchParams({ sourceApplication: 'sanjiang.teahouse', keywords: address, dev: '0' })

  return [
    ...(isIOS ? [{ label: '苹果地图', icon: 'route', href: appleMapLink }] : []),
    { label: '百度地图', icon: 'route', href: appLink(isIOS ? 'baidumap' : 'bdapp', baiduRoute, 'com.baidu.BaiduMap') },
    {
      label: '高德地图',
      description: isIOS ? undefined : '打开后选择茶馆，再开始导航',
      icon: 'pin',
      href: appLink(isIOS ? 'iosamap' : 'androidamap', amapRoute, 'com.autonavi.minimap'),
    },
    webMapOption,
  ]
}
export const media = (file) => import.meta.env.BASE_URL + 'media/' + file
