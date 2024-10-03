"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
// api/server.ts
const apollo_server_1 = require("apollo-server");
const context_1 = require("./context");
const schema_1 = require("./schema");
exports.server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    context: context_1.context
});
//# sourceMappingURL=server.js.map