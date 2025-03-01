import { Skeleton } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof Skeleton>;

export default {
    title: "Components/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    render: (args) => <Skeleton {...args} />
} satisfies Meta<typeof Skeleton>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: "A basic skeleton"
            }
        }
    }
};
