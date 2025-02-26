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
    },
    parameters: {
        docs: {
            description: {
                story: "A card with default content color and no border"
            }
        }
    }
};

export const Raised: Story = {
    args: {
        variant: "raised"
    },
    parameters: {
        docs: {
            description: {
                story: "A raised card with a subtle shadow indicating elevation"
            }
        }
    }
};

export const Soft: Story = {
    args: {
        variant: "soft"
    },
    parameters: {
        docs: {
            description: {
                story: "A soft card with a semi-transparent background"
            }
        }
    }
};

export const Outlined: Story = {
    args: {
        variant: "outlined"
    },
    parameters: {
        docs: {
            description: {
                story: "An outlined card with a border"
            }
        }
    }
};
