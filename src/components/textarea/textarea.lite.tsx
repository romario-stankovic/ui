import { onMount, onUpdate, useDefaultProps, useRef, useState } from "@builder.io/mitosis";
import style from "./textarea.scss";

type TextareaVariant = "flat" | "raised" | "soft" | "outlined";

type TextareaShape = "box" | "rounded";

interface TextareaProps {
    variant?: TextareaVariant;
    shape?: TextareaShape;
    value?: string;
    name?: string;
    placeholder?: string;
    disabled?: boolean;
    resizable?: boolean;
    valid?: boolean | ((value: string) => boolean);
    onChange?: (value: string) => void;
}

export default function Textarea(props: TextareaProps) {
    useDefaultProps<typeof props>({
        variant: "outlined",
        shape: "rounded",
        name: "",
        placeholder: "",
        disabled: false,
        resizable: false,
        valid: true
    });

    const textareaRef = useRef<HTMLTextAreaElement | undefined>(undefined);

    function validate(value: string) {
        if (!textareaRef) return;

        const isValid = typeof props.valid === "boolean" ? props.valid : (props.valid?.(value) ?? true);

        if (!isValid) {
            textareaRef.setCustomValidity(" ");
            textareaRef.checkValidity();
        } else {
            textareaRef.setCustomValidity("");
            textareaRef.checkValidity();
        }

        return isValid;
    }

    function handleInput() {
        if (!textareaRef) return;

        props.onChange?.(textareaRef.value);
        validate(textareaRef.value);
    }

    function handleBlur() {
        if (!textareaRef) return;
        validate(textareaRef.value);
    }

    onMount(() => {
        if (!textareaRef) return;
        if (!textareaRef.form) return;

        textareaRef.form.onsubmit = (e) => {
            e.preventDefault();
            if (!validate(textareaRef.value)) {
                e.stopImmediatePropagation();
            }
        };

        textareaRef.form.onreset = (e) => {
            textareaRef.value = "";
            textareaRef.setCustomValidity("");
            props.onChange?.("");
        };
    });

    return (
        <textarea
            ref={textareaRef}
            value={props.value}
            onInput={() => handleInput()}
            onBlur={() => handleBlur()}
            name={props.name}
            placeholder={props.placeholder}
            disabled={props.disabled}
            class={`textarea ${props.resizable ? "resizable" : ""} ${props.variant} ${props.shape}`}
        />
    );
}
