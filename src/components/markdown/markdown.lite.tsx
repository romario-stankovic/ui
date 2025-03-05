import { useDefaultProps } from "@builder.io/mitosis";
import { marked, MarkedOptions } from "marked";
import style from "./markdown.scss";
import insane, { SanitizeOptions } from "insane";

interface MarkdownProps {
    id?: string;
    markdown?: string;
    markedOptions?: Omit<MarkedOptions, "async">;
    sanitizeOptions?: SanitizeOptions;
}

export default function Markdown(props: MarkdownProps) {
    useDefaultProps<typeof props>({
        markdown: "",
        markedOptions: {},
        sanitizeOptions: {}
    });

    function getMarkdown() {
        return insane(
            marked.parse(props.markdown ?? "", { ...props.markedOptions, async: false }),
            props.sanitizeOptions
        );
    }

    return <div id={props.id} class="markdown" innerHTML={getMarkdown()} />;
}
