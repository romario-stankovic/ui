import { Show, Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./chip.scss";

type ChipVariant = "flat" | "raised" | "soft" | "outlined" | "colored-outline" | "text";
type ChipShape = "box" | "rounded" | "pill";

interface ChipProps {
    variant?: ChipVariant;
    shape?: ChipShape;
    interactive?: boolean;
    disabled?: boolean;
    iconOnly?: boolean;
    onClick?: (event: MouseEvent) => void;
}

export default function Chip(props: ChipProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        shape: "pill",
        interactive: false,
        disabled: false,
        onClick: () => {}
    });

    return (
        <Show
            when={!props.interactive}
            else={
                <button
                    class={`chip ${props.variant} ${props.shape} ${props.interactive ? "interactive" : ""} ${props.iconOnly ? "icon-only" : ""}`}
                    aria-disabled={props.disabled}
                    disabled={props.disabled}
                    onClick={(e) => props.onClick?.(e)}
                >
                    <span>
                        <Slot />
                    </span>
                </button>
            }
        >
            <div
                class={`chip ${props.variant} ${props.shape} ${props.interactive ? "interactive" : ""} ${props.iconOnly ? "icon-only" : ""}`}
                aria-disabled={props.disabled}
            >
                <span>
                    <Slot />
                </span>
            </div>
        </Show>
    );
}
