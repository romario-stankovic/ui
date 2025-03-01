import { onUpdate, Slot, useDefaultProps, useRef } from "@builder.io/mitosis";
import style from "./drawer.scss";

type DrawerPosition = "top" | "right" | "bottom" | "left";
type DrawerVariant = "flat" | "raised" | "outlined";

interface DrawerProps {
    variant?: DrawerVariant;
    position?: DrawerPosition;
    open?: boolean;
    onDismiss?: () => void;
    onClosed?: () => void;
}

export default function Drawer(props: DrawerProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        position: "left",
        open: false,
        onDismiss: () => {},
        onClosed: () => {}
    });

    const dialogRef = useRef<HTMLDialogElement | undefined>(undefined);

    function hasOpenModals() {
        const openModals = Array.from(document.getElementsByTagName("dialog")).filter((d) =>
            d.hasAttribute("open")
        ).length;
        return openModals > 0;
    }

    function blockScroll() {
        if (typeof window === "undefined") return;

        if (hasOpenModals()) return;

        const top = window.scrollY;
        const left = window.scrollX;
        const overflowX = document.body.scrollWidth > document.body.clientWidth;
        const overflowY = document.body.scrollHeight > document.body.clientHeight;

        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.top = `-${top}px`;
        document.body.style.left = `-${left}px`;
        document.body.style.overflow = `${overflowX ? "scroll" : "hidden"} ${overflowY ? "scroll" : "hidden"}`;
    }

    function unblockScroll() {
        if (typeof window === "undefined") return;

        if (hasOpenModals()) return;

        const top = Math.abs(parseFloat(document.body.style.getPropertyValue("top").replace("px", "")));
        const left = Math.abs(parseFloat(document.body.style.getPropertyValue("left").replace("px", "")));

        document.body.style.removeProperty("position");
        document.body.style.removeProperty("width");
        document.body.style.removeProperty("height");
        document.body.style.removeProperty("top");
        document.body.style.removeProperty("left");
        document.body.style.removeProperty("overflow");

        window.scrollTo({ behavior: "instant", left: left, top: top });
    }

    function animateOpen() {
        if (!dialogRef) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let startX: `${number}%` = "0%";
        let startY: `${number}%` = "0%";

        switch (props.position) {
            case "top":
                startX = "0%";
                startY = "-100%";
                break;
            case "right":
                startX = "100%";
                startY = "0%";
                break;
            case "bottom":
                startX = "0%";
                startY = "100%";
                break;
            case "left":
                startX = "-100%";
                startY = "0%";
                break;
        }

        dialogRef.animate([{ transform: `translate(${startX}, ${startY})` }, { transform: `translate(0, 0)` }], {
            duration: 150
        });
    }

    function animateClose(finishCallback?: () => void) {
        if (!dialogRef) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            finishCallback?.();
            return;
        }

        let endX: `${number}%` = "0%";
        let endY: `${number}%` = "0%";

        switch (props.position) {
            case "top":
                endX = "0%";
                endY = "-100%";
                break;
            case "right":
                endX = "100%";
                endY = "0%";
                break;
            case "bottom":
                endX = "0%";
                endY = "100%";
                break;
            case "left":
                endX = "-100%";
                endY = "0%";
                break;
        }

        dialogRef
            .animate([{ transform: `translate(0, 0)` }, { transform: `translate(${endX}, ${endY})` }], {
                duration: 150
            })
            .addEventListener("finish", () => finishCallback?.());
    }

    function handleClick(event: MouseEvent) {
        if (!dialogRef) return;
        const rect = dialogRef.getBoundingClientRect();
        if (
            event.clientY < rect.top ||
            event.clientY > rect.bottom ||
            event.clientX < rect.left ||
            event.clientX > rect.right
        ) {
            props.onDismiss?.();
        }
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            event.preventDefault();
            props.onDismiss?.();
        }
    }

    onUpdate(() => {
        if (!dialogRef) return;

        if (props.open) {
            blockScroll();
            animateOpen();
            dialogRef.showModal();
        } else {
            animateClose(() => {
                dialogRef.close();
                unblockScroll();
            });
        }
    }, [props.open]);

    return (
        <dialog
            ref={dialogRef}
            class={`drawer ${props.position} ${props.variant}`}
            onClick={(e) => handleClick(e)}
            onKeyDown={(e) => handleKeyDown(e)}
        >
            <Slot />
        </dialog>
    );
}
