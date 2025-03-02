import { syncArgs } from ".storybook/utils/utils.storybook";
import { Textarea } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

type Story = StoryObj<typeof Textarea>;

export default {
    title: "Components/Textarea",
    component: Textarea,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "Appearance of the textarea"
        },
        shape: {
            control: "select",
            options: ["box", "rounded"]
        },
        value: {
            control: "text",
            description: "The value of the textarea"
        },
        name: {
            control: "text",
            description: "The name of the textarea"
        },
        placeholder: {
            control: "text",
            description: "The placeholder inside the textarea"
        },
        valid: {
            control: "boolean",
            description: "Validity of the textarea"
        },
        disabled: {
            control: "boolean",
            description: "Is the textarea disabled"
        },
        resizable: {
            control: "boolean",
            description: "Is the textarea resizable"
        }
    },
    args: {
        variant: "outlined",
        shape: "rounded",
        value: "",
        name: "",
        placeholder: "Placeholder",
        valid: true,
        disabled: false,
        resizable: false,
        onChange: fn()
    },
    decorators: [syncArgs("onChange", "value")],
    render: (args) => <Textarea {...args} />
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

export const Disabled: Story = {
    args: {
        disabled: true
    }
};

export const Resizable: Story = {
    args: {
        resizable: true
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
                <Textarea {...args} />
            </form>
        </>
    )
};
