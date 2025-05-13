'use client'

import { authService } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function LogoutButton() {
    const router = useRouter()

    const {mutate : logout} = useMutation({
        mutationKey: ['logout'],
        mutationFn: () => authService.logout(),
        onSuccess: () => router.push('/auth')
    })
    return (
        <div className='absolute top-3 right-3'>
            <button 
                className="opacity-20 hover:opacity-100 transition-opacity duration-300"
                onClick={() => logout()}
            >
                <LogOut size={20} />
            </button>
        </div>
    )
}