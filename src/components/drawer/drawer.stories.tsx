import { Drawer } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";
import { syncArgs } from "../../../.storybook/utils/utils.storybook";

type Story = StoryObj<typeof Drawer>;

export default {
    title: "Components/Drawer",
    component: Drawer,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "The appearance of the drawer"
        },
        position: {
            control: "select",
            options: ["top", "right", "bottom", "left"],
            description: "The position of the drawer"
        },
        open: {
            control: "boolean",
            description: "Is the drawer open"
        }
    },
    args: {
        variant: "flat",
        position: "left",
        open: false,
        onDismiss: fn(),
        onClosed: fn()
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
            <Drawer {...args}>
                <p>Drawer</p>
            </Drawer>
        </>
    ),
    decorators: [syncArgs("onDismiss", "open", false)]
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

export const Top: Story = {
    args: {
        position: "top"
    }
};

export const Right: Story = {
    args: {
        position: "right"
    }
};

export const Bottom: Story = {
    args: {
        position: "bottom"
    }
};

export const Left: Story = {
    args: {
        position: "left"
    }
};
