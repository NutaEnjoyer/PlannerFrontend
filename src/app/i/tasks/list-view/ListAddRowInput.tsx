import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'
import type { Dispatch, SetStateAction } from 'react'
import styles from './ListView.module.scss'

interface IListAddRowInput {
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
    filterDate?: string
}

export function ListAddRowInput({ setItems, filterDate }: IListAddRowInput) {

    const addRow = () => {
        setItems(prev => {
            if (!prev) return

            return [
                ...prev,
                {
                    id: '',
                    title: '',
                    isCompleted: false,
                    createdAt: filterDate
                }
            ]
        })
    }

    return (
        <div
            className={styles.addRow}
        >
            <button
                onClick={addRow}
                className="italic opacity-40 text-sm"
            >
                Add task...
            </button>
        </div>
    )
}