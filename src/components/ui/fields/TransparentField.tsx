import cn from 'clsx'
import { forwardRef } from 'react'


type TypeTransparentField = React.InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<HTMLInputElement, TypeTransparentField>(
    ({ className, ...rest}, ref) => {
        return (
            <input
                {...rest}
                ref={ref}
                className={cn(
                    'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full',
                    className
                )}
            />
        )
    }
)

TransparentField.displayName = 'TransparentField'