import { onUnMount, onUpdate, Slot, useDefaultProps, useRef, useState } from "@builder.io/mitosis";
import style from "./tooltip.scss";
import PopoverCore from "src/core/popover/popover.core.lite";
import { isBrowser } from "src/utils/browser";

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
        margin: 4,
        delay: 0,
        position: "mouse"
    });

    let targetRef = useRef<HTMLElement | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    let delayTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    function handleMouseEnter() {
        clearTimeout(delayTimeout);
        delayTimeout = setTimeout(
            () => {
                setOpen(true);
            },
            (props.delay ?? 0) * 1000
        );
    }

    function handleMouseMove(event: MouseEvent) {
        if (props.position !== "mouse") {
            return;
        }

        setY(event.clientY + (props.margin ?? 0));
        setX(event.clientX + (props.margin ?? 0));
    }

    function handleMouseLeave() {
        setOpen(false);
        clearTimeout(delayTimeout);
    }

    function handlePopoverOpen(popover: HTMLDivElement) {
        if (!targetRef) return;

        const targetRect = targetRef.getBoundingClientRect();

        const margin = props.margin ?? 0;

        const popoverRect = popover.getBoundingClientRect();

        switch (props.position) {
            default:
            case "top":
                setX(targetRect.left + targetRect.width / 2 - popoverRect.width / 2);
                setY(targetRect.top - popoverRect.height - margin);
                break;
            case "bottom":
                setX(targetRect.left + targetRect.width / 2 - popoverRect.width / 2);
                setY(targetRect.bottom + margin);
                break;
            case "left":
                setX(targetRect.left - popoverRect.width - margin);
                setY(targetRect.top + targetRect.height / 2 - popoverRect.height / 2);
                break;
            case "right":
                setX(targetRect.right + margin);
                setY(targetRect.top + targetRect.height / 2 - popoverRect.height / 2);
                break;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let startX: number = 0;
        let startY: number = 0;

        switch (props.position) {
            default:
            case "bottom":
                startX = 0;
                startY = -0.5;
                break;
            case "top":
                startX = 0;
                startY = 0.5;
                break;
            case "left":
                startX = 0.5;
                startY = 0;
                break;
            case "right":
                startX = -0.5;
                startY = 0;
                break;
        }

        popover.animate(
            [
                { transform: `translate(${startX}em, ${startY}em)`, opacity: 0 },
                { transform: `translate(0, 0)`, opacity: 1 }
            ],
            {
                duration: 250
            }
        );
    }

    onUpdate(() => {
        if (!isBrowser()) return;

        if (targetRef) {
            targetRef.removeEventListener("mouseenter", handleMouseEnter);
            targetRef.removeEventListener("mouseleave", handleMouseLeave);
            targetRef.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleMouseLeave);
        }

        targetRef = document.getElementById(props.target);

        if (targetRef) {
            targetRef.addEventListener("mouseenter", handleMouseEnter);
            targetRef.addEventListener("mouseleave", handleMouseLeave);
            targetRef.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("touchmove", handleMouseLeave);
        }

        return () => {
            targetRef?.removeEventListener("mouseenter", handleMouseEnter);
            targetRef?.removeEventListener("mouseleave", handleMouseLeave);
            targetRef?.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleMouseLeave);
        };
    }, [props.target, props.position]);

    onUnMount(() => {
        clearTimeout(delayTimeout);
    });

    return (
        // @ts-ignore - Ignores no children on element error
        <PopoverCore
            x={x}
            y={y}
            open={open}
            id={props.id}
            cls={`tooltip ${props.variant} ${props.shape}`}
            onOpen={(el) => handlePopoverOpen(el)}
        >
            <Slot />
        </PopoverCore>
    );
}
