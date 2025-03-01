import { onInit, onMount, onUnMount, onUpdate, Slot, useDefaultProps, useRef } from "@builder.io/mitosis";
import style from "./navbar.scss";

type NavbarVariant = "flat" | "raised" | "soft" | "outlined";

interface NavbarProps {
    variant?: NavbarVariant;
    sticky?: boolean;
    hideOnScroll?: boolean;
}

export default function Navbar(props: NavbarProps) {
    useDefaultProps<typeof props>({
        variant: "outlined",
        sticky: false,
        hideOnScroll: false
    });

    let bodyY = useRef<number>(0);

    const navbarRef = useRef<HTMLDivElement | undefined>(undefined);
    const navbarPlaceholderRef = useRef<HTMLDivElement | undefined>(undefined);

    let handleScrollRef = useRef<() => void>(handleScroll);
    let handleScrollStopRef = useRef<() => void>(handleScrollStop);

    function handleScroll() {
        if (!navbarRef) return;
        if (typeof window === "undefined") return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            navbarRef.style.top = "0px";
            return;
        }

        const delta = window.scrollY - bodyY;
        bodyY = window.scrollY;

        const navbarRect = navbarRef.getBoundingClientRect();

        const currentTop = Number.parseFloat(navbarRef.computedStyleMap().get("top")?.toString() ?? "0");

        let newTop = currentTop - delta;

        if (newTop > 0) newTop = 0;

        if (newTop < -navbarRect.height) newTop = -navbarRect.height;

        navbarRef.style.top = `${newTop}px`;
    }

    function handleScrollStop() {
        if (!navbarRef) return;

        const navbarRect = navbarRef.getBoundingClientRect();

        if (bodyY <= navbarRect.height) return;

        const currentTop = Number.parseFloat(navbarRef.computedStyleMap().get("top")?.toString() ?? "0");

        let newTop = currentTop;

        if (currentTop < -navbarRect.height / 2) {
            newTop = -navbarRect.height;
        } else {
            newTop = 0;
        }

        navbarRef.animate([{ top: `${currentTop}px` }, { top: `${newTop}px` }], { duration: 100 });
        navbarRef.style.top = `${newTop}px`;
    }

    function registerHandlers() {
        if (!navbarRef) return;
        if (typeof window === "undefined") return;

        if (props.sticky && props.hideOnScroll) {
            window.addEventListener("scroll", handleScrollRef);
            window.addEventListener("scrollend", handleScrollStopRef);
        }

        if (navbarPlaceholderRef) {
            navbarPlaceholderRef.style.height = props.sticky ? `${navbarRef.getBoundingClientRect().height}px` : `0px`;
        }
    }

    function removeHandlers() {
        if (typeof window === "undefined") return;

        window.removeEventListener("scroll", handleScrollRef);
        window.removeEventListener("scrollend", handleScrollStopRef);

        navbarRef?.style.removeProperty("top");
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
            <nav ref={navbarRef} class={`navbar ${props.variant} ${props.sticky ? "sticky" : ""}`}>
                <Slot />
            </nav>
            <div ref={navbarPlaceholderRef} style={{ width: "100%" }}></div>
        </>
    );
}
