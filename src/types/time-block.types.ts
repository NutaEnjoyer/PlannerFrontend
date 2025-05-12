import { IBase } from "./root.types"

export interface ITimeBlockResponse extends IBase {
    name: string
    color?: string
    duration: string
    order: number
}

export type TypeTimeBlockFormState = Partial<Omit<ITimeBlockResponse, 'createdAt' | 'updatedAt'>>
