import { onMount, onUnMount, Slot, useDefaultProps, useRef } from "@builder.io/mitosis";
import style from "./scroll-view.scss";

type SnapPoint = "start" | "center" | "end";

interface ScrollViewProps {
    scrollX?: boolean;
    scrollY?: boolean;
    draggable?: boolean;
    snapX?: boolean;
    snapY?: boolean;
    snapPointX?: SnapPoint;
    snapPointY?: SnapPoint;
    scrollShadowX?: boolean;
    scrollShadowY?: boolean;
}

export default function ScrollView(props: ScrollViewProps) {
    useDefaultProps<typeof props>({
        scrollX: false,
        scrollY: false,
        draggable: false,
        snapX: false,
        snapY: false,
        snapPointX: "center",
        snapPointY: "center",
        scrollShadowX: false,
        scrollShadowY: false
    });

    const divRef = useRef<HTMLDivElement | undefined>(undefined);
    let snapTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    const position = useRef({
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0
    });

    function setSnapType() {
        if (!divRef) return;

        if (props.snapX && props.snapY) {
            divRef.style.setProperty("scroll-snap-type", "both mandatory");
        } else if (props.snapX) {
            divRef.style.setProperty("scroll-snap-type", "x mandatory");
        } else if (props.snapY) {
            divRef.style.setProperty("scroll-snap-type", "y mandatory");
        } else {
            divRef.style.setProperty("scroll-snap-type", "none");
        }
    }

    function getSnapPoint() {
        if (!divRef) return { x: 0, y: 0 };

        const oldLeft = divRef.scrollLeft;
        const oldTop = divRef.scrollTop;

        setSnapType();

        const newLeft = divRef.scrollLeft;
        const newTop = divRef.scrollTop;

        divRef.style.removeProperty("scroll-snap-type");

        divRef.scrollLeft = oldLeft;
        divRef.scrollTop = oldTop;

        return {
            x: newLeft,
            y: newTop
        };
    }

    function canDrag() {
        if (!divRef) return false;

        if (!props.scrollX && !props.scrollY) {
            return false;
        }

        if (!props.draggable) {
            return false;
        }

        if (divRef.scrollWidth < divRef.clientWidth && divRef.scrollHeight < divRef.clientHeight) {
            return false;
        }

        return true;
    }

    function handleMouseEnter() {
        if (!divRef) return;
        if (!canDrag()) return;

        divRef.style.cursor = "grab";
    }

    function handleMouseDown(event: MouseEvent) {
        if (!divRef) return;
        if (!canDrag()) return;

        clearTimeout(snapTimeout);

        divRef.style.scrollSnapType = "none";
        divRef.style.userSelect = "none";
        divRef.style.cursor = "grabbing";

        position.scrollX = divRef.scrollLeft;
        position.scrollY = divRef.scrollTop;
        position.x = event.clientX;
        position.y = event.clientY;

        divRef.addEventListener("mousemove", handleMouseMove);
        divRef.addEventListener("mouseup", handleMouseUp);
        divRef.addEventListener("mouseleave", handleMouseUp);
    }

    function handleMouseMove(event: MouseEvent) {
        if (!divRef) return;
        if (!canDrag()) return;

        if (props.scrollX) {
            const deltaX = event.clientX - position.x;
            divRef.scrollLeft = position.scrollX - deltaX;
        }

        if (props.scrollY) {
            const deltaY = event.clientY - position.y;
            divRef.scrollTop = position.scrollY - deltaY;
        }
    }

    function handleMouseUp() {
        if (!divRef) return;
        if (!canDrag()) return;

        const snapPoint = getSnapPoint();

        divRef.scrollTo({
            left: snapPoint.x,
            top: snapPoint.y,
            behavior: "smooth"
        });

        snapTimeout = setTimeout(() => {
            setSnapType();
        }, 500);

        divRef.removeEventListener("mouseup", handleMouseUp);
        divRef.removeEventListener("mousemove", handleMouseMove);
        divRef.removeEventListener("mouseleave", handleMouseUp);

        divRef.style.removeProperty("user-select");
        divRef.style.setProperty("cursor", "grab");
    }

    function showShadows() {
        if (!divRef) return;

        const width = divRef.scrollWidth - divRef.clientWidth;
        const height = divRef.scrollHeight - divRef.clientHeight;
        const scrollX = divRef.scrollLeft;
        const scrollY = divRef.scrollTop;

        const leftMask = props.scrollShadowX && scrollX > 0 ? "3rem" : "0rem";
        const rightMask = props.scrollShadowX && scrollX < width - 1 ? "3rem" : "0rem";
        const topMask = props.scrollShadowY && scrollY > 0 ? "3rem" : "0rem";
        const bottomMask = props.scrollShadowY && scrollY < height - 1 ? "3rem" : "0rem";

        const leftRightMask = `linear-gradient(to right, transparent, white ${leftMask}, white calc(100% - ${rightMask}), transparent)`;
        const topBottomMask = `linear-gradient(to bottom, transparent, white ${topMask}, white calc(100% - ${bottomMask}), transparent)`;
        divRef.style.maskImage = `${leftRightMask}, ${topBottomMask}`;
    }

    function handleScroll() {
        showShadows();
    }

    onMount(() => {
        if (!divRef) return;

        if (props.draggable) {
            divRef.addEventListener("mouseenter", handleMouseEnter);
            divRef.addEventListener("mousedown", handleMouseDown);
        }

        setSnapType();

        divRef.style.overflowX = props.scrollX === true ? "scroll" : "hidden";
        divRef.style.overflowY = props.scrollY === true ? "scroll" : "hidden";

        let childSnapX = props.snapPointX ?? "center";
        let childSnapY = props.snapPointY ?? "center";

        divRef.style.setProperty("--child-snap-align", `${childSnapX} ${childSnapY}`);
        showShadows();
    });

    onUnMount(() => {
        clearTimeout(snapTimeout);
    });

    return (
        <div ref={divRef} class="scroll-view" onScroll={() => handleScroll()}>
            <Slot />
        </div>
    );
}
