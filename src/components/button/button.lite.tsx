import { Show, Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./button.scss";

type ButtonVariant = "flat" | "raised" | "soft" | "outlined" | "colored-outline" | "text";
type ButtonShape = "box" | "rounded" | "pill";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
    variant?: ButtonVariant;
    shape?: ButtonShape;
    href?: string;
    target?: string;
    type?: ButtonType;
    iconOnly?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent) => void;
}

export default function Button(props: ButtonProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        shape: "rounded",
        type: "button",
        disabled: false,
        href: "",
        target: "",
        iconOnly: false,
        onClick: () => {}
    });

    return (
        <Show
            when={!props.href}
            else={
                <a
                    href={props.href}
                    target={props.target}
                    class={`button ${props.variant} ${props.shape} ${props.iconOnly ? "icon-only" : ""}`}
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
                type={props.type}
                class={`button ${props.variant} ${props.shape} ${props.iconOnly ? "icon-only" : ""}`}
                onClick={(e) => props.onClick?.(e)}
                aria-disabled={props.disabled}
                disabled={props.disabled}
            >
                <span>
                    <Slot />
                </span>
            </button>
        </Show>
    );
}
