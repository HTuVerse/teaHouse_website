export const siteName = '三江乌龙街老茶馆'
export const shareTitle = siteName + '官网'
export const shareImagePath = 'media/share-logo.jpg'
export const shareDescriptions = [
  '一杯茶，一段故事，一份老街情怀。三江乌龙街老茶馆，邀你来坐坐，聊聊那些熟悉的人和事。',
  '乌龙街上茶香浓，三江故人话旧时。一杯清茶，闲话家常。',
  '承接餐饮预订、亲友聚餐、朋友小聚，欢迎提前预约！',
]

export const sharePagePath = (index) => `share/${index + 1}.html`

export const brandCaption = '江西南昌 · 南昌县三江镇'
export const footerCaption = '一盏赣鄱茶 · 半座三江城'
export const address = '江西省南昌市南昌县三江镇乌龙街茶馆'
export const phone = '138 7068 9398'
export const phoneLink = `tel:${phone.replace(/\s/g, '')}`
export const hours = '9:00–17:00'

export const navigation = [
  { to: '/', label: '首页', icon: 'home' },
  { to: '/menu', label: '菜单与点心', icon: 'tea' },
  { to: '/activities', label: '咨询活动', icon: 'calendar' },
  { to: '/wulong-memory', label: '乌龙街记忆', icon: 'book' },
  { to: '/guide', label: '到店指南', icon: 'pin' },
]
