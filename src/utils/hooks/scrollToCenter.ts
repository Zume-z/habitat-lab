export function scrollToCenter(element: HTMLElement | null): void {
  if (element) {
    const elementRect = element.getBoundingClientRect()
    const absoluteElementTop = elementRect.top + window.scrollY
    const middle = absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2
    window.scrollTo({
      top: middle,
      behavior: 'smooth',
    })
  }
}
