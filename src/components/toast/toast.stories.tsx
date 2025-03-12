import { syncArgs } from ".storybook/utils/utils.storybook";
import { Toast } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";

type Story = StoryObj<typeof Toast>;

export default {
    title: "Components/Toast",
    component: Toast,
    tags: ["autodocs"],
    argTypes: {
        default: {
            control: "text",
            description: "The content of the notification"
        },
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "Appearance of the toast"
        },
        shape: {
            control: "select",
            options: ["box", "rounded", "pill"],
            description: "Shape of the toast"
        },
        position: {
            control: "select",
            options: ["top-left", "top", "top-right", "bottom-left", "bottom", "bottom-right"],
            description: "Position of the toast"
        },
        open: {
            control: "boolean",
            description: "Is the notification open"
        },
        duration: {
            control: "number",
            description: "Duration of the notification before it requests to be dismissed"
        }
    },
    args: {
        default: "Toast Notification",
        variant: "outlined",
        shape: "rounded",
        position: "bottom-right",
        open: false,
        duration: 0,
        onDismiss: fn()
    },
    render: (args) => <Toast {...args}>{args.default}</Toast>,
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

export const Pill: Story = {
    args: {
        shape: "pill"
    }
};

export const TopLeft: Story = {
    args: {
        position: "top-left"
    }
};

export const TopMiddle: Story = {
    args: {
        position: "top"
    }
};

export const TopRight: Story = {
    args: {
        position: "top-right"
    }
};

export const BottomLeft: Story = {
    args: {
        position: "bottom-left"
    }
};

export const BottomMiddle: Story = {
    args: {
        position: "bottom"
    }
};

export const BottomRight: Story = {
    args: {
        position: "bottom-right"
    }
};

export const AutoClose: Story = {
    args: {
        duration: 3
    }
};
