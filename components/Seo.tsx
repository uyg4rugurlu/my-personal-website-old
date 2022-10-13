import Head from "next/head";

interface Props {
  title: string;
  description: string;
}

export const Seo = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="theme-color" content="#f54bff" />
      <meta name="description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="google-site-verification" content="7zd-Cop1OZgN918aNRzjgRHcTQDAqXl31vFy0DGjifo" />
    </Head>
  );
};
