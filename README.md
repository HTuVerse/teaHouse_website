# teaHouse_website

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Test on a Phone over Wi-Fi

```sh
npm run dev:lan
```

Connect your phone and computer to the same Wi-Fi, then open the `Network` URL printed by Vite on your phone.

局域网 HTTP 地址可以测试页面布局。测试网页按钮唤起手机系统分享，请使用公开的 HTTPS 地址。

### Fonts

Body text uses a self-hosted LXGW WenKai subset. Titles marked with `.brush` keep the Ma Shan Zheng font. Both are served with the site, and system fonts cover any missing glyphs.

The dev and build commands generate regular and bold WOFF2 files from the characters used in `index.html`, `src/`, and `content/`. If you add new text while Vite is running, run `npm run fonts:subset` to refresh the subsets. Font licenses are in `public/font-licenses/`.

### 网站内容

页面内容按用途维护在根目录的 `content/`，组件通过 `@content/文件名` 引用。

| 文件 | 维护内容 |
| --- | --- |
| `content/site.js` | 店名、地址、营业时间、联系电话、导航、分享文案 |
| `content/home.js` | 首页标题、招牌茶单、茶馆空间、三江文化、茶客评价 |
| `content/menu.js` | 菜单标题、茶饮、早餐、茶点、推荐搭配 |
| `content/activities.js` | 活动及报名信息、茶馆相册、常见问题 |
| `content/memory.js` | 乌龙街故事、地方风物、游览路线 |
| `content/guide.js` | 门店信息、交通方式、周边去处 |
| `content/banquet.js` | 多个页面共用的宴席介绍及服务项目 |

改版式或交互时看 `src/`，替换图片时看 `public/media/`。按钮、表单提示等依附于交互的短文案随组件维护。

### Compile and Minify for Production

```sh
npm run build
```

### 分享卡片

手机或平板的页面右上角显示「分享」。在支持系统分享的浏览器里，点击会随机挑选一条欢迎语（连续两次不重复），并直接打开系统分享面板。微信内置浏览器没有提供系统分享时，可从右上角「···」选择「转发给朋友」。收件人打开分享链接后会回到所分享的页面。浏览器菜单分享原始网址时，网页会在进入页面时随机更新预览信息；如果接收端直接抓取网址，则读到静态 HTML 里的默认文案。

正式构建前，在 `.env.production.local` 或部署环境中设置 `SITE_URL=https://你的正式域名`，让分享平台能从卡片标签读到 Logo 的完整 HTTPS 地址。部署完整的 `dist/`，确保 `/share/*.html` 和 Logo 文件可以直接访问，其余页面路径继续走站点的 SPA 回退规则。实际预览样式由接收链接的应用决定。
