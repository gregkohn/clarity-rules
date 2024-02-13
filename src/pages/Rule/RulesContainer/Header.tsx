import { PlayCircleIcon } from '@heroicons/react/20/solid'
import cx from 'classnames'
import { PropsWithChildren } from 'react'

const Header = ({
  children,
  iconClassName = 'fill-brand',
}: PropsWithChildren<{ iconClassName?: string }>) => {
  return (
    <h2 className="p-16 border-b border-gray-100 flex items-center gap-16 bg-white rounded-t-md">
      <PlayCircleIcon className={cx(iconClassName, 'w-20 h-20')} />
      {children}
    </h2>
  )
}

export default Header
