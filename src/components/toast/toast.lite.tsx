import { onUnMount, onUpdate, Slot, useDefaultProps, useRef } from "@builder.io/mitosis";
import style from "./toast.scss";

type ToastVariant = "flat" | "raised" | "soft" | "outlined";
type ToastShape = "box" | "rounded" | "pill";
type ToastPosition = "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right";

interface ToastProps {
    id?: string;
    variant?: ToastVariant;
    shape?: ToastShape;
    position?: ToastPosition;
    open?: boolean;
    duration?: number;
    onDismiss?: () => void;
}

export default function Toast(props: ToastProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        shape: "rounded",
        position: "bottom-right",
        open: false,
        duration: 0
    });

    const toastRef = useRef<HTMLDivElement | undefined>(undefined);

    let durationTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    function animateOpen() {
        if (!toastRef) return;

        const pos = (props.position ?? "top").split("-")[0];

        let startY: `${number}%` = "0%";

        switch (pos) {
            case "top":
                startY = "-200%";
                break;
            case "bottom":
                startY = "200%";
                break;
        }

        toastRef.animate([{ transform: `translate(0%, ${startY})` }, { transform: `translate(0%, 0%)` }], {
            duration: 150,
            easing: "ease-in-out"
        });
    }

    function animateClose(callback?: () => void) {
        if (!toastRef) return;

        const pos = (props.position ?? "top").split("-")[0];

        let startY: `${number}%` = "0%";

        switch (pos) {
            case "top":
                startY = "-200%";
                break;
            case "bottom":
                startY = "200%";
                break;
        }

        toastRef
            .animate([{ transform: `translate(0%, 0%)` }, { transform: `translate(0%, ${startY})` }], {
                duration: 150,
                easing: "ease-in-out"
            })
            .addEventListener("finish", () => callback?.(), { once: true });
    }

    onUpdate(() => {
        if (!toastRef) return;

        toastRef.popover = "manual";

        if (props.open) {
            toastRef.style.display = "block";
            toastRef.showPopover();
            animateOpen();
            if (props.duration) {
                durationTimeout = setTimeout(() => {
                    props.onDismiss?.();
                }, props.duration * 1000);
            }
        } else {
            animateClose(() => {
                toastRef.hidePopover();
                toastRef.style.display = "none";
            });
        }
    }, [props.open]);

    onUnMount(() => {
        clearTimeout(durationTimeout);
    });

    return (
        <div id={props.id} ref={toastRef} class={`toast ${props.variant} ${props.shape} ${props.position}`}>
            <Slot />
        </div>
    );
}
