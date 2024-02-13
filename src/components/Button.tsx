import type { ButtonHTMLAttributes, FC, PropsWithChildren, Ref } from 'react'
import { forwardRef } from 'react'
import cx from 'classnames'

type ButtonBaseProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
> & {
  size?: 'small' | 'medium' | 'large'
  type?: 'button' | 'submit'
  startIcon?: FC<{ className?: string }>
  startIconClassName?: string
  endIcon?: FC<{ className?: string }>
  endIconClassName?: string
  srText?: string
  omitPaddingClassnames?: boolean
}

const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      className,
      children,
      size = 'medium',
      type = 'button',
      startIcon: StartIcon,
      startIconClassName,
      endIcon: EndIcon,
      endIconClassName,
      srText,
      omitPaddingClassnames,
      ...props
    },
    ref
  ) => {
    const iconClassName = cx({
      'w-16 h-16': size === 'small' || size === 'medium',
      'w-20 h-20': size === 'large',
    })

    const paddingClassNames = omitPaddingClassnames
      ? ''
      : cx({
          'py-6 px-8': size === 'small' && children,
          'px-12 py-8': size === 'medium' && children,
          'p-12': size === 'large' && children,
          'p-6': size === 'small' && !children,
          'p-8': size === 'medium' && !children,
          'p-10': size === 'large' && !children,
        })

    const allClassNames = cx(
      className,
      'rounded-md whitespace-nowrap',
      'disabled:cursor-not-allowed',
      paddingClassNames,
      {
        'text-14': size === 'small',
        'text-16': size === 'medium',
        'text-18': size === 'large',
        'flex items-center gap-8': !!StartIcon || !!EndIcon,
      }
    )

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={allClassNames}
        type={type}
        {...(props as ButtonBaseProps)}
      >
        {StartIcon ? (
          <StartIcon
            className={cx(iconClassName, startIconClassName)}
            aria-hidden="true"
          />
        ) : null}
        {children}
        {srText && !children ? <span className="sr-only">{srText}</span> : null}
        {EndIcon ? (
          <EndIcon
            className={cx(iconClassName, endIconClassName, 'ml-auto')}
            aria-hidden="true"
          />
        ) : null}
      </button>
    )
  }
)

ButtonBase.displayName = 'Button'

const PrimaryButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ButtonBase
        ref={ref}
        className={cx(
          className,
          'bg-brand text-white shadow-sm',
          'hover:bg-brand-dark'
        )}
        {...props}
      >
        {children}
      </ButtonBase>
    )
  }
)

PrimaryButton.displayName = 'PrimaryButton'

const SecondaryButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ButtonBase
        ref={ref}
        className={cx(
          className,
          'border border-gray-100 shadow-sm',
          '[&:not(:disabled):hover]:bg-gray-50',
          'disabled:text-gray-300'
        )}
        {...props}
      >
        {children}
      </ButtonBase>
    )
  }
)

SecondaryButton.displayName = 'SecondaryButton'

const TertiaryButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, children, size = 'medium', ...props }, ref) => {
    return (
      <ButtonBase
        ref={ref}
        className={cx(
          className,
          'text-brand',
          '[&:not(:disabled):hover]:text-brand-dark',
          'disabled:text-brand/50'
        )}
        omitPaddingClassnames
        size={size}
        {...props}
      >
        {children}
      </ButtonBase>
    )
  }
)

TertiaryButton.displayName = 'TertiaryButton'

export type ButtonProps = ButtonBaseProps & {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', ...props }, ref) => {
    switch (variant) {
      case 'primary':
        return <PrimaryButton ref={ref} {...props} />
      case 'secondary':
        return <SecondaryButton ref={ref} {...props} />
      case 'tertiary':
        return <TertiaryButton ref={ref} {...props} />
    }
  }
)

Button.displayName = 'Button'

export default Button
