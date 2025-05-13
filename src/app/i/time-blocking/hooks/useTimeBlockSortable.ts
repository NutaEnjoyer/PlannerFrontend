
import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CSSProperties } from "react";
import { CSS } from '@dnd-kit/utilities'

export function useTimeBlockSortable(id: UniqueIdentifier) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const style: CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition
	}

    return { 
        attributes,
        listeners,
        setNodeRef,
        style
    }
}
