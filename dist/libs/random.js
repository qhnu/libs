"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomUniqueRange = void 0;
const random_1 = __importDefault(require("lodash/random"));
const randomUniqueRange = (count, availableNumbers) => {
    const range = [];
    let remainNumbers = [...availableNumbers];
    while (range.length < count) {
        if (!remainNumbers.length)
            remainNumbers = [...availableNumbers];
        const randomIndex = random_1.default(0, remainNumbers.length - 1);
        const picks = remainNumbers.splice(randomIndex, 1);
        range.push(picks[0]);
    }
    return range;
};
exports.randomUniqueRange = randomUniqueRange;
