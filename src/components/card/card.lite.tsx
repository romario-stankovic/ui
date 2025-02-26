import { Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./card.scss";

type CardVariant = "flat" | "raised" | "soft" | "outlined";

interface CardProps {
    variant?: CardVariant;
}

export default function Card(props: CardProps) {
    useDefaultProps<typeof props>({
        variant: "outlined"
    });

    return (
        <div class={`card ${props.variant}`}>
            <Slot />
        </div>
    );
}
