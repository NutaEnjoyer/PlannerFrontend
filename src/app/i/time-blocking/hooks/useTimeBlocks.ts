import { timeBlockService } from "@/services/time-block.service"
import { ITimeBlockResponse } from "@/types/time-block.types"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


export const useTimeBlocks = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["time-blocks"],
        queryFn: () => timeBlockService.getTimeBlocks()
    })

    const [items, setItems] = useState<ITimeBlockResponse[] | undefined>(data?.data)

    useEffect(() => {
        setItems(data?.data)
    }, [data?.data])

    return { items, setItems, isLoading }
}