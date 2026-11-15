const photo = (name, alt, position) => ({
  file: `attractions/${name}.jpg`,
  alt,
  position,
})

export const attractionGroups = [
  {
    id: 'street-life',
    title: '街巷与日常',
    icon: 'market',
    description: '逛早市、喝杯咖啡，再看看老街的房屋和供销社。',
    places: [
      {
        id: 'morning-wine-street',
        title: '三江早酒文化街',
        description: '红灯笼和黄伞下摆开了摊位。逛一趟早市，尝一碗热牛杂，看看三江人怎么吃早酒。',
        photos: [photo('sanjiang-morning-wine-street', '挂满红灯笼、撑着黄色遮阳伞的三江早酒文化街')],
      },
      {
        id: 'boshidi-cafe',
        title: '博士第咖啡馆',
        description: '白墙小楼挂着「博士第」牌匾，拱窗、花圃和树荫围出一方院子，适合停下来喝杯咖啡。',
        photos: [
          photo('boshidi-cafe-front', '博士第咖啡馆的白墙小楼和正门牌匾'),
          photo('boshidi-cafe-garden', '从庭院望向博士第咖啡馆的拱窗和阳台'),
        ],
      },
      {
        id: 'caijia-iron-house',
        title: '南街蔡家铁屋',
        description: '走到南街蔡家，能看到铁瓦屋的青砖墙、绿格窗和金黄色屋面，门旁还有介绍牌。',
        photos: [photo('caijia-iron-house', '南街蔡家铁屋的金黄色屋面、青砖外墙和绿格窗', '50% 26%')],
      },
      {
        id: 'sanjiang-cooperative',
        title: '三江80供销社',
        description: '玻璃柜台里摆着布鞋、搪瓷杯和日用品，旧广告贴在墙上，保留了老供销社的陈列样式。',
        photos: [photo('sanjiang-80-cooperative', '三江80供销社的旧广告、木柜与玻璃柜台', 'center top')],
      },
    ],
  },
  {
    id: 'arts-history',
    title: '艺术与人文',
    icon: 'book',
    description: '看书画、访展馆，沿着水边认识前后万与三江的地方故事。',
    places: [
      {
        id: 'li-liangdong-art-museum',
        title: '李良东艺术馆',
        description: '书法作品挂在木墙之间，抬头能看见老屋的梁柱。看展时，也可以留意字幅和屋内的陈设。',
        photos: [photo('li-liangdong-art-museum', '李良东艺术馆内的书法作品和参观者', '50% 75%')],
      },
      {
        id: 'sanjiang-art-museum',
        title: '三江艺术馆',
        description: '木格窗旁挂着书画，老屋里也曾举办古琴雅集。展陈与交流活动给老街提供了一处看艺术的空间。',
        photos: [photo('sanjiang-art-museum', '三江艺术馆内的书画展陈和古琴雅集', '50% 65%')],
      },
      {
        id: 'qianhouwan-park',
        title: '三江前后万历史博览园',
        description: '沿水岸走过石栏、亭子和桥，在水里看见屋檐倒影，也能顺道了解前后万的村落历史。',
        photos: [photo('qianhouwan-history-park', '晚霞下的三江前后万历史博览园，亭桥倒映在水面')],
      },
      {
        id: 'chatingju',
        title: '茶亭居',
        label: '红色教育基地',
        description: '从红底金字的「茶亭居」门匾认出这处红色教育基地，在这里了解三江的地方革命历史。',
        photos: [photo('chatingju', '茶亭居门上的红底金字匾额与门联', 'center top')],
      },
    ],
  },
  {
    id: 'houwan-heritage',
    title: '后万古建',
    icon: 'pavilion',
    description: '这四处古迹合列为省级文物保护单位「后万村古建筑群」。',
    places: [
      {
        id: 'qianlong-well',
        title: '乾隆古井',
        description: '沿石阶可见圆形井口与刻有井名的石碑。这口井记录着古村过去的取水日常。',
        photos: [photo('qianlong-well', '乾隆古井的圆形井口和刻有井名的石碑', '50% 70%')],
      },
      {
        id: 'chastity-archway',
        title: '贞节牌坊',
        description: '文保名录称「双节坊」。从门前抬头，可看见层叠的檐口、镂空花窗和多处砖石雕刻。',
        photos: [photo('chastity-archway', '贞节牌坊的檐口、镂空花窗与砖石雕刻', '50% 30%')],
      },
      {
        id: 'bida-gate',
        title: '必大之门',
        description: '石阶通向木门，门额上方的题字与两侧红石门柱，是这座古建筑最醒目的细节。',
        photos: [photo('bida-gate', '必大之门的石阶、红色门额和两侧石柱')],
      },
      {
        id: 'jiuye-residence',
        title: '九爷府',
        description: '文保名录称「九爷宅」。树荫下可见高墙、深檐与木门，门口贴着红联。',
        photos: [photo('jiuye-residence', '树荫下的九爷府，门边贴着红色对联', '50% 48%')],
      },
    ],
  },
]

export const walkingRoutes = [
  {
    id: 'market-morning',
    title: '早酒茶香线',
    label: '早晨 · 逛吃',
    motif: 'beef-and-tea',
    scene: 'morning-market',
    description: '用一碗热牛杂开启早晨，逛过老供销社，再到乌龙街喝杯茶。',
    stops: [
      { placeId: 'morning-wine-street', tip: '逛早市，尝一碗热牛杂' },
      { placeId: 'sanjiang-cooperative', tip: '隔着玻璃柜台找找老物件' },
      { title: '乌龙街老茶馆', to: '/guide#map', tip: '坐下来喝杯茶，歇歇脚' },
    ],
  },
  {
    id: 'arts-and-water',
    title: '书画水岸线',
    label: '下午 · 看展',
    motif: 'ink-and-scroll',
    scene: 'waterfront-pavilion',
    description: '先在老屋里看字画、听地方故事，再沿水岸找一处能拍到亭桥倒影的地方。',
    stops: [
      { placeId: 'sanjiang-art-museum', tip: '看看木格窗旁的书画展陈' },
      { placeId: 'chatingju', tip: '从门匾读起，了解三江的红色故事' },
      { placeId: 'qianhouwan-park', tip: '沿水岸散步，拍一张亭桥倒影' },
    ],
  },
  {
    id: 'houwan-walk',
    title: '后万古建线',
    label: '慢逛 · 古建',
    motif: 'eaves-and-lantern',
    scene: 'bida-gate',
    description: '走进后万古村，从取水的老井逛到深巷里的老宅，一路找找砖石上的细节。',
    stops: [
      { placeId: 'qianlong-well', tip: '认一认井名石碑和圆形井口' },
      { placeId: 'chastity-archway', tip: '抬头看层叠的檐口和砖石雕刻' },
      { placeId: 'bida-gate', tip: '读门额题字，看红石门柱' },
    ],
  },
]
