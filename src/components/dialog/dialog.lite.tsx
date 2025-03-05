import { useScrollLock } from "../../utils/scroll";
import style from "./dialog.scss";
import { onUpdate, Slot, useDefaultProps, useRef } from "@builder.io/mitosis";

type DialogVariant = "flat" | "raised" | "soft" | "outlined";
type DialogShape = "box" | "rounded";

interface DialogProps {
    id?: string;
    variant?: DialogVariant;
    shape?: DialogShape;
    open?: boolean;
    onDismiss?: () => void;
    onClosed?: () => void;
}

const scrollLock = useScrollLock();

export default function Dialog(props: DialogProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        shape: "rounded",
        open: false
    });

    const dialogRef = useRef<HTMLDialogElement | undefined>(undefined);

    function animateOpen() {
        if (!dialogRef) return;
        if (typeof window === "undefined") return;

        dialogRef.classList.add("open");
        dialogRef.classList.remove("close");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const animationDuration = Number.parseFloat(getComputedStyle(dialogRef).animationDuration ?? 0) * 1000;

        dialogRef.animate(
            [
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1 }
            ],
            {
                duration: animationDuration,
                easing: "ease-in"
            }
        );
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

        const animationDuration = Number.parseFloat(getComputedStyle(dialogRef).animationDuration ?? 0) * 1000;

        dialogRef
            .animate(
                [
                    { scale: 1, opacity: 1 },
                    { scale: 0.9, opacity: 0 }
                ],
                {
                    duration: animationDuration,
                    easing: "ease-out"
                }
            )
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
            class={`dialog ${props.variant} ${props.shape}`}
            onClick={(e) => handleClick(e)}
            onKeyDown={(e) => handleKeyDown(e)}
        >
            <Slot />
        </dialog>
    );
}
