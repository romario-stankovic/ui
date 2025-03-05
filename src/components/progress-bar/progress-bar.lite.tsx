import { onMount, onUpdate, useDefaultProps, useRef } from "@builder.io/mitosis";
import style from "./progress-bar.scss";

type ProgressBarVariant = "flat" | "raised" | "soft" | "outlined";
type ProgressBarShape = "box" | "pill";

interface ProgressBarProps {
    id?: string;
    variant?: ProgressBarVariant;
    shape?: ProgressBarShape;
    value?: number;
    buffer?: number;
    indeterminate?: boolean;
}

export default function ProgressBar(props: ProgressBarProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        shape: "pill",
        value: 0,
        buffer: 0,
        indeterminate: false
    });

    const progressBarRef = useRef<HTMLDivElement | undefined>(undefined);

    function updateProgress() {
        if (!progressBarRef) return;

        progressBarRef.style.setProperty("--progress", `${(props.value ?? 0) * 100}%`);
        progressBarRef.style.setProperty("--buffered", `${(props.buffer ?? 0) * 100}%`);
    }

    onMount(() => {
        updateProgress();
    });

    onUpdate(() => {
        updateProgress();
    }, [props.value, props.buffer]);

    return (
        <div
            id={props.id}
            ref={progressBarRef}
            role="progressbar"
            class={`progress-bar ${props.variant} ${props.shape} ${props.indeterminate ? "indeterminate" : ""}`}
        />
    );
}
