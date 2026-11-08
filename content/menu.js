export const hero = {
  title: '菜单茶点',
  subtitle: '一盏热茶，配一口三江烟火',
  description: '在三江乌龙街老茶馆，品一盏地道好茶，尝一口三江早酒文化街的在地早餐，感受赶集人间的烟火滋味。',
}

export const headings = {
  breakfast: { title: '早酒早餐', subtitle: '从街区烟火到茶馆餐桌' },
  snacks: { title: '在地茶点', subtitle: '三江风物，佐茶亦可小聚' },
  pairings: { title: '推荐搭配', subtitle: '三江茶馆的人气组合' },
}

export const introductions = {
  tea: {
    title: '招牌茶饮',
    subtitle: '一盏好茶，品味老街慢时光',
    description: '茶馆延续三江老茶馆的饮茶传统，以乌龙茶为特色，亦备绿茶、红茶、老白茶等，并提供盖碗茶的传统冲泡体验，也可品在地热米酒。',
  },
  breakfast: {
    title: '三江早酒文化街的在地早餐体验',
    description: '三江镇素有“早酒文化”传统，赶集日清晨，街区烟火升腾，牛杂、米粉、早点摊香气四溢。如今在老茶馆，也可品尝这份地道的三江早餐风味。',
    image: 'culture-street.jpg',
    alt: '三江早酒文化街',
  },
  snacks: {
    description: '取三江本地物产与家常风味，佐茶相宜，也适合茶馆小聚。一口在地乡味，尽是三江的质朴与鲜活。',
  },
}

export const menuHighlights = [
  { label: '地道茶饮', icon: 'pavilion' },
  { label: '三江早酒风味', icon: 'waves' },
  { label: '在地风物茶点', icon: 'market' },
  { label: '赶集晨间烟火', icon: 'tea' },
]

const item = ([title, image, description]) => ({ title, image, description })

export const teas = [
  ['乌龙茶', 'home-oolong', '茶香醇厚，回甘悠长'],
  ['绿茶', 'home-green', '清香鲜爽，自然回甘'],
  ['红茶', 'home-black', '汤色红亮，香甜醇和'],
  ['老白茶', 'home-white', '陈香醇和，温润适口'],
  ['盖碗茶', 'sanjiang-tea-snacks', '传统冲泡，品香观汤'],
  ['热米酒', 'tea-rice-wine', '在地饮品，温热香甜'],
].map(item)

export const breakfast = [
  ['牛杂粉', 'beef-noodle', '牛杂入粉，鲜香地道'],
  ['牛杂汤', 'beef-soup', '汤鲜味浓，地道早味'],
  ['米粉', 'rice-noodle', '三江常见早餐，爽滑入味'],
  ['白糖糕', 'rice-cake', '在地传统糕点，松软香甜'],
  ['油条', 'fried-dough', '赶集早餐常见，香酥可口'],
  ['热粥', 'congee', '清润暖胃，配早点更合宜'],
  ['街区早点', 'sanjiang-breakfast', '来自三江早酒文化街的日常烟火滋味'],
].map(item)

export const snacks = [
  ['萝卜腌菜', 'radish', '三江家常腌菜，爽脆开胃，配茶佐餐皆宜。'],
  ['马蹄', 'water-chestnut', '三江时令风物，清甜爽脆，口感多汁。'],
  ['空心菜', 'greens', '三江常见时蔬，清炒鲜嫩，家常可口。'],
  ['时令小炒', 'seasonal', '选用当季本地食材，家常小炒，顺时而食。'],
  ['茶馆小食', 'nuts', '花生、炒货等常备小食，佐茶更添闲趣。'],
].map(item)

export const pairings = [
  { title: '老街茶席', badge: '人气推荐', image: 'sanjiang-tea-snacks', description: '乌龙茶 / 盖碗茶 ＋ 茶馆小食（花生、炒货等）' },
  { title: '赶集晨味', badge: '当日供应', image: 'sanjiang-breakfast', description: '牛杂粉 / 米粉或牛杂汤 ＋ 油条 / 白糖糕 ＋ 热米酒' },
  { title: '在地乡味', badge: '时令限定', image: 'sanjiang-pairing', description: '本地茶饮 ＋ 时令小炒 ＋ 在地风物（马蹄 / 空心菜等）' },
]
