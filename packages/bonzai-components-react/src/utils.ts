export const debounce = (func: Function, wait: number, immediate?: boolean) => {
    let timeout: number | undefined;
    return function (this: object | void) {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = undefined;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) func.apply(context, args);
        return timeout;
    };
}