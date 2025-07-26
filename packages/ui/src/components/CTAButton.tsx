import React, { forwardRef } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
  className?: string
}

interface ButtonAsButtonProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button'
  href?: never
}

interface ButtonAsLinkProps extends BaseButtonProps {
  as: 'link'
  href: string
  target?: string
  rel?: string
}

type CTAButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary-hover focus:ring-primary'
    case 'secondary':
      return 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary'
    case 'outline':
      return 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary'
    case 'ghost':
      return 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600'
    default:
      return ''
  }
}

const getSizeClasses = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm'
    case 'md':
      return 'px-4 py-2 text-base'
    case 'lg':
      return 'px-6 py-3 text-lg'
    default:
      return ''
  }
}

export const CTAButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CTAButtonProps
>((props, ref) => {
  const {
    as = 'button',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    className = '',
    ...restProps
  } = props

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${getVariantClasses(variant)}
    ${getSizeClasses(size)}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim()

  const content = (
    <>
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon && <span className="mr-2">{leftIcon}</span>
      )}
      {children}
      {rightIcon && !loading && <span className="ml-2">{rightIcon}</span>}
    </>
  )

  if (as === 'link') {
    const { href, target, rel, ...linkProps } = restProps as ButtonAsLinkProps
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...linkProps}
      >
        {content}
      </Link>
    )
  }

  const buttonProps = restProps as ButtonAsButtonProps
  return (
    <button
      className={baseClasses}
      disabled={loading || buttonProps.disabled}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...buttonProps}
    >
      {content}
    </button>
  )
})

CTAButton.displayName = 'CTAButton'

// Icon Button variant
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  'aria-label': string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'ghost', size = 'md', className = '', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-3',
    }

    const buttonClasses = `
      inline-flex items-center justify-center rounded-lg
      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${getVariantClasses(variant)}
      ${sizeClasses[size]}
      ${className}
    `.trim()

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    )
  }
)

IconButton.displayName = 'IconButton'