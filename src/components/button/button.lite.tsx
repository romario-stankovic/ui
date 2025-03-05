import { Show, Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./button.scss";

type ButtonVariant = "flat" | "raised" | "soft" | "outlined" | "colored-outline" | "text";
type ButtonShape = "box" | "rounded" | "pill";
type ButtonType = "button" | "submit" | "reset";
type HrefTarget = "_blank" | "_self" | "_parent" | "_top" | string;

interface ButtonProps {
    id?: string;
    variant?: ButtonVariant;
    shape?: ButtonShape;
    type?: ButtonType;
    href?: string;
    target?: HrefTarget;
    iconOnly?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent) => void;
}

export default function Button(props: ButtonProps) {
    useDefaultProps<typeof props>({
        variant: "flat",
        shape: "rounded",
        type: "button",
        href: "",
        target: "",
        iconOnly: false,
        disabled: false
    });

    return (
        <Show
            when={!props.href}
            else={
                <a
                    id={props.id}
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
                id={props.id}
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
