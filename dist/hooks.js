"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateLayoutEffect = void 0;
const react_1 = require("react");
const useUpdateLayoutEffect = (effect, deps = []) => {
    const isInitialMount = react_1.useRef(true);
    react_1.useLayoutEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            effect();
        }
    }, deps);
};
exports.useUpdateLayoutEffect = useUpdateLayoutEffect;
