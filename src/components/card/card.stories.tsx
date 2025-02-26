import { Card } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";

type Story = StoryObj<typeof Card>;

export default {
    title: "Components/Card",
    component: Card,
    tags: ["autodocs"],
    argTypes: {
        default: {
            control: "text",
            description: "The text content of the card"
        },
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "Appearance of the card"
        }
    },
    args: {
        default: "Card",
        variant: "flat"
    },
    render: (args) => <Card {...args}>{args.default}</Card>
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
