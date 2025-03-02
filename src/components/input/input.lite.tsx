import { onMount, onUpdate, useDefaultProps, useRef, useState } from "@builder.io/mitosis";
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
    variant?: InputVariant;
    shape?: InputShape;
    name?: string;
    placeholder?: string;
    type?: InputType;
    disabled?: boolean;
    valid?: boolean | ((value: string) => boolean);
}

export default function Input(props: InputProps) {
    const inputRef = useRef<HTMLInputElement | undefined>(undefined);

    const [dirty, setDirty] = useState<boolean>(false);

    useDefaultProps<typeof props>({
        variant: "outlined",
        shape: "rounded",
        name: "",
        placeholder: "",
        type: "text",
        disabled: false,
        valid: true
    });

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
        validate(inputRef?.value);
    }

    function handleBlur() {
        setDirty(true);
    }

    onMount(() => {
        if (!inputRef) return;
        if (!inputRef.form) return;

        inputRef.form.onsubmit = (e) => {
            e.preventDefault();
            if (!validate(inputRef.value)) {
                e.stopImmediatePropagation();
            }
            setDirty(false);
        };

        inputRef.form.onreset = (e) => {
            setDirty(false);
        };
    });

    onUpdate(() => {
        if (!inputRef) return;
        if (!dirty) return;

        validate(inputRef.value);
    }, [dirty]);

    return (
        <input
            ref={inputRef}
            onInput={(e) => handleInput()}
            onBlur={(e) => handleBlur()}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.disabled}
            class={`input ${props.variant} ${props.shape}`}
        />
    );
}
