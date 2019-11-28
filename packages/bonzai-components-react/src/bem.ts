import { curry } from "ramda";

const mSeparator = "--";
const eSeparator = "__";

export const bem = {

    m: curry((base: string, modifier: string) => {
        return modifier.split(" ").map((className: string) =>
            `${base}${mSeparator}${className}`
        ).join(" ");
    }),

    e: curry((base: string, element: string) =>
        `${base}${eSeparator}${element}`
    )

};