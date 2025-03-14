import { onMount, onUpdate, Slot, useDefaultProps, useRef } from "@builder.io/mitosis";
import style from "./popover.core.scss";
import { isBrowser } from "src/utils/browser";

interface PopoverCoreProps {
    id?: string;
    cls?: string;
    x?: number;
    y?: number;
    open?: boolean;
    onOpen?: (el: HTMLDivElement) => void;
    onClose?: (el: HTMLDivElement) => void;
}

export default function PopoverCore(props: PopoverCoreProps) {
    useDefaultProps<typeof props>({
        x: 0,
        y: 0,
        open: false
    });

    const popoverRef = useRef<HTMLDivElement | undefined>(undefined);

    function showPopover() {
        if (!popoverRef) return;

        popoverRef.style.display = "block";
        popoverRef.showPopover();
        updatePosition();
        props.onOpen?.(popoverRef);
    }

    function closePopover() {
        if (!popoverRef) return;

        popoverRef.style.display = "none";
        popoverRef.hidePopover();
        props.onClose?.(popoverRef);
    }

    function updatePosition() {
        if (!popoverRef) return;
        if (!props.open) return;

        let windowWidth = typeof window !== "undefined" ? document.body.clientWidth : 0;
        let windowHeight = typeof window !== "undefined" ? document.body.clientHeight : 0;

        const popoverRect = popoverRef.getBoundingClientRect();

        let posX = props.x ?? 0;
        let posY = props.y ?? 0;

        if (posX + popoverRect.width > windowWidth) {
            posX = windowWidth - popoverRect.width;
        }

        if (posY + popoverRect.height > windowHeight) {
            posY = windowHeight - popoverRect.height;
        }

        if (posX < 0) {
            posX = 0;
        }

        if (posY < 0) {
            posY = 0;
        }

        popoverRef.style.left = `${posX}px`;
        popoverRef.style.top = `${posY}px`;
    }

    onMount(() => {
        if (!popoverRef) return;
        popoverRef.popover = "manual";

        if (!isBrowser()) return;

        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("resize", updatePosition);
        };
    });

    onUpdate(() => {
        if (props.open) {
            showPopover();
        } else {
            closePopover();
        }
    }, [props.open]);

    onUpdate(() => {
        updatePosition();
    }, [props.x, props.y]);

    return (
        <div ref={popoverRef} id={props.id} class={`popover ${props.cls}`}>
            <Slot />
        </div>
    );
}
