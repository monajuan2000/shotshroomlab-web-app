import { ButtonLink, EmptyState } from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle.ts'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <EmptyState
      title="Page not found"
      description="The page you are looking for does not exist or has moved."
      actions={<ButtonLink to={paths.home()}>Go to the home page</ButtonLink>}
    />
  )
}
