import { ITaskResponse } from "@/types/task.types"
import { Draggable, DraggableProvided, DraggableRubric, DraggableStateSnapshot, Droppable } from "@hello-pangea/dnd"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { ListRow } from "./ListRow"
import { FILTERS } from "../columns.data"
import { filterTasks } from "../filterTasks"
import  styles from './ListView.module.scss'
import { ListAddRowInput } from "./ListAddRowInput"

interface IListRowParent {
    label: string 
    value: string
    items: ITaskResponse[] | undefined
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function ListRowParent({label, value, items, setItems}: IListRowParent) {
    return (
        <Droppable droppableId={value}>
            {provider => (
                <div 
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                >
                    <div className={styles.colHeading}>
                        <div className='w-full'>{label}</div>
                    </div>
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
                                    <ListRow
                                        key={item.id}
                                        item={item}
                                        setItems={setItems}
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))}

                    {provider.placeholder}

                    {value !== 'completed' && !items?.some(item => item.id) && (
                        <ListAddRowInput 
                            setItems={setItems}
                            filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
                        />
                    )}
                </div>
            )}
        </Droppable>
    )
}