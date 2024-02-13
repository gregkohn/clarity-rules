import { forwardRef, type PropsWithChildren } from 'react'

import cx from 'classnames'
import * as RadixSelect from '@radix-ui/react-select'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

const SelectItem = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{ className?: string } & RadixSelect.SelectItemProps>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      className={cx(
        className,
        'p-8 rounded-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand m-4',
        'state-checked:bg-gray-100/80',
        'hover:bg-gray-100/50'
      )}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  )
})

export type SelectItem = {
  value: string
  label: string
}

type SelectProps = RadixSelect.SelectProps & {
  items: SelectItem[]
  triggerClassName?: string
  contentClassName?: string
  error?: boolean
} & Pick<RadixSelect.SelectValueProps, 'placeholder'> &
  Pick<RadixSelect.SelectTriggerProps, 'aria-label'>

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value,
      items,
      placeholder,
      triggerClassName,
      contentClassName,
      error,
      'aria-label': ariaLabel,
      ...props
    },
    forwardedRef
  ) => (
    <RadixSelect.Root value={value} {...props}>
      <RadixSelect.Trigger
        className={cx(
          triggerClassName,
          'relative border border-gray-100 py-8 pl-12 pr-32 rounded-md',
          {
            'ring ring-error': error,
          }
        )}
        aria-label={ariaLabel}
        ref={forwardedRef}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon asChild>
          <ChevronDownIcon className="w-16 h-16 fill-current absolute right-4 top-[calc(50%-8px)]" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          // position="popper"
          // sideOffset={8}
          className={cx(
            contentClassName,
            'border border-gray-100 bg-white shadow-md p-4 rounded-md w-full'
          )}
        >
          <RadixSelect.Viewport>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
)

export default Select
