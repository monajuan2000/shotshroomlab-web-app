import { Suspense, useEffect, useRef, type ReactNode } from 'react'
import { ErrorBoundary, ErrorState, LoadingState } from '../../../shared/components/index.ts'
import { useLocation } from '../../../shared/router/index.ts'
import { SiteFooter } from '../../../widgets/SiteFooter/index.ts'
import { SiteHeader } from '../../../widgets/SiteHeader/index.ts'
import styles from './RootLayout.module.css'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  // Hash navigation keeps the scroll position, so start every page at the top.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  function skipToContent() {
    mainRef.current?.focus()
  }

  return (
    <div className={styles.shell}>
      <button type="button" className={styles.skipLink} onClick={skipToContent}>
        Skip to content
      </button>
      <SiteHeader />
      <main ref={mainRef} className={styles.main} tabIndex={-1}>
        {/* Keyed by pathname so an error on one page does not stick to the next one. */}
        <ErrorBoundary key={pathname} fallback={<ErrorState />}>
          <Suspense fallback={<LoadingState />}>{children}</Suspense>
        </ErrorBoundary>
      </main>
      <SiteFooter />
    </div>
  )
}
