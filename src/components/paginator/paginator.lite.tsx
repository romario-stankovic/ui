import { For, Fragment, onUpdate, Show, Slot, useDefaultProps, useState } from "@builder.io/mitosis";
import style from "./paginator.scss";

type PaginatorVariant = "soft" | "outlined" | "colored-outline";
type PaginatorShape = "box" | "rounded" | "pill";

interface PaginatorProps {
    id?: string;
    variant?: PaginatorVariant;
    shape?: PaginatorShape;
    page?: number;
    totalPages?: number;
    siblings?: number;
    showNextButton?: boolean;
    showPreviousButton?: boolean;
    showFirstButton?: boolean;
    showLastButton?: boolean;
    onChange?: (value: number) => void;
}

export default function Paginator(props: PaginatorProps) {
    useDefaultProps<typeof props>({
        variant: "outlined",
        shape: "pill",
        page: 1,
        totalPages: 0,
        siblings: 2,
        showNextButton: false,
        showPreviousButton: false,
        showFirstButton: false,
        showLastButton: false
    });

    const [pages, setPages] = useState<Array<number>>([]);

    function goFirst() {
        props.onChange?.(pages.length > 0 ? 1 : 0);
    }

    function goLast() {
        props.onChange?.(pages.length > 0 ? (props.totalPages ?? 0) : 0);
    }

    function goPrevious() {
        const current = props.page ?? 0;

        if (current > 1) {
            props.onChange?.(current - 1);
        }
    }

    function goNext() {
        const current = props.page ?? 0;

        if (current < (props.totalPages ?? 0)) {
            props.onChange?.(current + 1);
        }
    }

    onUpdate(() => {
        const max = props.totalPages ?? 0;
        const delta = props.siblings ?? 2;
        const curr = props.page ?? 0;

        const pageList = Array(props.totalPages)
            .fill(0)
            .map((_, idx) => idx + 1)
            .filter((p) => {
                // First page
                if (p === 1) {
                    return true;
                }

                // Last page
                if (p === max) {
                    return true;
                }

                // Middle pages
                if (p >= curr - delta && p <= curr + delta) {
                    return true;
                }

                // Pages at the beginning
                if (p <= delta * 2 + 3 && curr <= delta + 3) {
                    return true;
                }

                // Pages at the end
                if (p >= max - (delta * 2 + 2) && curr >= max - (delta + 2)) {
                    return true;
                }

                // Show all pages if delta is big enough
                if (max <= delta * 2 + 5) {
                    return true;
                }

                return false;
            });

        setPages(pageList);
    }, [props.page, props.totalPages, props.siblings]);

    return (
        <div class={`paginator ${props.variant} ${props.shape}`} id={props.id}>
            <Show when={props.showFirstButton}>
                <button class={`${props.variant} ${props.shape}`} type="button" onClick={(e) => goFirst()}>
                    <Slot name="firstButtonContent">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m17 18l-6-6l6-6M7 6v12"
                                />
                            </svg>
                        </span>
                    </Slot>
                </button>
            </Show>
            <Show when={props.showPreviousButton}>
                <button class={`${props.variant} ${props.shape}`} type="button" onClick={(e) => goPrevious()}>
                    <span>
                        <Slot name="previousButtonContent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m15 18l-6-6l6-6"
                                />
                            </svg>
                        </Slot>
                    </span>
                </button>
            </Show>
            <For each={pages}>
                {(page, idx) => (
                    <Fragment key={`${idx}`}>
                        <Show when={pages[idx] - pages[idx - 1] > 1}>
                            <span innerHTML="&mldr;" />
                        </Show>
                        <button
                            class={`${props.page === page ? "flat" : props.variant} ${props.shape}`}
                            type="button"
                            onClick={(e) => props.onChange?.(page)}
                        >
                            <span>{page}</span>
                        </button>
                    </Fragment>
                )}
            </For>
            <Show when={props.showNextButton}>
                <button class={`${props.variant} ${props.shape}`} type="button" onClick={(e) => goNext()}>
                    <span>
                        <Slot name="nextButtonContent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m9 18l6-6l-6-6"
                                />
                            </svg>
                        </Slot>
                    </span>
                </button>
            </Show>
            <Show when={props.showLastButton}>
                <button class={`${props.variant} ${props.shape}`} type="button" onClick={(e) => goLast()}>
                    <span>
                        <Slot name="lastButtonContent">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m7 18l6-6l-6-6m10 0v12"
                                />
                            </svg>
                        </Slot>
                    </span>
                </button>
            </Show>
        </div>
    );
}
