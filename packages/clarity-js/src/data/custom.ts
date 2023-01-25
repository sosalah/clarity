import { Constant, CustomData, Event } from "@clarity-types/data";
import * as core from "@src/core";
import encode from "./encode";

export let data: CustomData = null;

export function event(key: string, value: (string|number)[]): void {
    if (core.active() &&
        key &&
        value &&
        typeof key === Constant.String && key.length < 255 &&
        value.length < 255
    ) {
        let keys = !!data ? Object.keys(data) : [];
        let validValues = key in keys ? data[key] : [];
        for (let i = 0; i < value.length; i++) {
            if (typeof value[i] === Constant.String && (value[i] as string).length < 255 ||
                typeof value[i] === Constant.Number
            ) {
                validValues.push(value[i]);
            }
        }
        if (key in keys) {
            data[key] = validValues;
        } else {
            data = { [key]: validValues };
        }
        encode(Event.Custom);
        console.log("Event:: ", key, value);
    }
}

export function reset(): void {
    data = {};
}
