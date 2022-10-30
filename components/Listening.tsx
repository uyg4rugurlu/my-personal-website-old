import {DISCORD_ID, WEBSOCKET_URL} from "../lib/constants";
import {useEffect, useState, useMemo} from "react";
import {Presence, Timestamps} from "../types/lanyard";
import {FaTired} from "react-icons/fa";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

// Credit to Phineas for the lanyard implementation
// Credit to Tim for the types (https://github.com/timcole/timcole.me/blob/%F0%9F%A6%84/components/lanyard.tsx)

type Props = {
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

enum Operation {
    Event,
    Hello,
    Initialize,
    Heartbeat,
}

enum EventType {
    INIT_STATE = "INIT_STATE",
    PRESENCE_UPDATE = "PRESENCE_UPDATE",
}

type SocketEvent = {
    op: Operation;
    t?: EventType;
    d: Presence | unknown;
};

export const Listening: React.FC<Props> = (
    {setActive, ...props}: { setActive: (active: boolean) => void } & any,
    ref: any
) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [doing, setDoing] = useState<Presence>();

    const send = (op: Operation, d?: unknown): void => {
        if (socket !== null) socket.send(JSON.stringify({op, d}));
    };

    useEffect(() => {
        if (socket === null) return () => {
        };

        socket.onmessage = function ({data}: MessageEvent): void {
            const {op, t, d}: SocketEvent = JSON.parse(data);

            if (op === Operation.Hello) {
                setInterval(
                    () => send(Operation.Heartbeat),
                    (d as { heartbeat_interval: number }).heartbeat_interval
                );
                send(Operation.Initialize, {subscribe_to_id: DISCORD_ID});
            } else if (op === Operation.Event && t) {
                if ([EventType.INIT_STATE, EventType.PRESENCE_UPDATE].includes(t))
                    setDoing(d as Presence);
            }
        };

        socket.onclose = () => {
            setSocket(null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket]);

    useEffect(() => {
        if (!socket) setSocket(new WebSocket(WEBSOCKET_URL));
    }, [socket]);

    const currentActivity = useMemo(
        () => doing?.activities.filter((activity) => activity.type === 0)[0],
        [doing]
    );

    const setProgressBar = (timestamps: Timestamps) => {
        const {start, end} = timestamps;
        const now = Date.now();
        // @ts-ignore
        const progress = ((now - start) / (end - start)) * 100;
        setActive(progress <= 100);
        return progress;
    }

    const setStartTime = (timestamps: Timestamps) => {
        const {start, end} = timestamps;
        const now = Date.now();
        const time = Math.floor((now - start) / 1000);
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        // if start == end pause countdown
        if (start === end) return "00:00";
        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    const howMinutes = (timestamps: Timestamps) => {
        const {start, end} = timestamps;
        // @ts-ignore
        const time = Math.floor((end - start) / 1000);
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    useEffect(() => {
        if (currentActivity?.timestamps) {
            const interval = setInterval(() => {
                setProgressBar(currentActivity.timestamps);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [currentActivity?.timestamps]);

    useEffect(() => {
        setActive(doing?.listening_to_spotify || currentActivity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doing, currentActivity]);

    if (!doing || !doing.discord_status)
        return (
            <section className="flex-1 items-center mb-4">
                <div
                    className="rounded-lg flex items-center flex-row bg-white/10 p-4 overflow-x-hidden text-white items-center">
                    <AiOutlineLoading3Quarters className="animate-spin mr-2"/> &nbsp;&mdash;&nbsp;
                    <span className="text-sm opacity-90 text-gray-100 dark:text-white">
                    Loading status...
                    </span>
                </div>
            </section>
        );
    stop();

    // @ts-ignore
    // @ts-ignore
    return (
        <section className="flex-1 items-center mb-6">
            <div
                className="rounded-lg flex flex-col space-y-4 bg-neutral-800 dark:bg-white/10 p-4 overflow-x-hidden text-gray-100 dark:text-white">
                {doing?.listening_to_spotify ? (
                    <div>
                        <div className="flex space-x-4 items-center">
                            <div className="flex-shrink-0 relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {/*<img*/}
                                {/*    src={doing?.spotify.album_art_url}*/}
                                {/*    alt="Album Art Image"*/}
                                {/*    draggable="false"*/}
                                {/*    width="128"*/}
                                {/*    height="128"*/}
                                {/*    className="rounded-lg w-28 h-28"*/}
                                {/*/>*/}
                                <picture className="rounded-lg w-28 h-28">
                                    <source
                                        srcSet={doing?.spotify.album_art_url}
                                        type="image/webp"
                                        width="128"
                                        height="128"
                                    />
                                </picture>
                            </div>
                            <div className="space-y-px">
                                <a href={`https://open.spotify.com/track/${doing.spotify.track_id}`} target="_blank"
                                   rel="noreferrer" title="Open on Spotify"
                                   className="cursor-pointer font-semibold text-lg leading-tight truncate hover:underline">
                                    {doing.spotify.song}
                                </a>
                                <h2 className="leading-tight opacity-50 line-clamp-2">
                                    by {doing.spotify.artist}
                                </h2>
                                <h2 className="leading-tight opacity-50 line-clamp-2">
                                    on {doing.spotify.album}
                                </h2>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-lg bg-gray-200/20 h-2">
                                <div
                                    className="rounded-lg bg-white/75 h-2 transition-all duration-300 mt-4"
                                    style={{width: `${setProgressBar(doing.spotify.timestamps)}%`}}/>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm opacity-90">
                                    <span className="opacity-70 text-center text-xs">
                                    {setStartTime(doing.spotify.timestamps)}
                                        </span>
                                </span>
                                <span className="text-sm opacity-90">
                                    <span className="opacity-70 text-center text-xs">
                                    {howMinutes(doing.spotify.timestamps)}
                                        </span>
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center text-center">
                        <FaTired></FaTired> &nbsp;&mdash;&nbsp;
                        <span className="text-sm opacity-90 text-gray-100 dark:text-white">
                    Not listening to Spotify
                    </span>
                    </div>
                )}
            </div>
        </section>
    );
};