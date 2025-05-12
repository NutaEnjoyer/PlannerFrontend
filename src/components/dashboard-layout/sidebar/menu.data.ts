import { CalendarRange, KanbanSquare, LayoutDashboard, Settings, Timer } from "lucide-react";
import type { IMenuItem } from "./menu.interface";
import { DASHBOAD_PAGES } from "@/config/pages-url.config";


export const MENU: IMenuItem[] = [
    {
        icon: LayoutDashboard,
        link: DASHBOAD_PAGES.HOME,
        name: 'Dashboard'
    },
    {
        icon: KanbanSquare,
        link: DASHBOAD_PAGES.TASKS,
        name: 'Tasks'
    },
    {
        icon: Timer,
        link: DASHBOAD_PAGES.TIMER,
        name: 'Pomodoro'
    },
    {
        icon: CalendarRange,
        link: DASHBOAD_PAGES.TIME_BLOCKING,
        name: 'Time blocking'
    },
    {
        icon: Settings,
        link: DASHBOAD_PAGES.SETTINGS,
        name: 'Settings'
    }
]