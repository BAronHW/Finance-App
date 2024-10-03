"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// api/index.ts
const server_1 = require("./server");
server_1.server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map