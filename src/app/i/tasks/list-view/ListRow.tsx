import type { ITaskResponse, TypeTaskFormState } from "@/types/task.types"
import type { Dispatch, SetStateAction } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTaskDebounce } from "../hooks/useTaskDebounce"
// import styles from "react-day-picker/style.css"
import React from 'react';
import cn from 'clsx'; // или 'clsx', если вы используете clsx
import styles from './ListView.module.scss'; // замените на актуальный путь
import { GripVertical, Loader, Trash } from "lucide-react";
import Checkbox from "@/components/ui/checkbox/Checkbox";
import { DatePicker } from "@/components/ui/task-edit/date-picker/DatePicker";
import { SingleSelect } from "../SingleSelect";
import { useDayPicker } from "react-day-picker";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { TransparentField } from "@/components/ui/fields/TransparentField";

interface IListRow {
    item: ITaskResponse
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRow({item, setItems}: IListRow) {
    
    const {register, watch, control} = useForm<TypeTaskFormState>({
        defaultValues: {  
            title: item.title,
            isCompleted: item.isCompleted,  
            createdAt: item.createdAt,
            priority: item.priority
        }
    })

    useTaskDebounce({watch, itemId: item.id})

    const {deleteTask, isDeletePending} = useDeleteTask()

    return (
        <div
            className={cn(
                styles.row,
                watch('isCompleted') ? styles.completed : '',
                'animation-opacity px-5 py-3'
            )}
        >
            <div>
                <span
                    className="inline-flex items-center gap-2.5 w-full"
                >
                    <button aria-describedby="todo-item">
                        <GripVertical className={styles.grip} />
                    </button>

                    <Controller 
                        control={control}
                        name='isCompleted'
                        render={({ field: {value, onChange }}) => (
                            <Checkbox 
                                onChange={onChange}
                                checked={value}
                            />
                        )}
                    />
                <TransparentField {...register('title')} />
                </span>
            </div>
            <div>
                <Controller 
                    control={control}
                    name='createdAt'
                    render={({ field: {value, onChange }}) => (
                        <DatePicker 
                            onChange={onChange}      
                            value={value || ''}
                        />
                    )}
                />
            </div>
            <div className="capitalize">
                <Controller 
                    control={control}
                    name='priority'
                    render={({ field: {value, onChange }}) => (
                        <SingleSelect 
                            data={['low', 'medium', 'high'].map(item => ({
                                label: item,
                                value: item
                            }))}
                            onChange={onChange}
                            value={value || ''}
                        />
                    )}
                />
            </div>
            <div>
                <button
                    onClick={() => item.id ? deleteTask(item.id) : setItems(prev => prev?.filter(item => item.id !== item.id))} // prev => prev?.slice(0, -1)
                >
                    {isDeletePending ? <Loader size={15}/> : <Trash size={15}/>}
                </button>
            </div>
        </div>
    )
}