import {useState, useEffect} from 'react';

const getCurrentTime = () => {
    const date = new Date();
    return date.getTime();
}

// @ts-ignore
const ProgressBar = ({start, end}) => {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // @ts-ignore
            const total = end - start;
            // @ts-ignore
            const width = 100 - (100 * (end - getCurrentTime()) / total);
            // @ts-ignore
            setProgress(width.toFixed(2));
            if (width >= 100) {
                setProgress(100);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [end, progress, start]);

    return (
        <div
            className="h-2 rounded-full bg-green-500 transition-all"
            style={{
                width: `${progress}%`,
            }}/>
    );
};

export default ProgressBar;