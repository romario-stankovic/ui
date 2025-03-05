import { Meta, StoryObj } from "@storybook/react";
import { Paginator } from "@packages/react";
import { syncArgs } from ".storybook/utils/utils.storybook";
import { fn } from "@storybook/test";

type Story = StoryObj<typeof Paginator>;

export default {
    title: "Components/Paginator",
    component: Paginator,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["soft", "outlined", "colored-outline"],
            description: "The appearance of the paginator"
        },
        shape: {
            control: "select",
            options: ["box", "rounded", "pill"],
            description: "The shape of the paginator"
        },
        page: {
            control: "number",
            description: "The current page"
        },
        totalPages: {
            control: "number",
            description: "The total number of pages"
        },
        siblings: {
            control: "number",
            description: "Number of visible siblings from the current page"
        },
        showNextButton: {
            control: "boolean",
            description: "Show button to move to the next page"
        },
        showPreviousButton: {
            control: "boolean",
            description: "Show button to move to the previous page"
        },
        showFirstButton: {
            control: "boolean",
            description: "Show button to move to the first page"
        },
        showLastButton: {
            control: "boolean",
            description: "Show button to move to the last page"
        }
    },
    args: {
        variant: "outlined",
        shape: "pill",
        page: 1,
        totalPages: 15,
        siblings: 2,
        showNextButton: false,
        showPreviousButton: false,
        showFirstButton: false,
        showLastButton: false,
        onChange: fn()
    },
    render: (args) => <Paginator {...args} />,
    decorators: [syncArgs("onChange", "page")]
} satisfies Meta;

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

export const NextAndPrevious: Story = {
    args: {
        showNextButton: true,
        showPreviousButton: true
    }
};

export const FirstAndLast: Story = {
    args: {
        showFirstButton: true,
        showLastButton: true
    }
};
