import React, { forwardRef } from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      containerClassName = '',
      className = '',
      required,
      ...props
    },
    ref
  ) => {
    const inputClasses = `
      w-full px-3 py-2 border rounded-lg text-gray-900 
      focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
      transition-colors
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
      ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
      ${props.disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
      ${className}
    `.trim()

    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined
            }
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p id={`${props.id}-hint`} className="mt-1 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

InputField.displayName = 'InputField'

// Textarea variant
interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  containerClassName?: string
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    {
      label,
      error,
      hint,
      containerClassName = '',
      className = '',
      required,
      ...props
    },
    ref
  ) => {
    const textareaClasses = `
      w-full px-3 py-2 border rounded-lg text-gray-900
      focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
      transition-colors resize-none
      ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
      ${props.disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
      ${className}
    `.trim()

    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={textareaClasses}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined
          }
          {...props}
        />
        
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p id={`${props.id}-hint`} className="mt-1 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

TextareaField.displayName = 'TextareaField'