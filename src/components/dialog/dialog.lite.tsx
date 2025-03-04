import { useScrollLock } from "../../utils/scroll";
import style from "./dialog.scss";
import { onUpdate, Slot, useDefaultProps, useRef } from "@builder.io/mitosis";

type DialogVariant = "flat" | "raised" | "soft" | "outlined";

interface DialogProps {
    variant?: DialogVariant;
    open?: boolean;
    onDismiss?: () => void;
    onClosed?: () => void;
}

const scrollLock = useScrollLock();

export default function Dialog(props: DialogProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        open: false,
        onDismiss: () => {},
        onClosed: () => {}
    });

    const dialogRef = useRef<HTMLDialogElement | undefined>(undefined);

    function animateOpen() {
        if (!dialogRef) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        dialogRef.animate(
            [
                { scale: 0.75, opacity: 0 },
                { scale: 1, opacity: 1 }
            ],
            {
                duration: 150
            }
        );
    }

    function animateClose(callback?: () => void) {
        if (!dialogRef) return;
        if (window.matchMedia("prefers-reduced-motion: reduce").matches) {
            callback?.();
            return;
        }

        dialogRef
            .animate(
                [
                    { scale: 1, opacity: 1 },
                    { scale: 0.75, opacity: 0 }
                ],
                {
                    duration: 150
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
            ref={dialogRef}
            class={`dialog ${props.variant}`}
            onClick={(e) => handleClick(e)}
            onKeyDown={(e) => handleKeyDown(e)}
        >
            <Slot />
        </dialog>
    );
}
