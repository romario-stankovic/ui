import { onMount, useDefaultProps, useRef } from "@builder.io/mitosis";
import style from "./input.scss";

type InputVariant = "flat" | "raised" | "soft" | "outlined";
type InputShape = "box" | "rounded" | "pill";

type InputType =
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "month"
    | "number"
    | "password"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

interface InputProps {
    id?: string;
    variant?: InputVariant;
    shape?: InputShape;
    name?: string;
    value?: string;
    placeholder?: string;
    type?: InputType;
    disabled?: boolean;
    valid?: boolean | ((value: string) => boolean);
    onChange?: (value: string) => void;
}

export default function Input(props: InputProps) {
    useDefaultProps<typeof props>({
        variant: "outlined",
        shape: "rounded",
        name: "",
        value: "",
        placeholder: "",
        type: "text",
        disabled: false,
        valid: true
    });

    const inputRef = useRef<HTMLInputElement | undefined>(undefined);

    function validate(value: string) {
        if (!inputRef) return;

        const isValid = typeof props.valid === "boolean" ? props.valid : (props.valid?.(value) ?? true);

        if (!isValid) {
            inputRef.setCustomValidity(" ");
            inputRef.checkValidity();
        } else {
            inputRef.setCustomValidity("");
            inputRef.checkValidity();
        }

        return isValid;
    }

    function handleInput() {
        if (!inputRef) return;

        props.onChange?.(inputRef.value);
        validate(inputRef.value);
    }

    function handleBlur() {
        if (!inputRef) return;
        validate(inputRef.value);
    }

    function handleFormReset() {
        if (!inputRef) return;
        inputRef.value = "";
        inputRef.setCustomValidity("");
        props.onChange?.("");
    }

    onMount(() => {
        if (!inputRef) return;
        if (!inputRef.form) return;

        inputRef.form.addEventListener("validate", (e) => validate(inputRef.value) || e.preventDefault());
        inputRef.form.addEventListener("reset", handleFormReset);
    });

    return (
        <input
            id={props.id}
            ref={inputRef}
            value={props.value}
            onInput={() => handleInput()}
            onBlur={() => handleBlur()}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.disabled}
            class={`input ${props.variant} ${props.shape}`}
        />
    );
}
