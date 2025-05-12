'use client'

import { DragDropContext } from "@hello-pangea/dnd"
import { useTaskDnd } from "../hooks/useTaskDnd"
import { useTasks } from "../hooks/useTasks"
import styles from './KanbanView.module.scss'
import { COLUMNS } from "../columns.data"
import { KanbanColumn } from "./KanbanColumn"

export default function KanbanView() {
    const {items, setItems} = useTasks()

    const { onDragEnd } = useTaskDnd()

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.board}>
                    {COLUMNS.map(column => (
                        <KanbanColumn 
                            items={items}
                            label={column.label}
                            value={column.value}
                            setItems={setItems}
                            key={column.value}
                        />
                    ))}
            </div>
        </DragDropContext>
    )
}