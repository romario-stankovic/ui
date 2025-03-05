import { onMount, onUnMount, onUpdate, Slot, useDefaultProps, useRef, useState } from "@builder.io/mitosis";
import style from "./tooltip.scss";

type TooltipPosition = "top" | "right" | "bottom" | "left" | "mouse";
type TooltipVariant = "flat" | "raised" | "soft" | "outlined" | "colored-outline";
type TooltipShape = "box" | "rounded" | "pill";

interface TooltipProps {
    id?: string;
    target: string;
    variant?: TooltipVariant;
    shape?: TooltipShape;
    margin?: number;
    delay?: number;
    position?: TooltipPosition;
}

export default function Tooltip(props: TooltipProps) {
    useDefaultProps<typeof props>({
        target: "",
        variant: "outlined",
        shape: "rounded",
        margin: 0,
        delay: 0,
        position: "mouse"
    });

    const tooltipRef = useRef<HTMLDivElement | undefined>(undefined);
    let targetRef = useRef<HTMLElement | null>(null);

    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(false);

    let delayTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    function mouseEnterHandler() {
        if (!targetRef || !tooltipRef) return;

        const targetRect = targetRef.getBoundingClientRect();
        const tooltipRect = tooltipRef.getBoundingClientRect();

        const margin = props.margin ?? 0;

        switch (props.position) {
            default:
            case "top":
                setX(targetRect.left + targetRect.width / 2 - tooltipRect.width / 2);
                setY(targetRect.top - tooltipRect.height - margin);
                break;
            case "bottom":
                setX(targetRect.left + targetRect.width / 2 - tooltipRect.width / 2);
                setY(targetRect.bottom + margin);
                break;
            case "left":
                setX(targetRect.left - tooltipRect.width - margin);
                setY(targetRect.top + targetRect.height / 2 - tooltipRect.height / 2);
                break;
            case "right":
                setX(targetRect.right + margin);
                setY(targetRect.top + targetRect.height / 2 - tooltipRect.height / 2);
                break;
        }

        clearTimeout(delayTimeout);
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

        setY(event.clientY + (props.margin ?? 0));
        setX(event.clientX + (props.margin ?? 0));
    }

    function mouseLeaveHandler() {
        setVisible(false);
        clearTimeout(delayTimeout);
    }

    onUpdate(() => {
        if (typeof window === "undefined") return;

        if (targetRef) {
            targetRef.removeEventListener("mouseenter", mouseEnterHandler);
            targetRef.removeEventListener("mouseleave", mouseLeaveHandler);
            targetRef.removeEventListener("mousemove", mouseMoveHandler);
            window.removeEventListener("touchmove", mouseLeaveHandler);
        }

        targetRef = document.getElementById(props.target);

        if (targetRef) {
            targetRef.addEventListener("mouseenter", mouseEnterHandler);
            targetRef.addEventListener("mouseleave", mouseLeaveHandler);
            targetRef.addEventListener("mousemove", mouseMoveHandler);
            window.addEventListener("touchmove", mouseLeaveHandler);
        }
    }, [props.target]);

    onUpdate(() => {
        if (!tooltipRef) return;
        if (typeof window === "undefined") return;

        const tooltipRect = tooltipRef.getBoundingClientRect();

        if (x + tooltipRect.width > document.body.clientWidth) {
            setX(document.body.clientWidth - tooltipRect.width);
        }

        if (y + tooltipRect.height > document.body.clientHeight) {
            setY(document.body.clientHeight - tooltipRect.height);
        }

        if (x < 0) {
            setX(0);
        }

        if (y < 0) {
            setY(0);
        }

        tooltipRef.style.top = `${y}px`;
        tooltipRef.style.left = `${x}px`;
    }, [x, y]);

    function animate() {
        if (!tooltipRef) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let startX: `${number}em` = "0em";
        let startY: `${number}em` = "0em";

        switch (props.position) {
            default:
            case "bottom":
                startX = "0em";
                startY = "-0.5em";
                break;
            case "top":
                startX = "0em";
                startY = "0.5em";
                break;
            case "left":
                startX = "0.5em";
                startY = "0em";
                break;
            case "right":
                startX = "-0.5em";
                startY = "0em";
                break;
        }

        tooltipRef.animate(
            [
                { transform: `translate(${startX}, ${startY})`, opacity: 0 },
                { transform: `translate(0, 0)`, opacity: 1 }
            ],
            {
                duration: 250
            }
        );
    }

    onUpdate(() => {
        if (typeof window === "undefined") return;
        if (!tooltipRef) return;

        tooltipRef.popover = "manual";
        tooltipRef.showPopover();

        if (visible === true) {
            animate();
        }

        tooltipRef.style.visibility = visible ? "visible" : "hidden";
    }, [visible]);

    onUnMount(() => {
        clearTimeout(delayTimeout);
    });

    return (
        <div id={props.id} role="tooltip" class={`tooltip ${props.variant} ${props.shape}`} ref={tooltipRef}>
            <Slot />
        </div>
    );
}
