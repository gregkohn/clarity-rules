import cx from 'classnames'
import { PropsWithChildren } from 'react'

const Root = ({
  className,
  children,
  isValid,
}: PropsWithChildren<{ className?: string; isValid?: boolean }>) => {
  return (
    <section
      className={cx(
        className,
        'border rounded-md border-gray-100 shadow-sm relative text-sm',
        'before:absolute before:-inset-5 before:rounded-md before:-z-10 before:bg-brand-light z-0 before:transition before:duration-200',
        {
          'before:opacity-0 before:scale-95': !isValid,
        }
      )}
    >
      {children}
    </section>
  )
}

export default Root
