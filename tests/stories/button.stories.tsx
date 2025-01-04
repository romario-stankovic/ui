import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@packages/react";
import { Icon as IconifyIcon } from "@iconify-icon/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { fn } from "@storybook/test";

type Story = StoryObj<typeof Button>;

export default {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
        default: {
            control: "text",
            description: "The text content of the button"
        },
        variant: {
            control: "select",
            options: ["flat", "raised", "soft", "outlined", "colored-outline", "text"],
            description: "Appearance of the button"
        },
        shape: {
            control: "select",
            options: ["box", "rounded", "pill"],
            description: "Shape of the button"
        },
        href: {
            control: "text",
            description: "URL to navigate to when the button is clicked"
        },
        target: {
            control: "select",
            options: ["_blank", "_self", "_parent", "_top"],
            description: "Where to open the linked document"
        },
        iconOnly: {
            control: "boolean",
            description: "Whether the button only contains an icon"
        },
        disabled: {
            control: "boolean",
            description: "Whether the button is disabled"
        }
    },
    args: {
        default: "Button",
        variant: "flat",
        shape: "rounded",
        href: "",
        target: "_blank",
        iconOnly: false,
        onClick: fn()
    },
    parameters: {
        docs: {
            description: {
                component: "A component used to trigger an action or navigate to a new page"
            }
        }
    },
    render: (args) => <Button {...args}>{args.default}</Button>
} satisfies Meta;

export const Flat: Story = {
    args: {
        variant: "flat"
    },
    parameters: {
        docs: {
            description: {
                story: "A flat button with no elevation and solid background"
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
                story: "A raised button with a subtle shadow indicating elevation"
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
                story: "A soft button with a semi-transparent background"
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
                story: "An outlined button with a border and transparent background"
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
                story: "A colored outline button with a border that matches the text color"
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
                story: "A text button with no background or border"
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
                story: "A box-shaped button with sharp corners"
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
                story: "A rounded button with slightly rounded corners"
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
                story: "A pill-shaped button with fully rounded corners"
            }
        }
    }
};

export const Link: Story = {
    args: {
        href: "https://example.com",
        target: "_blank"
    },
    parameters: {
        docs: {
            description: {
                story: "A button that navigates to a new page"
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
                story: "A button that cannot be clicked"
            }
        }
    }
};

export const IconifyButton: Story = {
    render: (args) => (
        <Button {...args}>
            <IconifyIcon icon="material-symbols:home-rounded" style={{ fontSize: "1.5em" }} /> {args.default}
        </Button>
    ),
    parameters: {
        docs: {
            description: {
                story: "A button with an Iconify icon"
            }
        }
    }
};

export const FontAwesomeButton: Story = {
    render: (args) => (
        <Button {...args}>
            <FontAwesomeIcon icon={faHouse} fontSize={"1em"} />
            {args.default}
        </Button>
    ),
    parameters: {
        docs: {
            description: {
                story: "A button with a FontAwesome icon"
            }
        }
    }
};

export const IconOnly: Story = {
    args: {
        iconOnly: true
    },
    render: (args) => (
        <Button {...args}>
            <IconifyIcon icon="material-symbols:home-rounded" style={{ fontSize: "1.5em" }} />
        </Button>
    ),
    parameters: {
        docs: {
            description: {
                story: "A button with only one icon inside of it"
            }
        }
    }
};
