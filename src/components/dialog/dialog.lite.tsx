import { Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./dialog.scss";
import ModalCore from "src/core/modal/modal.core.lite";

type DialogVariant = "flat" | "raised" | "soft" | "outlined";
type DialogShape = "box" | "rounded";

interface DialogProps {
    id?: string;
    variant?: DialogVariant;
    shape?: DialogShape;
    open?: boolean;
    onClose?: () => void;
}

export default function Dialog(props: DialogProps) {
    useDefaultProps<typeof props>({
        variant: "outlined",
        shape: "rounded",
        open: false
    });

    function handleOpen(el: HTMLDialogElement) {
        if (typeof window === "undefined") return;

        el.classList.add("open");
        el.classList.remove("close");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const animationDuration = Number.parseFloat(getComputedStyle(el).animationDuration ?? 0) * 1000;

        el.animate(
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

    async function handleClose(el: HTMLDialogElement) {
        //TODO: Fix double event emit
        props.onClose?.();
        el.classList.remove("open");
        el.classList.add("close");

        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const animationDuration = Number.parseFloat(getComputedStyle(el).animationDuration ?? 0) * 1000;

        return new Promise<void>((res) => {
            el.animate(
                [
                    { scale: 1, opacity: 1 },
                    { scale: 0.9, opacity: 0 }
                ],
                {
                    duration: animationDuration,
                    easing: "ease-out"
                }
            ).addEventListener("finish", () => res(), { once: true });
        });
    }

    return (
        //@ts-ignore - Ignore Mitosis missing children error
        <ModalCore
            id={props.id}
            cls={`dialog ${props.variant} ${props.shape}`}
            open={props.open}
            onOpen={(el) => handleOpen(el)}
            onClose={(el) => handleClose(el)}
        >
            <Slot />
        </ModalCore>
    );
}
