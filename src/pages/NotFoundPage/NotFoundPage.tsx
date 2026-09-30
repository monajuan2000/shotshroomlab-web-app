import { ButtonLink, EmptyState } from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle.ts'
import { useMessages } from '../../shared/i18n/index.ts'
import { notFoundPageMessages } from './NotFoundPage.messages.ts'

export function NotFoundPage() {
  const messages = useMessages(notFoundPageMessages)
  useDocumentTitle(messages.title)

  return (
    <EmptyState
      title={messages.title}
      description={messages.description}
      actions={<ButtonLink to={paths.home()}>{messages.goHome}</ButtonLink>}
    />
  )
}
