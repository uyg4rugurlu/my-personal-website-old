import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html className="dark">
            <Head/>
            <body
                className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
