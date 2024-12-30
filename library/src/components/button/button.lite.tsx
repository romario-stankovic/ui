import { Slot } from "@builder.io/mitosis";
import "src/components/button/button.scss";

export default function Button() {
    return <button><Slot /></button>;
}