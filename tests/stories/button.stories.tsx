import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@packages/react";

type Story = StoryObj<typeof Button>;

export default {
    title: "Components/Button",
    component: Button,
    tags: ['autodocs']
} satisfies Meta;

export const Default = {

};