import {useState, useEffect} from "react";

const getCurrentTime = () => {
    const date = new Date();
    return date.getTime();
}

// @ts-ignore
const ElapsedSongTime = ({start}) => {
    const [elapsed, setElapsed] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {

            const elapsed = getCurrentTime() - start;
            const seconds = Math.floor(elapsed / 1000);
            const minutes = Math.floor(seconds / 60);

            setElapsed((minutes > 0 ? `${minutes < 10 ? `0${minutes}` : minutes}:` : '00:') + (seconds % 60 > 0 ? `${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}` : '00'));
        }, 1000);
        return () => clearInterval(interval);
    }, [start]);
    return <small className="opacity-50">{elapsed}</small>;
}

export default ElapsedSongTime;