import Button from "./Button";
import "../styles/carousel.css";
import { useLayoutEffect, useRef, useState } from "react";
import MangaCarouselItem from "./manga/MangaCarouselItem";

export default function Carousel({ size, mangaList, length }) {
    const [overflow, setOverflow] = useState(false);
    const containerRef = useRef(null);
    const scrollLength = length || 600;

    function slide(isLeft) {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: isLeft ? -1 * scrollLength : scrollLength,
                behavior: "smooth"
            });
        }
    }

    // Check for overflow in the manga container
    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        function checkOverflow() {
            setOverflow(container.scrollWidth > container.clientWidth);
        }

        checkOverflow();

        window.addEventListener("resize", checkOverflow);

        return () => {
            window.removeEventListener("resize", checkOverflow);
        }
    }, [mangaList]);

    return (
        <div className={`carousel ${size === "large" && "flex"}`}>
            {overflow &&
                <>
                    <Button className="carousel-btn carousel-next" onClick={() => slide(true)}><span className="arrow arrow-next"></span></Button>
                    <Button className="carousel-btn carousel-prev" onClick={() => slide(false)}><span className="arrow arrow-prev"></span></Button>
                </>
            }
            <div className="manga-container" ref={containerRef}>
                {mangaList.map(m => <MangaCarouselItem key={m.id} size={size} {...m} />)}
            </div>
        </div>
    );
}