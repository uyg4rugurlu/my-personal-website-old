import {Technologies} from "../components/Technologies";
import {Contact} from "../components/Contact";
import {Layout} from "../components/Layout";
import {About} from "../components/About";
import {Main} from "../components/Main";
import {Seo} from "../components/Seo";
import type {NextPage} from "next";

const Home: NextPage = () => {

    return (
        <>
            <Seo/>
            <Layout>
                <Main/>
                <About/>
                <Technologies/>
                <Contact/>
            </Layout>
        </>
    );
};

export default Home;
