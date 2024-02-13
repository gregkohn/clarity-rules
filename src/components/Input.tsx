import type { InputHTMLAttributes, PropsWithChildren } from 'react'
import cx from 'classnames'

type InputProps = PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> & {
  inputClassName?: string
  widthClassName?: string
  label: string
}

const Input = ({
  className,
  inputClassName,
  widthClassName = 'w-200',
  label,
  id,
  type = 'text',
  disabled,
  ...props
}: InputProps) => {
  return (
    <div className={cx(className, widthClassName)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        className={cx(
          inputClassName,
          'rounded-md border py-8 px-6 w-full',
          'focus:outline-none focus:ring-2 focus:ring-brand'
        )}
        type={type}
        disabled={disabled}
        {...props}
      />
    </div>
  )
}

export default Input
