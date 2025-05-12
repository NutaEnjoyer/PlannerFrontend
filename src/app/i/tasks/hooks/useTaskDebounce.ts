import { ITaskResponse, TypeTaskFormState } from "@/types/task.types";
import debounce from "lodash.debounce";
import { useCallback, useEffect } from "react";
import { useCreateTask } from "./useCreateTask";
import { useDeleteTask } from "./useDeleteTask";
import { useUpdateTask } from "./useUpdateTask";
import { UseFormWatch } from "react-hook-form";

interface IUseTaskDebounce {
    watch: UseFormWatch<TypeTaskFormState>
    itemId: string
}

export function useTaskDebounce({watch, itemId} : IUseTaskDebounce): void{
    
    const { createTask } = useCreateTask()
    const { updateTask } = useUpdateTask()
    const { deleteTask, isDeletePending } = useDeleteTask()

    const debounceCreateTask = useCallback(
        debounce((formData: TypeTaskFormState) => {
            console.log('creating')
            createTask(formData)
        }, 1000),
        []
    )

    const debounceUpdateTask = useCallback(
        debounce((formData: TypeTaskFormState) => {
            console.log('updating')
            updateTask({id: itemId, data: formData})
        }, 1000),
        []
    )

    useEffect(() => {
        const {unsubscribe} = watch(formData => {
            if (itemId && itemId !== 'new') {
                debounceUpdateTask({
                    ...formData,
                    priority: formData.priority || undefined
                })
            } else {
                debounceCreateTask(formData)
            }
        })
        return () => {
            unsubscribe()
        }
    }, [watch(), debounceCreateTask, debounceUpdateTask, itemId])
}