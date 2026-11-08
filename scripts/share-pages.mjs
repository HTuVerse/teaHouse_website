import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { shareDescriptions, shareImagePath, sharePagePath, shareTitle, siteName } from '../content/site.js'

function shareMetadata(description, image) {
  return [
    ['name', 'description', description],
    ['property', 'og:type', 'website'],
    ['property', 'og:locale', 'zh_CN'],
    ['property', 'og:title', shareTitle],
    ['property', 'og:description', description],
    ['property', 'og:image', image],
    ['property', 'og:image:type', 'image/jpeg'],
    ['property', 'og:image:width', '800'],
    ['property', 'og:image:height', '800'],
    ['property', 'og:image:alt', siteName + ' Logo'],
    ['name', 'twitter:card', 'summary'],
    ['name', 'twitter:title', shareTitle],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', image],
  ]
}

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char])

function renderSharePage(description, image) {
  const meta = shareMetadata(description, image).map(([attr, name, content]) =>
    `<meta ${attr}="${name}" content="${escapeHtml(content)}">`).join('\n    ')
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(shareTitle)}</title>
    ${meta}
    <script>
      const home = new URL('../', location.href)
      const page = new URL(location.href).searchParams.get('page')
      let destination = home
      if (page) {
        try {
          const target = new URL(page, home)
          if (target.origin === home.origin && target.pathname.startsWith(home.pathname)
            && !target.pathname.startsWith(home.pathname + 'share/')) destination = target
        } catch {}
      }
      location.replace(destination.href)
    </script>
  </head>
  <body><a href="../">前往${escapeHtml(siteName)}</a></body>
</html>
`
}

export function sharePages(siteUrl) {
  let base
  let image
  const pages = new Map(shareDescriptions.map((description, index) => [sharePagePath(index), description]))

  function serveSharePages(server, getHtml) {
    server.middlewares.use(async (request, response, next) => {
      const path = request.url?.split('?')[0]
      const page = path?.startsWith(base) && path.slice(base.length)
      if (!pages.has(page) || !['GET', 'HEAD'].includes(request.method)) return next()
      try {
        const origin = new URL(`${request.socket.encrypted ? 'https' : 'http'}://${request.headers.host}`)
        const absoluteImage = new URL(base + shareImagePath, origin).href
        const html = await getHtml(page, absoluteImage)
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        response.end(request.method === 'HEAD' ? undefined : html)
      } catch (error) {
        next(error)
      }
    })
  }

  return {
    name: 'teahouse-share-pages',
    configResolved(config) {
      base = config.base
      image = siteUrl ? new URL(base + shareImagePath, siteUrl).href : base + shareImagePath
    },
    transformIndexHtml() {
      return [
        { tag: 'title', children: shareTitle, injectTo: 'head' },
        ...shareMetadata(shareDescriptions[0], image).map(([attr, name, content]) => ({
          tag: 'meta', attrs: { [attr]: name, content }, injectTo: 'head',
        })),
      ]
    },
    configureServer(server) {
      serveSharePages(server, (page, absoluteImage) =>
        renderSharePage(pages.get(page), siteUrl ? image : absoluteImage))
    },
    configurePreviewServer(server) {
      const output = resolve(server.config.root, server.config.build.outDir)
      serveSharePages(server, async (page, absoluteImage) => {
        const html = await readFile(resolve(output, page), 'utf8')
        return html.replaceAll(`content="${escapeHtml(base + shareImagePath)}"`, () =>
          `content="${escapeHtml(absoluteImage)}"`)
      })
    },
    generateBundle() {
      for (const [fileName, description] of pages) {
        this.emitFile({ type: 'asset', fileName, source: renderSharePage(description, image) })
      }
    },
  }
}
