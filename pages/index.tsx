import { Technologies } from "../components/Technologies";
import { Contact } from "../components/Contact";
import { Layout } from "../components/Layout";
import { About } from "../components/About";
import { Main } from "../components/Main";
import { Seo } from "../components/Seo";
import type { NextPage } from "next";
import Listening from "../components/Listening";
import { useState } from "react";

const Home: NextPage = () => {
  const [_, setPresenceActive] = useState(false);

  return (
    <>
      <Seo />
      <Layout>
        <Main />
        <About />
        <Technologies />
        <Contact />
        <Listening />
      </Layout>
    </>
  );
};

export default Home;
