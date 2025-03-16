import { onMount, onUnMount, onUpdate, Slot, useDefaultProps, useRef, useState } from "@builder.io/mitosis";
import { useScrollLock } from "src/utils/scroll";

interface ModalCoreProps {
    id?: string;
    cls?: string;
    open?: boolean;
    onOpen?: (el: HTMLDialogElement) => void;
    onClose?: (el: HTMLDialogElement) => void | Promise<void>;
}

const scrollLock = useScrollLock();

export default function ModalCore(props: ModalCoreProps) {
    useDefaultProps<typeof props>({
        open: false
    });

    const [initialized, setInitialized] = useState<boolean>(false);

    const modalRef = useRef<HTMLDialogElement | undefined>(undefined);

    function handleClick(event: MouseEvent) {
        if (!modalRef) return;

        if (event.target !== modalRef) {
            return;
        }

        const rect = modalRef.getBoundingClientRect();
        if (
            event.clientY < rect.top ||
            event.clientY > rect.bottom ||
            event.clientX < rect.left ||
            event.clientX > rect.right
        ) {
            props.onClose?.(modalRef);
        }
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (!modalRef) return;

        if (event.key === "Escape") {
            event.preventDefault();
            props.onClose?.(modalRef);
        }
    }

    onUpdate(() => {
        if (!modalRef) return;
        if (!initialized) return;

        if (props.open) {
            scrollLock.lock();
            modalRef.showModal();
            modalRef.focus();
            props.onOpen?.(modalRef);
        } else {
            scrollLock.unlock();
            (async () => {
                await props.onClose?.(modalRef);
                modalRef.close();
            })();
        }
    }, [props.open]);

    onUnMount(() => {
        if (props.open) {
            scrollLock.unlock();
        }
    });

    onMount(() => {
        if (!modalRef) return;
        if (props.open) {
            scrollLock.lock();
            modalRef.showModal();
            modalRef.focus();
        }
        setInitialized(true);
    });

    return (
        <dialog
            ref={modalRef}
            id={props.id}
            class={`modal ${props.cls}`}
            onClick={(e) => handleClick(e)}
            onKeyDown={(e) => handleKeyDown(e)}
        >
            <Slot />
        </dialog>
    );
}
