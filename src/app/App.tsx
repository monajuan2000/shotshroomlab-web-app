import { ErrorBoundary, ErrorState } from '../shared/components/index.ts'
import { Routes } from '../shared/router/index.ts'
import { AgeGate } from '../features/age-gate/index.ts'
import { RootLayout } from './layouts/RootLayout/index.ts'
import { AppProviders } from './providers/AppProviders.tsx'
import { APP_ROUTES } from './routes.ts'

export function App() {
  return (
    <ErrorBoundary fallback={<ErrorState description="Please reload the page." />}>
      <AppProviders>
        <AgeGate>
          <RootLayout>
            <Routes routes={APP_ROUTES} />
          </RootLayout>
        </AgeGate>
      </AppProviders>
    </ErrorBoundary>
  )
}
