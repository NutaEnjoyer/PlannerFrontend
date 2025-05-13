import { timeBlockService } from "@/services/time-block.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteTimeBlock(itemId: string) { 
    const queryClient = useQueryClient()

    const { mutate: deleteTimeBlock, isPending: isDeleting } = useMutation({
        mutationKey: ["delete time-block", itemId],
        mutationFn: () => timeBlockService.deleteTimeBlock(itemId),
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ["time-blocks"]})
        }
    })

    return { deleteTimeBlock, isDeleting }
}
