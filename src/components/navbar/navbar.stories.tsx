import { Navbar } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";

type Story = StoryObj<typeof Navbar>;

export default {
    title: "Components/Navbar",
    component: Navbar,
    tags: ["autodocs"],
    argTypes: {
        default: {
            control: "text",
            description: "The content of the navbar"
        },
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "Appearance of the card"
        },
        sticky: {
            control: "boolean",
            description: "Should the navbar stick to the top of the screen"
        },
        hideOnScroll: {
            control: "boolean",
            description: "Should the navbar hide on scroll"
        }
    },
    args: {
        default: "Navbar",
        variant: "flat",
        sticky: false,
        hideOnScroll: false
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
            <Navbar {...args}>{args.default}</Navbar>
            <p>Content below the navbar</p>
        </>
    )
} satisfies Meta;

export const Flat: Story = {
    args: {
        variant: "flat"
    },
    parameters: {
        docs: {
            description: {
                story: "A flat navbar"
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
                story: "A raised navbar"
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
                story: "A soft navbar"
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
                story: "An outlined navbar"
            }
        }
    }
};

export const Sticky: Story = {
    args: {
        sticky: true
    },
    parameters: {
        docs: {
            description: {
                story: "A navbar which sticks to the top"
            }
        }
    }
};

export const HideOnScroll: Story = {
    args: {
        sticky: true,
        hideOnScroll: true
    },
    parameters: {
        docs: {
            description: {
                story: "A navbar which sticks to the top and auto hides on scroll"
            }
        }
    }
};
