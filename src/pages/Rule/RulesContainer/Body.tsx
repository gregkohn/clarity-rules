import cx from 'classnames'
import { PropsWithChildren } from 'react'

const Body = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <fieldset className={cx(className, 'p-16 bg-white last:rounded-b-md')}>
      {children}
    </fieldset>
  )
}

export default Body
