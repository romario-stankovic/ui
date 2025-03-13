import { Slot } from "@builder.io/mitosis";

type FormEvent = Event & {
    submitter: HTMLElement;
} & {
    currentTarget: HTMLFormElement;
    target: HTMLFormElement;
};

interface FormProps {
    onSubmit: (e: FormEvent) => any | Promise<any>;
}

export default function Form(props: FormProps) {
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const valid = e.target.dispatchEvent(new Event("validate", { cancelable: true }));

        if (!valid) {
            return;
        }

        props.onSubmit?.(e);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Slot />
        </form>
    );
}
