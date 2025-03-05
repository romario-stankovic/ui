import { Show, Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./label.scss";

interface LabelProps {
    id?: string;
    target?: string;
    required?: boolean;
}

export default function Label(props: LabelProps) {
    useDefaultProps<typeof props>({
        required: false,
        target: ""
    });

    return (
        <label id={props.id} for={props.target} class="label">
            <Slot />
            <Show when={props.required}>
                <mark>*</mark>
            </Show>
        </label>
    );
}
