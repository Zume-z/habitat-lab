import '@testing-library/jest-dom/extend-expect'

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null
  readonly rootMargin: string = '0px'
  readonly thresholds: ReadonlyArray<number> = [0]
  private callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback
  }

  observe(target: Element): void {
    setTimeout(() => this.callback([{ isIntersecting: true, target: target } as IntersectionObserverEntry], this), 50)
  }

  unobserve(target: Element): void {}
  disconnect(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

global.IntersectionObserver = MockIntersectionObserver
