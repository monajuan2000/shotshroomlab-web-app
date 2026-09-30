import { useEffect } from 'react'
import { APP_CONFIG } from '../config/appConfig.ts'
import { useMessages } from '../i18n/hooks.ts'
import { documentTitleMessages } from './useDocumentTitle.messages.ts'

export function useDocumentTitle(title?: string) {
  const { tagline } = useMessages(documentTitleMessages)

  useEffect(() => {
    document.title = title ? `${title} · ${APP_CONFIG.name}` : `${APP_CONFIG.name} · ${tagline}`
  }, [title, tagline])
}
