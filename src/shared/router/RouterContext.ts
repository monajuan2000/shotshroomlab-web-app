import { createContext } from 'react'
import type { AppLocation, RouteParams } from './location.ts'

export interface NavigateOptions {
  replace?: boolean
}

export type NavigateFunction = (to: string, options?: NavigateOptions) => void

export interface RouterContextValue {
  location: AppLocation
  navigate: NavigateFunction
  /** Reads the location at call time, useful inside delayed callbacks. */
  getCurrentLocation: () => AppLocation
}

export const RouterContext = createContext<RouterContextValue | null>(null)

export const RouteParamsContext = createContext<RouteParams>({})
