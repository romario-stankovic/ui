import { Slot } from "@builder.io/mitosis";
import style from "./form-field.scss";

export default function FormField() {
    return (
        <div class="form-field">
            <Slot />
        </div>
    );
}
