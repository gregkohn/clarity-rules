import cx from 'classnames'
import { PropsWithChildren } from 'react'

const Footer = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={cx(
        className,
        'bg-gray-50 p-16 flex gap-16 items-center border-t border-gray-100 rounded-b-md text-gray-700'
      )}
    >
      {children}
    </div>
  )
}

export default Footer
