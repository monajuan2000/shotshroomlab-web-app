import { ErrorBoundary, ErrorState } from '../shared/components/index.ts'
import { useMessages } from '../shared/i18n/index.ts'
import { Routes } from '../shared/router/index.ts'
import { AgeGate } from '../features/age-gate/index.ts'
import { LanguageToggle } from '../features/preferences/index.ts'
import { appMessages } from './App.messages.ts'
import { RootLayout } from './layouts/RootLayout/index.ts'
import { AppProviders } from './providers/AppProviders.tsx'
import { APP_ROUTES } from './routes.ts'

function CrashFallback() {
  const messages = useMessages(appMessages)
  return <ErrorState description={messages.crashDescription} />
}

export function App() {
  return (
    // Providers wrap the boundary so the crash screen is translated too. They
    // only read validated storage, so they are not expected to throw.
    <AppProviders>
      <ErrorBoundary fallback={<CrashFallback />}>
        <AgeGate toolbar={<LanguageToggle />}>
          <RootLayout>
            <Routes routes={APP_ROUTES} />
          </RootLayout>
        </AgeGate>
      </ErrorBoundary>
    </AppProviders>
  )
}
