import { useArgs } from "@storybook/preview-api";
import { Decorator } from "@storybook/react";

export function syncArgs(event: string, arg: string, value?: any) {
    let callback: Function | null | undefined;

    const sync: Decorator = (Story, context) => {
        const [, setArgs] = useArgs();

        if (callback === undefined) {
            const oldFn = context.args[event];
            if (typeof oldFn === "function") {
                callback = oldFn;
            } else {
                callback = null;
            }
        }

        function eventCallback(...payload: any) {
            const val = value !== undefined ? value : payload[0];

            setArgs({
                ...context.args,
                [arg]: val
            });

            callback?.(...payload);
        }

        return Story({
            ...context,
            args: {
                ...context.allArgs,
                [event]: eventCallback
            }
        });
    };

    return sync;
}
