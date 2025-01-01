import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@packages/react";
import { Icon as IconifyIcon } from "@iconify-icon/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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
            options: ["flat", "raised", "soft", "outlined", "colored-outline", "text"],
            description: "Appearance of the button"
        },
        href: {
            control: "text",
            description: "Link to navigate to when the button is clicked"
        }
    },
    args: {
        default: "Button",
        variant: "flat",
        href: ""
    },
    render: (args) => <Button {...args}>{args.default}</Button>
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

export const ColoredOutline: Story = {
    args: {
        variant: "colored-outline"
    }
};

export const Text: Story = {
    args: {
        variant: "text"
    }
};

export const Link: Story = {
    args: {
        href: "https://example.com"
    }
};

export const IconifyButton: Story = {
    render: (args) => <Button {...args}><IconifyIcon icon="material-symbols:home-rounded" style={{ fontSize: "1.5em" }} /> {args.default}</Button>
};

export const FontAwesomeButton: Story = {
    render: (args) => <Button {...args}><FontAwesomeIcon icon={faHouse} fontSize={"1em"} />{args.default}</Button>
};