import { pomodoroService } from "@/services/pomodoro.service"
import { TypePomodoroRoundFormState } from "@/types/pomodoro.types"
import { useQueryClient, useMutation } from "@tanstack/react-query"


export function useUpdateRound() {
    const queryClient = useQueryClient()

    const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
        mutationKey: ['update round'],
        mutationFn: ({
            id,
            data
        } : {
            id: string,
            data: TypePomodoroRoundFormState
        }) => pomodoroService.updateRound(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get today session'] })
        }
    })

    return { updateRound, isUpdateRoundPending }
}