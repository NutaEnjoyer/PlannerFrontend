import { ReactNode } from "react";
import { DateLibOptions, DateLib } from "react-day-picker";

export interface IDateFormatterProps {
    month: Date
    options?: DateLibOptions
    dateLib?: DateLib
}


export type DateFormatter = (({month, options, dateLib} : IDateFormatterProps) => string) | undefined