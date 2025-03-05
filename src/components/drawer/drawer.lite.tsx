import { onUpdate, Slot, useDefaultProps, useRef } from "@builder.io/mitosis";
import style from "./drawer.scss";
import { useScrollLock } from "../../utils/scroll";

type DrawerPosition = "top" | "right" | "bottom" | "left";
type DrawerVariant = "flat" | "raised" | "soft" | "outlined";

interface DrawerProps {
    id?: string;
    variant?: DrawerVariant;
    position?: DrawerPosition;
    open?: boolean;
    onDismiss?: () => void;
    onClosed?: () => void;
}

const scrollLock = useScrollLock();

export default function Drawer(props: DrawerProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        position: "left",
        open: false
    });

    const dialogRef = useRef<HTMLDialogElement | undefined>(undefined);

    function animateOpen() {
        if (!dialogRef) return;
        if (typeof window === "undefined") return;

        dialogRef.classList.add("open");
        dialogRef.classList.remove("close");

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

        const animationDuration = Number.parseFloat(getComputedStyle(dialogRef).animationDuration ?? 0) * 1000;

        dialogRef.animate([{ transform: `translate(${startX}, ${startY})` }, { transform: `translate(0, 0)` }], {
            duration: animationDuration
        });
    }

    function animateClose(callback?: () => void) {
        if (!dialogRef) return;
        if (typeof window === "undefined") return;

        dialogRef.classList.remove("open");
        dialogRef.classList.add("close");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            callback?.();
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

        const animationDuration = Number.parseFloat(getComputedStyle(dialogRef).animationDuration ?? 0) * 1000;

        dialogRef
            .animate([{ transform: `translate(0, 0)` }, { transform: `translate(${endX}, ${endY})` }], {
                duration: animationDuration
            })
            .addEventListener("finish", () => callback?.());
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
            scrollLock.lock();
            animateOpen();
            dialogRef.showModal();
            dialogRef.focus();
        } else {
            scrollLock.unlock();
            animateClose(() => {
                dialogRef.close();
            });
        }
    }, [props.open]);

    return (
        <dialog
            id={props.id}
            ref={dialogRef}
            class={`drawer ${props.position} ${props.variant}`}
            onClick={(e) => handleClick(e)}
            onKeyDown={(e) => handleKeyDown(e)}
        >
            <Slot />
        </dialog>
    );
}
