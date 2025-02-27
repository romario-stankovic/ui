import { onMount, onUnMount, onUpdate, Slot, useDefaultProps, useRef, useState } from "@builder.io/mitosis";
import style from "./tooltip.scss";

type TooltipPosition = "top" | "right" | "bottom" | "left" | "mouse";
type TooltipVariant = "flat" | "raised" | "soft" | "outlined" | "colored-outline";
type TooltipShape = "box" | "rounded" | "pill";

interface TooltipProps {
    target: string;
    variant?: TooltipVariant;
    shape?: TooltipShape;
    margin?: number;
    delay?: number;
    position?: TooltipPosition;
}

export default function Tooltip(props: TooltipProps) {
    let targetRef = useRef<HTMLElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const [left, setLeft] = useState<number>(0);
    const [top, setTop] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);

    let delayTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    useDefaultProps<typeof props>({
        target: "",
        variant: "outlined",
        shape: "rounded",
        margin: 0,
        delay: 0,
        position: "mouse"
    });

    function mouseEnterHandler() {
        if (!targetRef) {
            return;
        }

        const targetRect = targetRef.getBoundingClientRect();
        const tooltipRect = tooltipRef.getBoundingClientRect();

        const margin = props.margin ?? 0;

        switch (props.position) {
            default:
            case "top":
                setLeft(targetRect.left + targetRect.width / 2 - tooltipRect.width / 2);
                setTop(targetRect.top - tooltipRect.height - margin);
                break;
            case "bottom":
                setLeft(targetRect.left + targetRect.width / 2 - tooltipRect.width / 2);
                setTop(targetRect.bottom + margin);
                break;
            case "left":
                setLeft(targetRect.left - tooltipRect.width - margin);
                setTop(targetRect.top + targetRect.height / 2 - tooltipRect.height / 2);
                break;
            case "right":
                setLeft(targetRect.right + margin);
                setTop(targetRect.top + targetRect.height / 2 - tooltipRect.height / 2);
                break;
        }

        delayTimeout = setTimeout(
            () => {
                setVisible(true);
            },
            (props.delay ?? 0) * 1000
        );
    }

    function mouseMoveHandler(event: MouseEvent) {
        if (props.position !== "mouse") {
            return;
        }

        setTop(event.clientY + (props.margin ?? 0));
        setLeft(event.clientX + (props.margin ?? 0));
    }

    function mouseLeaveHandler() {
        setVisible(false);
        clearTimeout(delayTimeout);
    }

    onMount(() => {
        if (!window) return;

        targetRef = document.getElementById(props.target);

        if (targetRef) {
            targetRef.addEventListener("mouseenter", mouseEnterHandler);
            targetRef.addEventListener("mouseleave", mouseLeaveHandler);
            targetRef.addEventListener("mousemove", mouseMoveHandler);
            window.addEventListener("touchmove", mouseLeaveHandler);
        }
    });

    onUpdate(() => {
        if (!window) return;

        const tooltipRect = tooltipRef.getBoundingClientRect();

        if (left + tooltipRect.width > document.body.clientWidth) {
            setLeft(document.body.clientWidth - tooltipRect.width);
        }

        if (top + tooltipRect.height > document.body.clientHeight) {
            setTop(document.body.clientHeight - tooltipRect.height);
        }

        if (left < 0) {
            setLeft(0);
        }

        if (top < 0) {
            setTop(0);
        }

        tooltipRef.style.top = `${top}px`;
        tooltipRef.style.left = `${left}px`;
        tooltipRef.style.visibility = visible ? "visible" : "hidden";
    }, [left, top, visible]);

    onUnMount(() => {
        clearTimeout(delayTimeout);
    });

    return (
        <div class={`tooltip ${props.variant} ${props.shape}`} ref={tooltipRef}>
            <Slot />
        </div>
    );
}
