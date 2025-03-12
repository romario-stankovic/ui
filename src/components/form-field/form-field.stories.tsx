import { FormField, Input, Label, Select, Textarea } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";

type Story = StoryObj<typeof FormField>;

export default {
    title: "Layout/FormField",
    component: FormField,
    tags: ["autodocs"]
} satisfies Meta;

export const InputField: Story = {
    render: (args) => (
        <FormField>
            <Label>Label</Label>
            <Input placeholder="Test" />
        </FormField>
    )
};

export const TextAreaField: Story = {
    render: (args) => (
        <FormField>
            <Label>Label</Label>
            <Textarea placeholder="Test" />
        </FormField>
    )
};

export const SelectField: Story = {
    render: (args) => (
        <FormField>
            <Label>Label</Label>
            <Select>
                <option>Option A</option>
                <option>Option B</option>
                <option>Option C</option>
            </Select>
        </FormField>
    )
};
