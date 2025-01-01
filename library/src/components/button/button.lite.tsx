import { Show, Slot } from "@builder.io/mitosis";
import "src/components/button/button.scss";

interface ButtonProps {
    variant?: "flat" | "raised" | "soft" | "outlined" | "colored-outline" | "text";
    href?: string;
}

export default function Button(props: ButtonProps) {
    return (
        <Show
            when={!props.href}
            else={
                <a href={props.href} class={`button ${props.variant ?? "flat"}`}>
                    <span><Slot /></span>
                </a>
            }
        >
            <button class={`button ${props.variant ?? "flat"}`}>
                <span><Slot /></span>
            </button>
        </Show>
    );
}