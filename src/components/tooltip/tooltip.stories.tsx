import { Tooltip } from "@packages/react";
import { Meta, StoryObj } from "@storybook/react/*";

type Story = StoryObj<typeof Tooltip>;

export default {
    title: "Components/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    argTypes: {
        default: {
            control: "text",
            description: "The content of the tooltip"
        },
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined"],
            description: "Appearance of the tooltip"
        },
        shape: {
            control: "select",
            options: ["box", "rounded", "pill"],
            description: "Shape of the tooltip"
        },
        margin: {
            control: "number",
            description: "Distance between the tooltip and the target"
        },
        delay: {
            control: "number",
            description: "Delay in seconds before the tooltip appears"
        },
        position: {
            control: "select",
            options: ["top", "right", "bottom", "left", "mouse"],
            description: "The position of the tooltip"
        }
    },
    args: {
        default: "Tooltip",
        variant: "outlined",
        shape: "rounded",
        margin: 4,
        delay: 0,
        position: "bottom"
    },
    render: (args) => {
        const id = Math.random().toString(36).substring(7);
        return (
            <>
                <span id={id}>Hover me</span>
                <Tooltip target={id} {...args}>
                    {args.default}
                </Tooltip>
            </>
        );
    }
} satisfies Meta;

export const Flat: Story = {
    args: {
        variant: "flat"
    },
    parameters: {
        docs: {
            description: {
                story: "A flat tooltip"
            }
        }
    }
};

export const Raised: Story = {
    args: {
        variant: "raised"
    },
    parameters: {
        docs: {
            description: {
                story: "A raised tooltip"
            }
        }
    }
};

export const Soft: Story = {
    args: {
        variant: "soft"
    },
    parameters: {
        docs: {
            description: {
                story: "A soft tooltip"
            }
        }
    }
};

export const Outlined: Story = {
    args: {
        variant: "outlined"
    },
    parameters: {
        docs: {
            description: {
                story: "An outlined tooltip"
            }
        }
    }
};

export const Box: Story = {
    args: {
        shape: "box"
    },
    parameters: {
        docs: {
            description: {
                story: "A box shaped tooltip"
            }
        }
    }
};

export const Rounded: Story = {
    args: {
        shape: "rounded"
    },
    parameters: {
        docs: {
            description: {
                story: "A rounded tooltip"
            }
        }
    }
};

export const Pill: Story = {
    args: {
        shape: "pill"
    },
    parameters: {
        docs: {
            description: {
                story: "A pill shaped tooltip"
            }
        }
    }
};

export const Top: Story = {
    args: {
        position: "top"
    },
    parameters: {
        docs: {
            description: {
                story: "Displays the tooltip above the target element"
            }
        }
    }
};

export const Right: Story = {
    args: {
        position: "right"
    },
    parameters: {
        docs: {
            description: {
                story: "Displays the tooltip on the right of the target element"
            }
        }
    }
};

export const Bottom: Story = {
    args: {
        position: "bottom"
    },
    parameters: {
        docs: {
            description: {
                story: "Displays the tooltip below of the target element"
            }
        }
    }
};

export const Left: Story = {
    args: {
        position: "left"
    },
    parameters: {
        docs: {
            description: {
                story: "Displays the tooltip on the left of the target element"
            }
        }
    }
};

export const Mouse: Story = {
    args: {
        position: "mouse"
    },
    parameters: {
        docs: {
            description: {
                story: "Tooltip follows the mouse position"
            }
        }
    }
};

export const Delayed: Story = {
    args: {
        delay: 1
    },
    parameters: {
        docs: {
            description: {
                story: "A tooltip which is delayed"
            }
        }
    }
};
