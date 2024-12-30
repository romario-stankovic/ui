import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@packages/react";

type Story = StoryObj<typeof Button>;

export default {
    title: "Components/Button",
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        default: {
            control: "text",
            description: "Default text of the button"
        },
        variant: {
            control: "select",
            options: ["flat", "soft", "outlined", "colored-outline"],
            description: "Appearance of the button"
        },
        color: {
            control: "color"
        }
    },
    args: {
        default: "Button",
        variant: "flat"
    },
    render: (args) => <Button {...args}>{args.default}</Button>
} satisfies Meta;

export const Flat: Story = {
    args: {
        variant: "flat"
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

export const ColoredOutline: Story = {
    args: {
        variant: "colored-outline"
    }
};