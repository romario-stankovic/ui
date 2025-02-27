import { onInit, onMount, onUnMount, onUpdate, Show, Slot, useDefaultProps, useRef } from "@builder.io/mitosis";
import style from "./navbar.scss";

type NavbarVariant = "flat" | "raised" | "soft" | "outlined";

interface NavbarProps {
    variant?: NavbarVariant;
    sticky?: boolean;
    hideOnScroll?: boolean;
}

export default function Navbar(props: NavbarProps) {
    useDefaultProps<typeof props>({
        variant: "outlined"
    });

    let bodyY = useRef<number>(0);

    const navbarElement = useRef<HTMLDivElement>(null);
    const navbarPlaceholder = useRef<HTMLDivElement>(null);

    let handleScrollRef = useRef<() => void>(handleScroll);
    let handleScrollStopRef = useRef<() => void>(handleScrollStop);

    function handleScroll() {
        const delta = window.scrollY - bodyY;
        bodyY = window.scrollY;

        const navbarRect = navbarElement.getBoundingClientRect();

        const currentTop = Number.parseFloat(navbarElement.computedStyleMap().get("top")?.toString() ?? "0");

        let newTop = currentTop - delta;

        if (newTop > 0) newTop = 0;

        if (newTop < -navbarRect.height) newTop = -navbarRect.height;

        navbarElement.style.top = `${newTop}px`;
    }

    function handleScrollStop() {
        const navbarRect = navbarElement.getBoundingClientRect();

        if (bodyY <= navbarRect.height) return;

        const currentTop = Number.parseFloat(navbarElement.computedStyleMap().get("top")?.toString() ?? "0");

        let newTop = currentTop;

        if (currentTop < -navbarRect.height / 2) {
            newTop = -navbarRect.height;
        } else {
            newTop = 0;
        }

        navbarElement.animate([{ top: `${currentTop}px` }, { top: `${newTop}px` }], { duration: 100 });
        navbarElement.style.top = `${newTop}px`;
    }

    function registerHandlers() {
        if (typeof window === "undefined") return;

        if (props.sticky && props.hideOnScroll) {
            window.addEventListener("scroll", handleScrollRef);
            window.addEventListener("scrollend", handleScrollStopRef);
        }

        navbarPlaceholder.style.height = props.sticky ? `${navbarElement.getBoundingClientRect().height}px` : `0px`;
    }

    function removeHandlers() {
        if (typeof window === "undefined") return;

        window.removeEventListener("scroll", handleScrollRef);
        window.removeEventListener("scrollend", handleScrollStopRef);

        navbarElement?.style.removeProperty("top");
    }

    onInit(() => {
        handleScrollRef = handleScroll;
        handleScrollStopRef = handleScrollStop;
    });

    onMount(() => {
        registerHandlers();
    });

    onUpdate(() => {
        removeHandlers();
        registerHandlers();
    }, [props.sticky, props.hideOnScroll]);

    onUnMount(() => {
        removeHandlers();
    });

    return (
        <>
            <nav ref={navbarElement} class={`navbar ${props.variant} ${props.sticky ? "sticky" : ""}`}>
                <Slot />
            </nav>
            <div ref={navbarPlaceholder} style={{ width: "100%" }}></div>
        </>
    );
}
