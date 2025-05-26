import type { IBase } from "./base.types"

export enum EnumTaskPriority { 
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface ITaskResponse extends IBase {
    title: string
    description?: string
    priority?: EnumTaskPriority
    isCompleted: boolean
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>

