import { onMount, onUpdate, Slot, useDefaultProps, useRef, useState } from "@builder.io/mitosis";
import style from "./select.scss";

type SelectVariant = "flat" | "raised" | "soft" | "outlined";

type SelectShape = "box" | "rounded" | "pill";

interface SelectProps {
    id?: string;
    variant?: SelectVariant;
    shape?: SelectShape;
    value?: string;
    disabled?: boolean;
    onChange?: (value: string | undefined) => void;
}

export default function Select(props: SelectProps) {
    useDefaultProps<typeof props>({
        variant: "outlined",
        shape: "rounded",
        value: undefined,
        disabled: false
    });

    const contentRef = useRef<HTMLDivElement | undefined>(undefined);
    const fieldRef = useRef<HTMLButtonElement | undefined>(undefined);

    const [open, setOpen] = useState<boolean>(false);
    const [val, setVal] = useState<string | undefined>(undefined);
    const [initialized, setInitialized] = useState<boolean>(false);

    function getAllOptions() {
        if (!contentRef) return [];

        const options: HTMLOptionElement[] = [];

        const stack: Element[] = [...contentRef.children];

        while (stack.length > 0) {
            const el = stack.shift();

            if (!el) break;

            if (el.tagName === "OPTION") {
                options.push(el as HTMLOptionElement);
            }

            stack.push(...el.children);
        }

        return options;
    }

    function getOptionLabel(value: string) {
        return getAllOptions().find((opt) => opt.value === value)?.innerText ?? "";
    }

    function handleClick(e: MouseEvent & { target: HTMLElement }) {
        if (!fieldRef) return;

        if (e.target.tagName === "OPTION") {
            setVal((e.target as HTMLOptionElement).value);
            setOpen(false);
            props.onChange?.((e.target as HTMLOptionElement).value);
            fieldRef.blur();
        }

        const fieldRect = fieldRef.getBoundingClientRect();

        if (
            e.clientX < fieldRect.left ||
            e.clientY > fieldRect.right ||
            e.clientY < fieldRect.top ||
            e.clientY > fieldRect.bottom
        ) {
            return;
        }

        setOpen(!open);
    }

    onMount(() => {
        if (!contentRef) return;
        if (!fieldRef) return;

        fieldRef.style.minWidth = `${contentRef.clientWidth}px`;

        getAllOptions().forEach((opt, idx) => {
            if (idx === 0) {
                setVal(opt.value);
            }

            if (opt.selected) {
                setVal(opt.value);
            }
        });

        contentRef.popover = "manual";
        contentRef.style.display = "none";

        setInitialized(true);
    });

    onUpdate(() => {
        if (!contentRef) return;
        if (!fieldRef) return;

        const fieldRect = fieldRef.getBoundingClientRect();

        if (open) {
            contentRef.style.display = "block";
            contentRef.style.top = `${fieldRect.bottom}px`;
            contentRef.style.left = `${fieldRect.left}px`;
            contentRef.style.minWidth = `${fieldRef.clientWidth}px`;
            contentRef.showPopover();
        } else {
            contentRef.style.display = "none";
            contentRef.hidePopover();
        }
    }, [open]);

    onUpdate(() => {
        if (!initialized) return;

        if (getAllOptions().find((opt) => opt.value === props.value) === undefined) {
            return;
        }

        setVal(props.value);
    }, [props.value]);

    return (
        <button
            type="button"
            id={props.id}
            ref={fieldRef}
            role="combobox"
            class={`select ${props.variant} ${props.shape} ${open ? "open" : ""}`}
            onClick={(e) => handleClick(e)}
            onBlur={(e) => setOpen(false)}
            disabled={props.disabled}
        >
            <div className="value">
                {getOptionLabel(val ?? "")}
                <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
                    <path
                        fill="currentColor"
                        d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
                    />
                </svg>
            </div>
            <div
                ref={contentRef}
                className={`content ${open ? "open" : ""} ${props.variant} ${props.shape !== "pill" ? props.shape : "rounded"}`}
            >
                <Slot />
            </div>
        </button>
    );
}
