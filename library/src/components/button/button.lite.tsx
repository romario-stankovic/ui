import { Slot } from "@builder.io/mitosis";
import "src/components/button/button.scss";

interface ButtonProps {
    variant?: "flat" | "raised" | "soft" | "outlined" | "colored-outline";
}

export default function Button(props: ButtonProps) {
    return (
        <button class={`button ${props.variant ?? "flat"}`}>
            <span><Slot /></span>
        </button>
    );
}