import { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  action?: ReactNode
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Card = ({ children, className = '', ...props }: CardProps) => (
  <div
    className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
)

const CardHeader = ({ children, action, className = '', ...props }: CardHeaderProps) => (
  <div
    className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 ${className}`}
    {...props}
  >
    <div>{children}</div>
    {action && <div className="ml-4 shrink-0">{action}</div>}
  </div>
)

const CardTitle = ({ children, className = '', ...props }: CardTitleProps) => (
  <h3 className={`text-base font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
)

const CardBody = ({ children, className = '', ...props }: CardBodyProps) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
)

const CardFooter = ({ children, className = '', ...props }: CardFooterProps) => (
  <div
    className={`px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl ${className}`}
    {...props}
  >
    {children}
  </div>
)

Card.Header = CardHeader
Card.Title = CardTitle
Card.Body = CardBody
Card.Footer = CardFooter

export default Card
