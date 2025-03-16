import { Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./card.scss";

type CardVariant = "flat" | "raised" | "soft" | "outlined";
type CardShape = "box" | "rounded";

interface CardProps {
    id?: string;
    variant?: CardVariant;
    shape?: CardShape;
}

export default function Card(props: CardProps) {
    useDefaultProps<typeof props>({
        variant: "outlined",
        shape: "rounded"
    });

    return (
        <div id={props.id} class={`card ${props.variant} ${props.shape}`}>
            <Slot />
        </div>
    );
}
