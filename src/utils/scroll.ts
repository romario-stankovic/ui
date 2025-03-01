let scrollLocks = 0;

export function useScrollLock() {
    function lock() {
        if (typeof window === "undefined") return;
        if (scrollLocks++ > 0) return;

        const top = window.scrollY;
        const left = window.scrollX;

        const overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth;
        const overflowY = document.documentElement.scrollHeight > document.documentElement.clientHeight;

        document.body.style.position = "fixed";
        document.body.style.top = `-${top}px`;
        document.body.style.left = `-${left}px`;
        document.body.style.overflow = `${overflowX ? "scroll" : "hidden"} ${overflowY ? "scroll" : "hidden"}`;
    }

    function unlock() {
        if (typeof window === "undefined") return;
        if (--scrollLocks > 0) return;

        const top = Math.abs(parseFloat(document.body.style.getPropertyValue("top").replace("px", "")));
        const left = Math.abs(parseFloat(document.body.style.getPropertyValue("left").replace("px", "")));

        document.body.style.removeProperty("position");
        document.body.style.removeProperty("top");
        document.body.style.removeProperty("left");
        document.body.style.removeProperty("overflow");

        window.scrollTo({ left: left, top: top, behavior: "instant" });
    }

    function isLocked() {
        return scrollLocks > 0;
    }

    return {
        lock,
        unlock,
        isLocked
    };
}
