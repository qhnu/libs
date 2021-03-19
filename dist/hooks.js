"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateShallowCompareEffect = exports.useUpdateLayoutEffect = void 0;
const react_1 = require("react");
const react_use_1 = require("react-use");
const useUpdateLayoutEffect = (effect, deps = []) => {
    const used = react_1.useRef(false);
    react_1.useLayoutEffect(() => {
        if (!used.current) {
            used.current = true;
            return;
        }
        effect();
    }, deps);
};
exports.useUpdateLayoutEffect = useUpdateLayoutEffect;
const useUpdateShallowCompareEffect = (effect, deps = []) => {
    const used = react_1.useRef(false);
    react_use_1.useShallowCompareEffect(() => {
        if (!used.current) {
            used.current = true;
            return;
        }
        effect();
    }, deps);
};
exports.useUpdateShallowCompareEffect = useUpdateShallowCompareEffect;
