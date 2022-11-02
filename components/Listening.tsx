import {useMemo} from 'react';
import {useLanyardWS} from 'use-lanyard';
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {FaSpotify} from "react-icons/fa";
import ElapsedTime from "./ElapsedTime";
import ProgressBar from "./ProgressBar";
import ElapsedSongTime from "./ElapsedSongTime";
import EndSongTime from "./EndSongTime";

const DiscordStatus = {
    online: 'Online',
    idle: 'Idle',
    dnd: 'Does not disturb',
    offline: 'Offline',
};

const StatusColor = {
    online: 'bg-online',
    idle: 'bg-idle',
    dnd: 'bg-dnd',
    offline: 'bg-offline',
};

const getAssetUrl = (appId: string, asset: string) =>
    asset.startsWith('mp:external')
        ? `https://media.discordapp.net/${asset.replace('mp:', '')}`
        : `https://cdn.discordapp.com/app-assets/${appId}/${asset}.png`;

function Listening() {

    const presence = useLanyardWS('936597404055142470');

    const user = useMemo(() => {
        return presence?.discord_user;
    }, [presence]);

    const status = useMemo(() => {
        return presence && DiscordStatus[presence.discord_status as keyof typeof DiscordStatus];
    }, [presence]);

    const activity = useMemo(() => {
        return presence?.activities?.find((x: { type: number; }) => x.type === 0);
    }, [presence]);

    // @ts-ignore
    return (
        <section className="flex flex-1 mb-4">
            <div className="flex flex-col w-full">
                {presence ? (
                    <div
                        className="rounded-lg p-4 w-full max-w-xl bg-zinc-700 dark:bg-white/10 text-white dark:text-gray-300">
                        <div className="flex flex-col items-center sm:flex-row">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                className="w-28 h-28 rounded-full mb-4 sm:mb-0 sm:mr-4"
                                src={
                                    user!.avatar
                                        ? `https://cdn.discordapp.com/avatars/${user!.id}/${user!.avatar}.gif?size=128`
                                        : `https://cdn.discordapp.com/embed/avatars/${
                                            parseInt(user!.discriminator.slice(-1), 10) % 5
                                        }.png`
                                }
                                alt="User Avatar"
                            />
                            <div>
                                <h4 className="text-xl font-bold leading-6">
                                    {user!.username}
                                    <span className="font-normal text-gray-400 ml-1 text-lg">
                  #{user!.discriminator}
                </span>
                                </h4>
                                <div
                                    className="flex flex-row items-center justify-center text-gray-400 sm:justify-start">
                                    <div
                                        className={`w-4 h-4 rounded-full ${
                                            StatusColor[presence.discord_status as keyof typeof StatusColor]
                                        } mr-2`}
                                    />
                                    <span>{status}</span>
                                </div>
                            </div>
                        </div>
                        {presence.listening_to_spotify && (
                            <div className="mt-4">
                                <h5 className="ml-1 mb-1 text-sm font-bold opacity-70">Listening</h5>
                                <div
                                    className="rounded-lg flex flex-col space-y-4 overflow-hidden p-4 bg-[rgba(0,0,0,.2)]">
                                    <div
                                        className="flex space-x-4 items-center">
                                        <div className="flex-shrink-0 relative">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                className="rounded-xl h-20 w-20"
                                                src={`${presence.spotify!.album_art_url}`}
                                                alt={`${presence.spotify!.song} art`}
                                            />
                                            <FaSpotify
                                                className="w-6 h-6 border-2 rounded-full bg-black border-black absolute bottom-[-8px] right-[-8px]"/>
                                        </div>
                                        <div className="space-y-px">
                                            <a href={`open.spotify.com/track/${presence.spotify!.track_id}`}
                                               target="_blank"
                                               rel="noreferrer"
                                               title="Open on Spotify"
                                               className="cursor-pointer font-semibold text-lg leading-tight hover:underline">
                                                {presence.spotify!.song}
                                            </a>
                                            <h2 className="opacity-50 line-clamp-2">
                                                by {presence.spotify!.artist}
                                            </h2>
                                            <h2 className="leading-tight opacity-50 line-clamp-2">
                                                {presence.spotify!.album}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <div className="h-2 bg-gray-300 rounded-full">
                                                <ProgressBar start={presence?.spotify?.timestamps?.start}
                                                             end={presence?.spotify?.timestamps?.end}/>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <ElapsedSongTime start={presence?.spotify?.timestamps?.start}/>
                                                <EndSongTime start={presence?.spotify?.timestamps?.start}
                                                             end={presence?.spotify?.timestamps?.end}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activity && (
                            <div className="mt-4">
                                <h5 className="ml-1 mb-1 text-sm font-bold opacity-70">Doing
                                    something</h5>
                                <div
                                    className="flex flex-row items-center rounded-lg overflow-hidden p-4 bg-[rgba(0,0,0,.2)]">
                                    <div
                                        className="w-20 h-20 min-w-[5rem] flex items-center justify-center bg-black rounded-xl relative mr-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="rounded-xl"
                                            src={
                                                activity.assets?.large_image
                                                    ? getAssetUrl(activity.application_id!, activity.assets.large_image)
                                                    : `https://dcdn.dstn.to/app-icons/${activity.application_id}`
                                            }
                                            alt="App Large Image"
                                        />
                                        {activity.assets?.small_image && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                className="w-8 h-8 border-2 rounded-full bg-black border-black absolute bottom-[-8px] right-[-8px]"
                                                src={getAssetUrl(activity.application_id!, activity.assets.small_image!)}
                                                alt="App Small Image"
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <h5 className="font-bold leading-4 mb-1">{activity.name}</h5>
                                        <span className="text-sm text-gray-300 opacity-50">{activity.state}</span>
                                        {activity.details && (
                                            <span className="text-sm text-gray-300 opacity-50">{activity.details}</span>
                                        )}
                                        {activity.timestamps && (
                                            <ElapsedTime start={activity.timestamps.start}/>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <section className="flex-1 items-center mb-4">
                        <div
                            className="rounded-lg flex items-center flex-row p-4 overflow-x-hidden bg-zinc-700 dark:bg-white/10 text-white dark:text-gray-300">
                            <AiOutlineLoading3Quarters className="animate-spin mr-2"/>
                            <span className="text-sm opacity-90 text-gray-100 dark:text-white">
                    Loading status <span className="text-gray-300 animate-pulse">...</span>
                    </span>
                        </div>
                    </section>
                )}
            </div>
        </section>
    );
}

export default Listening;
