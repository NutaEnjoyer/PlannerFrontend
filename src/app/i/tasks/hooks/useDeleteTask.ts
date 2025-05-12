import { taskService } from "@/services/task.service"
import { TypeTaskFormState } from "@/types/task.types"
import { useQueryClient, useMutation } from "@tanstack/react-query"


export function useDeleteTask() { 
    const queryClient = useQueryClient()

    const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
        mutationKey: ['delete task'],
        mutationFn: (id: string) => taskService.deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })

    return { deleteTask, isDeletePending }
}