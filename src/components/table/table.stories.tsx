import { Meta, StoryObj } from "@storybook/react";
import { Table } from "@packages/react";

type Story = StoryObj<typeof Table>;

export default {
    title: "Components/Table",
    component: Table,
    tags: ["autodocs"],
    argTypes: {
        striped: {
            control: "boolean",
            description: "Are table rows striped"
        },
        hoverable: {
            control: "boolean",
            description: "Do table rows have a hover effect"
        }
    },
    args: {
        striped: false,
        hoverable: false
    },
    render: (args) => (
        <Table {...args}>
            <thead>
                <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                    <th>Column 3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cell 1-1</td>
                    <td>Cell 1-2</td>
                    <td>Cell 1-3</td>
                </tr>
                <tr>
                    <td>Cell 2-1</td>
                    <td>Cell 2-2</td>
                    <td>Cell 2-3</td>
                </tr>
                <tr>
                    <td>Cell 3-1</td>
                    <td>Cell 3-2</td>
                    <td>Cell 3-3</td>
                </tr>
            </tbody>
        </Table>
    )
} satisfies Meta;

export const Default: Story = {};

export const Striped: Story = {
    args: {
        striped: true
    }
};

export const Hoverable: Story = {
    args: {
        hoverable: true
    }
};
