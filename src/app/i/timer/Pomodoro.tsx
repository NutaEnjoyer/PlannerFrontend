'use client'

import { Pause, Play, RefreshCcw } from "lucide-react";
import { formatTime } from "./format-time";
import { useTimer } from "./hooks/useTimer";
import { useTimerActions } from "./hooks/useTimerActions";
import { useTodaySSession } from "./hooks/useTodaySession";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/buttons/Button";
import { PomodoroRounds } from "./rounds/PomodoroRounds";
import { useDeleteSession } from "./hooks/useDeleteSession";
import { useCreateSession } from "./hooks/useCreateSession";


export function Pomodoro () {
    const timerState = useTimer()
    const { isLoading, sessionsResponse, workInterval } = useTodaySSession(timerState)
    const rounds = sessionsResponse?.data.rounds
    const actions = useTimerActions({...timerState, rounds: rounds})
    const { deleteSession, isDeleteSessionPending} = useDeleteSession(() => timerState.setSecondsLeft(Number(workInterval) * 60))

    const {createSession, isCreateSessionPending} = useCreateSession()

    return (
        <div
            className="relative w-80 text-center"
        >
            {!isLoading && (
                <div className='text-7xl font-semibold'>{formatTime(timerState.secondsLeft)}</div>
            )}
            {isLoading ? (
                <Loader />
            ) : sessionsResponse?.data ? (
                <>
                    <PomodoroRounds 
                        rounds={rounds}
                        nextRoundHandler={actions.nextRoundHandler}
                        prevRoundHandler={actions.prevRoundHandler}
                        activeRound={timerState.activeRound}
                    />
                    <button
                        className="mt-6 opacity-80 hover:opacity-100 transition-opacity"
                        onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler}
                        disabled={actions.isUpdateRoundPending}
                    >
                        {timerState.isRunning ? <Pause size={30}/> : <Play size={30}/>}
                    </button>
                    <button
                        onClick={() => {
                            timerState.setIsRunning(false)
                            deleteSession(sessionsResponse?.data.id)
                        }}
                        className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'
                        disabled={isDeleteSessionPending}
                    >
                        <RefreshCcw size={19}/>

                    </button>
                </>
            ) : (
                <Button
                    onClick={() => createSession()}
                    className='mt-1'
                    disabled={isCreateSessionPending}
                >
                    Create session
                </Button>
            )
        
        }
        </div>
    )
 }
