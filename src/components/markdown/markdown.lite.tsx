import { useDefaultProps } from "@builder.io/mitosis";
import { marked } from "marked";
import style from "./markdown.scss";

interface MarkdownProps {
    markdown?: string;
}

export default function Markdown(props: MarkdownProps) {
    useDefaultProps<typeof props>({
        markdown: ""
    });

    function getMarkdown() {
        return marked.parse(props.markdown ?? "", { async: false });
    }

    return <div class="markdown" innerHTML={getMarkdown()} />;
}
