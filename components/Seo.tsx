import Head from "next/head";

interface Props {
    title: string;
    description: string;
}

const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Uygar Uğurlu",
    "image": "https://uygar.xyz/me.jpeg",
    "jobTitle": "Software Developer",
    "url": "https://uygar.xyz/",
    "sameAs": [
        "https://twitter.com/uuygarugurlu",
        "https://github.com/uyg4rugurlu",
        "https://www.instagram.com/uuygarugurlu/"
    ]
}

export const Seo = () => {
    return (
        <Head>
            <title>Uygar Uğurlu</title>
            <meta charSet={'UTF-8'}/>
            <meta name="title" content="Uygar Uğurlu"/>
            <meta name="description"
                  content="Hi there, I'm Uygar Uğurlu &mdash; a full-stack web application developer from Ankara, Türkiye."/>
            <meta name="robots" content="index, follow"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://uygar.xyz/"/>
            <meta property="og:title" content="Uygar Uğurlu"/>
            <meta property="og:description"
                  content="Hi there, I'm Uygar Uğurlu &mdash; a full-stack web application developer from Ankara, Türkiye."/>
            <meta property="og:image" content="https://uygar.xyz/me.jpeg"/>
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content="https://uygar.xyz/"/>
            <meta property="twitter:title" content="Uygar Uğurlu"/>
            <meta property="twitter:description"
                  content="Hi there, I'm Uygar Uğurlu &mdash; a full-stack web application developer from Ankara, Türkiye."/>
            <meta property="twitter:image" content="https://uygar.xyz/me.jpeg"/>
            <meta name="google-site-verification" content="7zd-Cop1OZgN918aNRzjgRHcTQDAqXl31vFy0DGjifo"/>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
            />
        </Head>
    );
};
