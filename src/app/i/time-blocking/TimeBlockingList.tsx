import { Loader } from "@/components/ui/Loader"
import { useTimeBlockDnd } from "./hooks/useTimeBlockDnd"
import { useTimeBlocks } from "./hooks/useTimeBlocks"
import { calcHoursLeft } from "./calc-hours-left"

import styles from './TimeBlock.module.scss'
import { closestCenter, DndContext } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { TimeBlock } from "./TimeBlock"

export function TimeBlockingList() {
    const { items, setItems, isLoading } = useTimeBlocks()
    const { handleDrugEnd, sensors } = useTimeBlockDnd(items, setItems)

    if (isLoading) return <Loader />

    const {hoursLeft} = calcHoursLeft(items)

    return (
        <div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDrugEnd}
            >
                <div className={styles.list}>
                    <SortableContext items={items || []} strategy={verticalListSortingStrategy}>
                        {items?.length ? (
                            items?.map(item => (
                                <TimeBlock 
                                    key={item.id}
                                    item={item}
                                />
                            ))
                        ) : (
                            <div>Add the first time-block on the right form</div>
                        )}
                    </SortableContext>
                </div>
            </DndContext>
            <div>
                {hoursLeft > 0
                ? `${hoursLeft} hours out of 24 left for sleeping`
                : 'You have exceeded the limit for sleeping'
                }
            </div>
        </div>
    )

}