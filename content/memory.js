export const hero = {
  title: '沿着乌龙街，读懂三江口',
  seal: '记忆',
  backgroundImage: 'wulong-memory-banner.jpg',
  description: '在古镇老街的石板路上，触摸三江的烟火与时光。在码头的舟影里听往来的故事，在热闹的集市中尝水乡物产，在一盏早茶的热气里读懂三江人的日常。',
}

export const headings = {
  impressions: { title: '老街印象', subtitle: '一条老街，半部三江史' },
  stories: { title: '文化故事', subtitle: '在故事里，读懂三江的过去与现在' },
  localFlavors: { title: '地方风物', subtitle: '山水滋味，三江本色' },
  gallery: { title: '影像记忆', subtitle: '茶馆与街区实拍' },
  walkingRoutes: { title: '推荐打卡路线', subtitle: '跟着路线走，体验乌龙街的文化与烟火' },
}

const item = ([title, image, icon, description, alt]) => ({ title, image, icon, description, alt })

export const photos = [
  { image: 'teahouse-album-hall', title: '老茶馆大堂' },
  { image: 'teahouse-album-stage', title: '乡土舞台' },
  { image: 'teahouse-album-seats', title: '竹椅茶席' },
]

export const impressions = [
  ['后万古村街巷', 'houwan-alley', 'route', '青砖老屋夹着一条窄巷，石板路从墙根一路通向村口。'],
  ['后万古村牌匾', 'houwan-plaque', 'pavilion', '老门楼上还留着石匾、刻字和镂空石雕。'],
  ['早酒文化街', 'culture-street', 'market', '沿街小店聚集，来这里可以尝尝三江的早点和早酒。'],
  ['灯笼街景', 'lantern-street', 'route', '红灯笼挂在三江早酒文化街入口，映着青砖和红字招牌。'],
  ['乌龙街老茶馆', 'entrance', 'tea', '循着黑底金字的招牌进门，坐下来喝一盏热茶。'],
].map(item)

export const stories = [
  ['三江因三水汇流得名', 'regional-fu-river', 'waves', '箭江、隐溪、彭湾在此相汇，三江古称“三江口”。水系带来商贸，也孕育了独特的古镇风貌。'],
  ['古镇商贸繁盛', 'sanjiang-river-trade', 'market', '三江依水而兴，茶叶、粮油、木材、山货曾在此流通。'],
  ['茶铺酒肆云集', 'teahouse-album-guests', 'tea', '老街的茶铺与酒肆既是歇脚处，也是街坊交流消息、谈古论今的地方。'],
  ['赶集传统', 'sanjiang-market', 'pavilion', '三江逢农历三、六、九赶集，周边乡民携农产、山货和手作汇聚街头。'],
  ['码头往事', 'sanjiang-wharf', 'waves', '昔日货船从码头往来，茶叶、木材、土产运向更远的地方。'],
].map(item)

export const localFlavors = [
  ['萝卜腌菜', 'radish-gift-box', '', '三江人家常的开胃小菜，酸脆爽口，常配早餐或茶点。', '三江萝卜腌菜的红色礼盒'],
  ['马蹄', 'water-chestnut', '', '清甜多汁，既可生食，也常入菜、煲汤。'],
  ['空心菜', 'greens', '', '三江常见的时令蔬菜，蒜香清炒，鲜嫩爽口。'],
  ['早市美食', 'sanjiang-breakfast', '', '米粉、牛杂汤、油条，从一碗热食开启三江早晨。'],
].map(item)

export const routes = [
  { title: '晨市路线', icon: 'sun', duration: '约2小时', description: '赶一场三江早市，感受鲜活的古镇烟火。', stops: ['三江早市', '早酒文化街', '老街小吃', '乌龙街'], detail: '从早市街区开始，逛过早酒文化街，在老街尝一口时令小吃，最后沿乌龙街到老茶馆歇脚。农历三、六、九人流较多，可错峰前往。' },
  { title: '老街路线', icon: 'pavilion', duration: '约3小时', description: '漫步百年乌龙街，探寻古镇历史印记。', stops: ['牌坊', '老铺群', '石板路', '古桥'], detail: '以老街牌坊为起点，沿街看茶号和传统老铺，沿石板路慢行至桥边，顺路回到老茶馆。' },
  { title: '茶馆慢游路线', icon: 'tea', duration: '约半天', description: '以一盏茶的时光，细品三江的人文与生活。', stops: ['三江码头', '集市', '乌龙街老茶馆', '江畔漫步'], detail: '从码头意象和集市逛起，在乌龙街老茶馆品茶、听故事，最后到江畔散步。茶事活动请提前电话咨询。' },
]
