import { Show, Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./chip.scss";

type ChipVariant = "flat" | "raised" | "soft" | "outlined" | "colored-outline" | "text";
type ChipShape = "box" | "rounded" | "pill";
type HrefTarget = "_blank" | "_self" | "_parent" | "_top" | string;

interface ChipProps {
    variant?: ChipVariant;
    shape?: ChipShape;
    interactive?: boolean;
    href?: string;
    target?: HrefTarget;
    iconOnly?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent) => void;
}

export default function Chip(props: ChipProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        shape: "pill",
        interactive: false,
        href: "",
        target: "",
        disabled: false,
        onClick: () => {}
    });

    return (
        <Show
            when={!props.interactive}
            else={
                <Show
                    when={!props.href}
                    else={
                        <a
                            href={props.href}
                            target={props.target}
                            class={`chip ${props.variant} ${props.shape} ${props.iconOnly ? "icon-only" : ""}`}
                            onClick={(e) => props.onClick?.(e)}
                            aria-disabled={props.disabled}
                        >
                            <span>
                                <Slot />
                            </span>
                        </a>
                    }
                >
                    <button
                        class={`chip ${props.variant} ${props.shape} ${props.iconOnly ? "icon-only" : ""}`}
                        aria-disabled={props.disabled}
                        disabled={props.disabled}
                        onClick={(e) => props.onClick?.(e)}
                    >
                        <span>
                            <Slot />
                        </span>
                    </button>
                </Show>
            }
        >
            <div
                class={`chip ${props.variant} ${props.shape} ${props.iconOnly ? "icon-only" : ""}`}
                aria-disabled={props.disabled}
            >
                <span>
                    <Slot />
                </span>
            </div>
        </Show>
    );
}
