import {useEffect, useState} from "react";

// @ts-ignore
const ElapsedTime = ({start}) => {

    const [elapsedTime, setElapsedTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const seconds = Math.floor(elapsed / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            setElapsedTime((days > 0 ? `${days}d ` : '') + (hours % 24 > 0 ? `${hours % 24}h ` : '') + (minutes % 60 > 0 ? `${minutes % 60}m ` : '') + (seconds % 60 > 0 ? `${seconds % 60}s` : ''));

        }, 1000);
        return () => clearInterval(interval);
    }, [elapsedTime, start]);

    return (
        <span className="text-sm text-gray-300 opacity-50">
            e.t: {elapsedTime}
        </span>
    );
};

export default ElapsedTime;