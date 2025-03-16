import { Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./drawer.scss";
import ModalCore from "src/core/modal/modal.core.lite";

type DrawerPosition = "top" | "right" | "bottom" | "left";
type DrawerVariant = "flat" | "raised" | "soft" | "outlined";

interface DrawerProps {
    id?: string;
    variant?: DrawerVariant;
    position?: DrawerPosition;
    open?: boolean;
    onClose?: () => void;
}
export default function Drawer(props: DrawerProps) {
    useDefaultProps<typeof props>({
        variant: "outlined",
        position: "left",
        open: false
    });

    function handleOpen(el: HTMLDialogElement) {
        if (typeof window === "undefined") return;

        el.classList.add("open");
        el.classList.remove("close");

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

        const animationDuration = Number.parseFloat(getComputedStyle(el).animationDuration ?? 0) * 1000;

        el.animate([{ transform: `translate(${startX}, ${startY})` }, { transform: `translate(0, 0)` }], {
            duration: animationDuration
        });
    }

    function handleClose(el: HTMLDialogElement) {
        props.onClose?.();
        el.classList.remove("open");
        el.classList.add("close");

        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

        const animationDuration = Number.parseFloat(getComputedStyle(el).animationDuration ?? 0) * 1000;

        return new Promise<void>((res) => {
            el.animate([{ transform: `translate(0, 0)` }, { transform: `translate(${endX}, ${endY})` }], {
                duration: animationDuration
            }).addEventListener("finish", () => res(), { once: true });
        });
    }

    return (
        //@ts-ignore - Ignore Mitosis missing children error
        <ModalCore
            id={props.id}
            cls={`drawer ${props.position} ${props.variant}`}
            open={props.open}
            onOpen={(el) => handleOpen(el)}
            onClose={(el) => handleClose(el)}
        >
            <Slot />
        </ModalCore>
    );
}
