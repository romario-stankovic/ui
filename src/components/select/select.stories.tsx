import { syncArgs } from ".storybook/utils/utils.storybook";
import { Select } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "storybook/test";

type Story = StoryObj<typeof Select>;

export default {
    title: "Components/Select",
    component: Select,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "Appearance of the select input"
        },
        shape: {
            control: "select",
            options: ["box", "rounded", "pill"],
            description: "Shape of the select input"
        },
        value: {
            control: "text",
            description: "The value of the select"
        },
        disabled: {
            control: "boolean",
            description: "Is the select field disabled"
        }
    },
    args: {
        variant: "outlined",
        shape: "rounded",
        value: "",
        disabled: false,
        onChange: fn()
    },
    render: (args) => (
        <Select {...args}>
            <option value={undefined} selected disabled>
                Disabled
            </option>
            <optgroup label="Group A">
                <option value="a1">Option A1</option>
            </optgroup>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
        </Select>
    ),
    decorators: [syncArgs("onChange", "value")]
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
