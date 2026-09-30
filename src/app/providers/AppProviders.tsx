import type { ReactNode } from 'react'
import { RouterProvider } from '../../shared/router/index.ts'
import { FavoritesProvider } from '../../features/favorites/index.ts'
import { PreferencesProvider } from '../../features/preferences/index.ts'

interface AppProvidersProps {
  children: ReactNode
}

/** Global state shared by every page. Add new app-wide providers here. */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <RouterProvider>
      <PreferencesProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </PreferencesProvider>
    </RouterProvider>
  )
}
