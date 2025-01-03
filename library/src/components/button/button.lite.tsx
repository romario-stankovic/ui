import { Show, Slot } from "@builder.io/mitosis";
import "src/components/button/button.scss";

interface ButtonProps {
    variant?: "flat" | "raised" | "soft" | "outlined" | "colored-outline" | "text";
    href?: string;
    target?: string;
    type: "button" | "submit" | "reset";
    onClick?: (event: MouseEvent) => void;
}

export default function Button(props: ButtonProps) {

    return (
        <Show
            when={!props.href}
            else={
                <a href={props.href} target={props.target} class={`button ${props.variant ?? "flat"}`} onClick={props.onClick}>
                    <span><Slot /></span>
                </a>
            }
        >
            <button type={props.type} class={`button ${props.variant ?? "flat"}`} onClick={props.onClick}>
                <span><Slot /></span>
            </button>
        </Show>
    );
}