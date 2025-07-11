import { syncArgs } from ".storybook/utils/utils.storybook";
import { Dialog } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "storybook/test";

type Story = StoryObj<typeof Dialog>;

export default {
    title: "Components/Dialog",
    component: Dialog,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "The appearance of the dialog"
        },
        shape: {
            control: "select",
            options: ["box", "rounded"],
            description: "The shape of the dialog"
        },
        open: {
            control: "boolean",
            description: "Is the dialog open"
        }
    },
    args: {
        variant: "flat",
        shape: "rounded",
        open: false,
        onClose: fn()
    },
    render: (args) => (
        <>
            <style>
                {`
                body {
                    padding: 0 !important;
                    height: 1000px !important;
                }
                `}
            </style>
            <Dialog {...args}>
                <p>Dialog</p>
            </Dialog>
        </>
    ),
    decorators: [syncArgs("onClose", "open", false)]
} satisfies Meta;

export const Flat: Story = {
    args: {
        variant: "flat"
    }
};

export const Raised: Story = {
    args: {
        variant: "raised"
    }
};

export const Soft: Story = {
    args: {
        variant: "soft"
    }
};

export const Outlined: Story = {
    args: {
        variant: "outlined"
    }
};

export const Box: Story = {
    args: {
        shape: "box"
    }
};

export const Rounded: Story = {
    args: {
        shape: "rounded"
    }
};
