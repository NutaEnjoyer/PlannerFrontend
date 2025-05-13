import { COLORS } from "@/constants/color.constants";
import { GanttChartSquare } from "lucide-react";
import Link from "next/link";
import { MENU } from "./menu.data";
import { MenuItem } from "./MenuItem";

export function Sidebar () {
    return (
        <aside
            className="border-r border-r-border h-full bg-sidebar flex flex-col justify-between"
        >
            <div>
                <Link
                    href='/'
                    className="flex gap-2.5 items-cente p-layout border-b border-b-border"
                >
                    <GanttChartSquare 
                        color={COLORS.primary}
                        size={38}
                    />
                    <span className='text-2xl font-bold relative'>
                        MAX Planner
                        <span className="absolute -top-1 -right-6 text-xs opacity-40 rotate-[18deg] font-normal">
                            beta
                        </span>
                    </span>
                </Link>
                <div className='p-3 relative'>
                    {MENU.map(item => (
                        <MenuItem item={item} key={item.link} />
                    ))}
                </div>
            </div>
            <footer className="pl-2 pb-2">
                2025 &copy; With love from {' '}
                <a
                    href='https://t.me/ma_x_ik'
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-primary text-brand-300 transition-colors'
                >
                    Maxim Dolgov
                </a>
                . <br /> All rights reserved.
            </footer>
        </aside>
    )
}