"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
const nexus_1 = require("nexus");
exports.DateTime = (0, nexus_1.scalarType)({
    name: 'DateTime',
    asNexusMethod: 'dateTime',
    description: 'Date and time custom scalar type',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value instanceof Date
            ? value.toISOString()
            : new Date(value).toISOString();
    },
    parseLiteral(ast) {
        if (ast.kind === 'StringValue') {
            return new Date(ast.value);
        }
        return null;
    },
});
//# sourceMappingURL=dateTime.js.map