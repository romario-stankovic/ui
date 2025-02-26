import { Meta, StoryObj } from "@storybook/react/*";
import { Chip } from "@packages/react";
import { fn } from "@storybook/test";
import { Icon as IconifyIcon } from "@iconify-icon/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

type Story = StoryObj<typeof Chip>;

export default {
    title: "Components/Chip",
    component: Chip,
    tags: ["autodocs"],
    argTypes: {
        default: {
            control: "text",
            description: "The text content of the chip"
        },
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined", "colored-outline", "text"],
            description: "Appearance of the chip"
        },
        shape: {
            control: "select",
            options: ["box", "rounded", "pill"],
            description: "Shape of the chip"
        },
        interactive: {
            control: "boolean",
            description: "Whether the chip is interactive"
        },
        href: {
            control: "text",
            description: "URL to navigate to when the chip is clicked"
        },
        target: {
            control: "select",
            options: ["_blank", "_self", "_parent", "_top"],
            description: "Where to open the linked document"
        },
        iconOnly: {
            control: "boolean",
            description: "Whether the chip has only an icon"
        },
        disabled: {
            control: "boolean",
            description: "Whether the chip is disabled"
        }
    },
    args: {
        default: "Chip",

        variant: "flat",
        shape: "pill",
        interactive: false,
        href: "",
        target: "_blank",
        disabled: false,
        iconOnly: false,

        onClick: fn()
    },
    render: (args) => <Chip {...args}>{args.default}</Chip>
} satisfies Meta;

export const Flat: Story = {
    args: {
        variant: "flat"
    },
    parameters: {
        docs: {
            description: {
                story: "A flat chip with no elevation and a solid background"
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
                story: "A raised chip with a subtle shadow indicating elevation"
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
                story: "A soft chip with a semi-transparent background"
            }
        }
    }
};

export const Outline: Story = {
    args: {
        variant: "outlined"
    },
    parameters: {
        docs: {
            description: {
                story: "An outlined chip with a border and transparent background"
            }
        }
    }
};

export const ColoredOutline: Story = {
    args: {
        variant: "colored-outline"
    },
    parameters: {
        docs: {
            description: {
                story: "A colored outline chip with a border that matches the text color"
            }
        }
    }
};

export const Text: Story = {
    args: {
        variant: "text"
    },
    parameters: {
        docs: {
            description: {
                story: "A text chip with no background or border"
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
                story: "A box-shaped chip with sharp corners"
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
                story: "A rounded chip with slightly rounded corners"
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
                story: "A pill-shaped chip with fully rounded corners"
            }
        }
    }
};

export const Interactive: Story = {
    args: {
        interactive: true
    },
    parameters: {
        docs: {
            description: {
                story: "A chip which can be clicked"
            }
        }
    }
};

export const Disabled: Story = {
    args: {
        disabled: true
    },
    parameters: {
        docs: {
            description: {
                story: "A chip that cannot be clicked"
            }
        }
    }
};

export const IconifyChip: Story = {
    render: (args) => (
        <Chip {...args}>
            <IconifyIcon icon="material-symbols:imagesmode-rounded" style={{ fontSize: "1.5em" }} /> {args.default}
        </Chip>
    ),
    parameters: {
        docs: {
            description: {
                story: "A chip with an Iconify icon"
            }
        }
    }
};

export const FontAwesoneChip: Story = {
    render: (args) => (
        <Chip {...args}>
            <FontAwesomeIcon icon={faImage} fontSize={"1.25em"} />
            {args.default}
        </Chip>
    ),
    parameters: {
        docs: {
            description: {
                story: "A chip with a FontAwesome icon"
            }
        }
    }
};

export const IconOnly: Story = {
    args: {
        iconOnly: true
    },
    render: (args) => (
        <Chip {...args}>
            <IconifyIcon icon="material-symbols:imagesmode-rounded" style={{ fontSize: "1.25em" }} />
        </Chip>
    ),
    parameters: {
        docs: {
            description: {
                story: "A chip with only one icon inside of it"
            }
        }
    }
};
