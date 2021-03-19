"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateDeepCompareEffect = exports.useUpdateLayoutEffect = void 0;
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
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
const useUpdateDeepCompareEffect = (effect, deps = []) => {
    const used = react_1.useRef(false);
    react_use_1.useCustomCompareEffect(() => {
        if (!used.current) {
            used.current = true;
            return;
        }
        effect();
    }, deps, (prevDeps, nextDeps) => fast_deep_equal_1.default(prevDeps, nextDeps));
};
exports.useUpdateDeepCompareEffect = useUpdateDeepCompareEffect;
