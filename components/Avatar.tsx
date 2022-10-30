interface Props {
    width: number;
    height: number;
}

export const Avatar = ({width, height}: Props) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/me.jpeg"
            alt="Uygar Uğurlu"
            className="rounded-full"
            width={width}
            height={height}
        />
    );
};
