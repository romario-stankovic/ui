import { Markdown } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";
import { title } from "process";

type Story = StoryObj<typeof Markdown>;

export default {
    title: "Components/Markdown",
    component: Markdown,
    tags: ["autodocs"],
    argTypes: {
        markdown: {
            control: "text"
        }
    },
    args: {
        markdown: "# Hello World!"
    },
    render: (args) => <Markdown {...args} />
} satisfies Meta;

export const Default: Story = {};
