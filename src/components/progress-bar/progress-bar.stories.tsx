import { ProgressBar } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";

type Story = StoryObj<typeof ProgressBar>;

export default {
    title: "Components/Progress Bar",
    component: ProgressBar,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "Appearance of the progress bar"
        },
        shape: {
            control: "select",
            options: ["box", "pill"],
            description: "Shape of the button"
        },
        value: {
            control: {
                type: "range",
                min: 0,
                max: 1,
                step: 0.01
            },
            description: "The progress bar value"
        },
        buffer: {
            control: {
                type: "range",
                min: 0,
                max: 1,
                step: 0.01
            },
            description: "The buffered value of the progress bar"
        },
        indeterminate: {
            control: "boolean",
            description: "Is the progress bar indeterminate?"
        }
    },
    args: {
        variant: "flat",
        shape: "box",
        value: 0.5,
        buffer: 0,
        indeterminate: false
    },
    render: (args) => <ProgressBar {...args} />
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

export const Pill: Story = {
    args: {
        shape: "pill"
    }
};

export const Buffered: Story = {
    args: {
        buffer: 0.75
    }
};

export const Indeterminate: Story = {
    args: {
        indeterminate: true
    }
};
