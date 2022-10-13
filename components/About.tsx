import {Heading} from "./Heading";
import {LinkTag} from "./LinkTag";
import {Text} from "./Text";

export const About = () => {
    const TEXT_MARGIN_BOTTOM = 1.5;

    return (
        <section className="flex flex-col mb-12">
            <Heading>About 💭</Heading>
            <Text style={{marginBottom: `${TEXT_MARGIN_BOTTOM}rem`}}>
                I&apos;m a {new Date().getFullYear() - 2003} year old software engineer
                based in the TR, I specialize in web development.
            </Text>
            <Text style={{marginBottom: `${TEXT_MARGIN_BOTTOM}rem`}}>
                I use a variety of technologies to ease my development process, when
                working on the client I use{" "}
                <LinkTag href="https://reactjs.org/" target="_blank">
                    ReactJS
                </LinkTag>{" "}
                &#38;{" "}
                <LinkTag href="https://nextjs.org/" target="_blank">
                    NextJS
                </LinkTag>{" "}
                and for the serverside I use{" "}
                <LinkTag href="https://nodejs.org/en/" target="_blank">
                    Node
                </LinkTag>{" "}
                &#38;{" "}
                <LinkTag href="https://php.net/" target="_blank">
                    PHP
                </LinkTag>{" "}
                .
            </Text>
            <Text style={{marginBottom: `${TEXT_MARGIN_BOTTOM}rem`}}>
                Besides programming, I like to listen to music, travel in my spare time and go out with my friends.
            </Text>
        </section>
    );
};
