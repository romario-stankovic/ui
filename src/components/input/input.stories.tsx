import { Input } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Input>;

export default {
    title: "Components/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "Appearance of the input"
        },
        shape: {
            control: "select",
            options: ["box", "rounded", "pill"]
        },
        name: {
            control: "text",
            description: "The name of the input field"
        },
        placeholder: {
            control: "text",
            description: "The placeholder inside the field"
        },
        type: {
            control: "select",
            options: [
                "button",
                "checkbox",
                "color",
                "date",
                "datetime-local",
                "email",
                "file",
                "hidden",
                "image",
                "month",
                "number",
                "password",
                "radio",
                "range",
                "reset",
                "search",
                "submit",
                "tel",
                "text",
                "time",
                "url",
                "week"
            ],
            description: "The type of input"
        },
        valid: {
            control: "boolean",
            description: "Validity of the input"
        },
        disabled: {
            control: "boolean",
            description: "Is the input disabled"
        }
    },
    args: {
        variant: "outlined",
        shape: "rounded",
        name: "",
        placeholder: "Placeholder",
        type: "text",
        valid: true,
        disabled: false
    },
    render: (args) => <Input {...args} />
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

export const Disabled: Story = {
    args: {
        disabled: true
    }
};

export const WithValidation: Story = {
    args: {
        valid: (value: string) => {
            return value.length >= 8;
        }
    }
};

export const Form: Story = {
    args: {
        valid: (value: string) => {
            return value.length >= 8;
        }
    },
    render: (args) => (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.currentTarget.reset();
                }}
            >
                <Input {...args} />
            </form>
        </>
    )
};
