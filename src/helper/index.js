export function scrollToAnchor(anchorName) {
  if (anchorName) {
    // 找到锚点
    console.log(anchorName)
    let anchorElement = document.getElementById(anchorName)
    // 如果对应id的锚点存在，就跳转到锚点
    if (anchorElement) {
      anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }
}
