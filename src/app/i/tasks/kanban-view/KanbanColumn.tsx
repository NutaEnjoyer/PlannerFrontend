import { ITaskResponse } from "@/types/task.types"
import { Draggable, DraggableProvided, DraggableRubric, DraggableStateSnapshot, Droppable } from "@hello-pangea/dnd"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { KanbanCard } from "./KanbanCard"
import { FILTERS } from "../columns.data"
import { filterTasks } from "../filterTasks"
import  styles from './KanbanView.module.scss'
import { KanbanAddCardInput } from "./KanbanAddCardInput"

interface IKanbanColumn {
    label: string 
    value: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanColumn({label, value, items, setItems}: IKanbanColumn) {
    return (
        <Droppable droppableId={value}>
            {provider => (
                <div 
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                >
                    <div className={styles.column}>
                        <div className={styles.columnHeading}>{label}</div>
                        {filterTasks(items, value)
                        ?.map((item, index) => (
                            <Draggable
                                key={item.id}
                                index={index}
                                draggableId={item.id}
                            >
                                {provider => (
                                    <div
                                        ref={provider.innerRef}
                                        {...provider.draggableProps}
                                        {...provider.dragHandleProps}
                                    >
                                        <KanbanCard
                                            key={item.id}
                                            item={item}
                                            setItems={setItems}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        {provider.placeholder}

                        {value !== 'completed' && (
                            <KanbanAddCardInput 
                                setItems={setItems}
                                filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
                            />
                        )}
                    </div>
                </div>
            )}
        </Droppable>
    )
}