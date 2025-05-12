import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"


type TypeOut = {
    ref: any
    isShow: boolean
    setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsVisiable: boolean): TypeOut => {
    const [isShow, setIsShow] = useState(initialIsVisiable)
    const ref = useRef<HTMLElement>(null)

    const handlerClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handlerClickOutside, true)
        return () => {
            document.removeEventListener('click', handlerClickOutside, true)
        }
    })

    return { ref, isShow, setIsShow }
}