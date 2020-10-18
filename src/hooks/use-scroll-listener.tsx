import { useEffect, useRef, useState } from "react";

export const useScrollListener = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [ scrollTop, setScrollTop ] = useState<number>(0);

    const onScroll = (evt: any) =>
        requestAnimationFrame(() => {
            setScrollTop(evt.target.scrollTop);
        });

    useEffect(() => {
        const scrollContainer = ref.current!;

        setScrollTop(scrollContainer.scrollTop);
        scrollContainer.addEventListener("scroll", onScroll);

        return () => scrollContainer.removeEventListener("scroll", onScroll);
    }, []);

    return { scrollTop, ref };
};