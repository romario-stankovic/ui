import { Show, Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./chip.scss";

type ChipVariant = "flat" | "raised" | "soft" | "outlined" | "colored-outline" | "text";
type ChipShape = "box" | "rounded" | "pill";
type HrefTarget = "_blank" | "_self" | "_parent" | "_top" | string;

interface ChipProps {
    id?: string;
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
        variant: "outlined",
        shape: "pill",
        interactive: false,
        href: "",
        target: "",
        iconOnly: false,
        disabled: false
    });

    function handleAnchorKeyUp(
        e: KeyboardEvent & {
            currentTarget: HTMLAnchorElement;
            target: HTMLAnchorElement;
        }
    ) {
        if (e.key === " ") {
            e.target.click();
        }
    }

    return (
        <Show
            when={!props.interactive}
            else={
                <Show
                    when={!props.href}
                    else={
                        <a
                            id={props.id}
                            href={props.href}
                            target={props.target}
                            class={`chip ${props.variant} ${props.shape} ${props.iconOnly ? "icon-only" : ""}`}
                            onClick={(e) => props.onClick?.(e)}
                            onKeyUp={(e) => handleAnchorKeyUp(e)}
                            aria-disabled={props.disabled}
                        >
                            <span>
                                <Slot />
                            </span>
                        </a>
                    }
                >
                    <button
                        type="button"
                        id={props.id}
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
                id={props.id}
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
