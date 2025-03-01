import { Label } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Label>;

export default {
    title: "Components/Label",
    component: Label,
    tags: ["autodocs"],
    argTypes: {
        default: {
            control: "text",
            description: "The label text"
        },
        required: {
            control: "boolean",
            description: "Mark the label's field as required"
        }
    },
    args: {
        default: "Label",
        required: false
    },
    render: (args) => <Label {...args}>{args.default}</Label>
} satisfies Meta;

export const Default: Story = {};

export const Required: Story = {
    args: {
        required: true
    }
};
