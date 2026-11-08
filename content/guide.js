import { address, hours } from './site.js'

export const hero = {
  title: '到店指南',
  subtitle: '来三江口，坐一坐老茶馆',
  description: '如何找到三江乌龙街老茶馆？一张图、几种方式，带您轻松到店，在三江口的烟火与茶香中，品一杯地道的老茶。',
}

export const headings = {
  store: { title: '门店信息' },
  map: { title: '位置地图', subtitle: '三江镇乌龙街' },
  travel: { title: '交通方式', subtitle: '多种方式轻松到店' },
  neighbors: { title: '周边联动' },
}

export const storeDescription = '地处江西省南昌市南昌县三江镇乌龙街，与“三江早酒文化街”相邻。来三江口，逛早酒文化街、品老茶、听故事，感受三江烟火与人文底蕴。'
export const townDescription = '三江镇古称“三江口”，因箭江、隐溪、彭湾三水汇流于此而得名，自古为水陆交汇、商贸往来的集镇。'

export const storeInfo = [
  { icon: 'pin', title: '地址', text: address },
  { icon: 'people', title: '到访提示', text: '农历三、六、九赶集日客流较旺，建议错峰到访或提前预约。' },
  { icon: 'flag', title: '位置说明', text: '茶馆与“三江早酒文化街”相邻，可将文化街作为到店地标。' },
  { icon: 'clock', title: '营业时间', text: hours },
]

export const travel = [
  { icon: 'car', title: '自驾到店', image: 'entrance', alt: '乌龙街老茶馆门头', description: `在地图软件中搜索“${address}”，按导航即可到达。` },
  { icon: 'walk', title: '步行从早酒文化街到店', image: 'lantern-street', alt: '三江早酒文化街入口的红灯笼', description: '茶馆与三江早酒文化街相邻。在文化街游览、品尝地方美食后，可步行前往。' },
  { icon: 'calendar', title: '赶集日到访建议', image: 'culture-street', alt: '三江早酒文化街入口', description: '农历三、六、九为三江镇赶集日，周边客流较大，建议错峰到访或提前预约。' },
]

export const neighbors = [
  { image: 'culture-street', title: '三江早酒文化街', text: '集聚地方美食、早酒文化与市井烟火。先逛街、尝风味，再到老茶馆坐坐喝茶。', to: '/wulong-memory#culture-stories' },
  { image: 'houwan-alley', title: '后万古村街巷', text: '沿青石板路走进后万古村，看看两旁的青砖老屋。', to: '/wulong-memory#impressions' },
]
