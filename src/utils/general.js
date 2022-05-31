import ColorHash from "color-hash";

export function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

export function isInputSafe(str) {
    return /^[A-Za-z0-9_]*$/.test(str);
}

export var colorHash = new ColorHash({lightness: 0.5, saturation: 0.7});
