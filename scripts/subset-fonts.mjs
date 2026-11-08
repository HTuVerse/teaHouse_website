import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import subsetFont from 'subset-font'

const srcDir = fileURLToPath(new URL('../src/', import.meta.url))
const contentDir = fileURLToPath(new URL('../content/', import.meta.url))
const outputDir = join(srcDir, 'assets', 'fonts')
const extensions = new Set(['.vue', '.js', '.html'])
const files = (await Promise.all(
  [srcDir, contentDir].map((dir) => readdir(dir, { recursive: true, withFileTypes: true })),
)).flat()
const sources = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  ...files
    .filter((file) => file.isFile() && extensions.has(extname(file.name)))
    .map((file) => readFile(join(file.parentPath, file.name), 'utf8')),
])

// Keep printable ASCII for form inputs as well as all characters in site copy.
const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(0x20 + i)).join('')
const glyphs = [...new Set(ascii + sources.join('').replace(/\s/gu, ''))].sort().join('')

await mkdir(outputDir, { recursive: true })
await Promise.all([
  ['500', 'regular'],
  ['700', 'bold'],
].map(async ([weight, name]) => {
  const source = import.meta.resolve(`@fontsource/lxgw-wenkai/files/lxgw-wenkai-latin-${weight}-normal.woff2`)
  const font = await readFile(new URL(source))
  const subset = await subsetFont(font, glyphs, { targetFormat: 'woff2' })
  await writeFile(join(outputDir, `wenkai-${name}.woff2`), subset)
}))
