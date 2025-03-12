import { syncArgs } from ".storybook/utils/utils.storybook";
import { Input } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";

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
            options: ["box", "rounded", "pill"],
            description: "Shape of the select input"
        },
        value: {
            control: "text",
            description: "The value of the input field"
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
                "color",
                "date",
                "datetime-local",
                "email",
                "file",
                "hidden",
                "month",
                "number",
                "password",
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
        value: "",
        name: "",
        placeholder: "Placeholder",
        type: "text",
        valid: true,
        disabled: false,
        onChange: fn()
    },
    decorators: [syncArgs("onChange", "value")],
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
                <br />
                <br />
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </form>
        </>
    )
};
