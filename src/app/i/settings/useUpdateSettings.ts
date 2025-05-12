import { userService } from "@/services/user.service"
import { TypeUserForm } from "@/types/auth.types"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useUpdateSettings() {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey: ['update profile'],
        mutationFn: (data: TypeUserForm) => userService.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profile']
            })
            toast.success('Profile updated successfully')
        },
        onError: (error: any) => {
            toast.error(error.response.data.message)
        }
    })

    return { mutate, isPending }
}