import { Show, Slot, useDefaultProps } from "@builder.io/mitosis";
import "src/components/button/button.scss";

interface ButtonProps {
    variant?: "flat" | "raised" | "soft" | "outlined" | "colored-outline" | "text";
    shape?: "box" | "rounded" | "pill";
    href?: string;
    target?: string;
    type?: "button" | "submit" | "reset";
    iconOnly?: boolean;
    disabled?: boolean;
    onClick?: (event: MouseEvent) => void;
}

export default function Button(props: ButtonProps) {
    useDefaultProps<ButtonProps>({
        variant: "flat",
        shape: "rounded",
        type: "button",
        disabled: false,
        href: "",
        target: "",
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
