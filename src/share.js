import { shareDescriptions } from '@content/site'

export const shareBase = new URL(import.meta.env.BASE_URL, window.location.origin)

export function chooseShareDescription(previousIndex) {
  if (previousIndex === undefined) return Math.floor(Math.random() * shareDescriptions.length)
  return (previousIndex + 1 + Math.floor(Math.random() * (shareDescriptions.length - 1))) % shareDescriptions.length
}

let activeIndex

export function updateBrowserShareMetadata() {
  activeIndex = chooseShareDescription(activeIndex)
  const description = shareDescriptions[activeIndex]
  for (const tag of document.querySelectorAll('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]')) {
    tag.content = description
  }
  for (const tag of document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]')) {
    tag.content = new URL(tag.content, shareBase).href
  }
}
