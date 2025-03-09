import { Slot, useDefaultProps } from "@builder.io/mitosis";
import style from "./table.scss";

interface TableProps {
    id?: string;
    striped?: boolean;
    hoverable?: boolean;
}

export default function Table(props: TableProps) {
    useDefaultProps<typeof props>({
        striped: false,
        hoverable: false
    });

    return (
        <div id={props.id} class="table">
            <table class={`${props.striped ? "striped" : ""} ${props.hoverable ? "hoverable" : ""}`}>
                <Slot />
            </table>
        </div>
    );
}
