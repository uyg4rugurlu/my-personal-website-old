import {useState, useEffect} from 'react';

// @ts-ignore
const EndSongTime = ({start, end}) => {

    const [songTime, setSongTime] = useState('');

    useEffect(() => {

        const time = Math.floor((end - start) / 1000);
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formatStr = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        setSongTime(formatStr);
    }, [start, end]);

    return <small className="opacity-50">{songTime}</small>;

}

export default EndSongTime;