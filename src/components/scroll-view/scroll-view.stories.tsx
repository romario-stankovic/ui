import { ScrollView } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof ScrollView>;

export default {
    title: "Components/ScrollView",
    component: ScrollView,
    tags: ["autodocs"],
    argTypes: {
        scrollX: {
            control: "boolean",
            description: "Should the view scroll horizontally"
        },
        scrollY: {
            control: "boolean",
            description: "Should the view scroll vertically"
        },
        draggable: {
            control: "boolean",
            description: "Is the view draggable by mouse"
        },
        snapX: {
            control: "boolean",
            description: "Should the view snap on the X axis"
        },
        snapY: {
            control: "boolean",
            description: "Should the view snap on the Y axis"
        },
        snapPointX: {
            control: "select",
            options: ["start", "center", "end"],
            description: "Snapping point of child elements on the X axis"
        },
        snapPointY: {
            control: "select",
            options: ["start", "center", "end"],
            description: "Snapping point of child elements on the Y axis"
        },
        scrollShadowX: {
            control: "boolean",
            description: "Display scrolling shadows on the X axis"
        },
        scrollShadowY: {
            control: "boolean",
            description: "Display scrolling shadows on the Y axis"
        }
    },
    args: {
        scrollX: false,
        scrollY: false,
        draggable: false,
        snapX: false,
        snapY: false,
        snapPointX: "center",
        snapPointY: "center",
        scrollShadowX: false,
        scrollShadowY: false
    },
    render: (args) => {
        function getRandomColor() {
            var letters = "0123456789ABCDEF";
            var color = "#";
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        return (
            <>
                <style>
                    {`
                    .scroll-view {
                        text-wrap: nowrap;
                        width: 500px;
                        height: 500px;
                    }
                `}
                </style>
                <ScrollView {...args}>
                    {Array(49)
                        .fill(0)
                        .map((el, i) => (
                            <>
                                <div
                                    style={{
                                        display: "inline-block",
                                        margin: "2rem",
                                        width: "100px",
                                        height: "100px",
                                        background: `${getRandomColor()}`
                                    }}
                                ></div>
                                {(i + 1) % 7 === 0 && <br />}
                            </>
                        ))}
                </ScrollView>
            </>
        );
    }
} satisfies Meta;

export const ScrollX: Story = {
    args: {
        scrollX: true
    }
};

export const ScrollY: Story = {
    args: {
        scrollY: true
    }
};

export const Draggable: Story = {
    args: {
        scrollX: true,
        scrollY: true,
        draggable: true
    }
};

export const SnapX: Story = {
    args: {
        scrollX: true,
        draggable: true,
        snapX: true
    }
};

export const SnapY: Story = {
    args: {
        scrollY: true,
        draggable: true,
        snapY: true
    }
};

export const ShadowX: Story = {
    args: {
        scrollX: true,
        scrollShadowX: true
    }
};

export const ShadowY: Story = {
    args: {
        scrollY: true,
        scrollShadowY: true
    }
};
