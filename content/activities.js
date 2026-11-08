import { hours, phone, phoneLink } from './site.js'

export const hero = {
  title: '以茶会友，以文化人',
  seal: '茶事',
  description: '看看老茶馆最近有什么活动。每逢周末，也欢迎来喝茶、认识新朋友。',
}

export const headings = {
  events: { title: '活动列表', subtitle: '点击卡片查看详情与报名方式' },
  gallery: { title: '茶馆相册', subtitle: '空间场景' },
  faq: { title: '三江乌龙街老茶馆｜常见问题' },
}

const place = '三江镇乌龙街老茶馆'

export const events = [
  {
    id: 'youth-gathering',
    title: '青春邻聚 · 缘启新风',
    theme: '三江镇与八一乡青年交友联谊活动',
    badge: '近期活动',
    image: 'event-youth-notice.png',
    imagePosition: 'object-[center_44%]',
    icon: 'people',
    startDate: '2026-11-11',
    endsAt: '2026-11-11T17:00:00+08:00',
    time: '14:00–17:00',
    place,
    description: '在茶馆参加破冰游戏、拼豆手作和留言互动，认识新朋友。',
    highlights: ['缘分抱团和你比我猜', '两人协作完成拼豆手作', '心动留言卡由工作人员代为传递'],
    notes: [
      { label: '签到', text: '14:00 起签到入场。遇不可抗因素，活动适当延期。' },
      { label: '报名对象', text: '联动乡镇机关、企事业单位、各村（社区）的适龄单身青年。' },
      { label: '活动组织', text: '三江镇团委、八一乡团委主办，共青团南昌县委指导。' },
    ],
    booking: {
      email: '228209979@qq.com',
      consultationPhone: '15870017273',
      deadline: '2026-11-09T17:00:00+08:00',
      deadlineLabel: '2026 年 11 月 9 日（周一）17:00',
      instructions: '请将报名简历发送至主办方邮箱。审核通过后，主办方会发送短信通知。名额有限，额满即止。',
    },
  },
  {
    id: 'weekend-tea',
    title: '以茶会友',
    theme: '周末茶聚',
    badge: '每周末',
    image: 'hall.jpg',
    icon: 'tea',
    startDate: '2026-11-08',
    weekends: true,
    place,
    description: '周六、周日到老茶馆喝茶、闲聊，认识同好。',
    booking: {
      phone,
      phoneLink,
      instructions: '请致电茶馆确认所选周末的活动时段和席位。',
    },
  },
  {
    id: 'wulong-slow-life',
    title: '从窑火到茶香，来乌龙街坐一坐',
    theme: '乌龙街老茶馆乡村慢生活体验',
    badge: '往期回顾',
    image: 'event-wulong-poster.jpg',
    imagePosition: 'object-top',
    poster: 'event-wulong-poster.jpg',
    icon: 'pavilion',
    startDate: '2026-10-24',
    endDate: '2026-10-25',
    place,
    description: '两天的活动把老街、茶点和村晚舞台串在一起，邀请大家走进三江体验乡村慢生活。',
    highlights: ['走进乌龙街老茶馆，品茶搭配传统糕点', '逛三江老街，感受市集和乡土风物', '在村晚舞台听歌看表演'],
  },
]

export const gallery = [
  { image: 'teahouse-album-entrance', title: '乌龙街老茶馆门头' },
  { image: 'teahouse-album-guests', title: '茶客满堂' },
  { image: 'teahouse-album-hall', title: '茶馆大堂' },
  { image: 'teahouse-album-stage', title: '乡土舞台' },
  { image: 'teahouse-album-seats', title: '竹椅茶席' },
]

export const faqs = [
  {
    question: '乌龙街老茶馆在哪里？',
    answer: '本馆位于江西省南昌市南昌县三江镇乌龙街，邻近三江早酒文化街。您可以导航搜索“乌龙街老茶馆”，也可以先到三江早酒文化街，再根据当地指引前往。',
  },
  {
    question: '到茶馆喝茶需要提前预约吗？',
    answer: '日常喝茶可以直接到店。若是多人聚会、节假日或农历三、六、九赶集日，建议提前联系茶馆，了解座位情况，以便合理安排。',
  },
  {
    question: '茶馆除了喝茶，还提供餐饮服务吗？',
    answer: '茶馆提供餐食和茶点。聚餐或宴请请提前一天电话预约，可一并询问菜品。',
  },
  {
    question: '可以承接婚宴、寿宴、家宴等酒席吗？',
    answer: '可以预订婚宴、寿宴和家宴。请提前联系茶馆，告知日期、人数和用餐需求，方便安排桌席和菜单。',
  },
  {
    question: '茶馆场地可以租借或包场吗？',
    answer: '企业聚会、同学聚餐或文化活动，都可以电话咨询场地。来电时请告知活动日期和预计人数。',
  },
  {
    question: '茶馆适合多少人聚会？',
    answer: '茶馆有大堂茶席，也可安排聚餐桌席。多人聚会时，可以先来电告知人数，询问可用桌席。',
  },
  {
    question: '举办宴席可以自选菜单吗？',
    answer: '如有宴席需求，可提前与茶馆沟通菜品偏好、用餐人数及预算。支持定制菜单、套餐搭配及特殊饮食要求，食材当天采购，确保新鲜。',
  },
  {
    question: '三江镇什么时候赶集？',
    answer: '三江镇保留农历三、六、九赶集的传统。赶集日的三江早酒文化街通常更为热闹，适合感受当地早酒、集市与老街烟火氛围。建议合理安排出行时间。',
  },
  {
    question: '茶馆附近有什么值得体验的地方？',
    answer: '可以走访三江早酒文化街，体验当地的赶集文化、早酒早餐与特色风物，也可以了解三江镇的老街历史。周边还有后万古村等乡土文化资源。',
  },
  {
    question: '茶馆营业时间是几点？',
    answer: `营业时间为 ${hours}。节假日到访可提前来电。`,
  },
  {
    question: '茶馆附近方便停车吗？',
    answer: '方便，车位很多。',
  },
  {
    question: '如何咨询宴席或预订场地？',
    answer: '联系电话：',
    contact: { label: phone.replace(/\s/g, ''), href: phoneLink },
  },
]
