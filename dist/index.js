"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const agent_1 = require("@forestadmin/agent");
const datasource_sql_1 = require("@forestadmin/datasource-sql");
// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
(0, agent_1.createAgent)({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: process.env.NODE_ENV === 'production',
    typingsPath: './typings.ts',
    typingsMaxDepth: 5,
})
    // Create your SQL datasource
    .addDataSource((0, datasource_sql_1.createSqlDataSource)(process.env.DATABASE_URL))
    // Replace "myExpressApp" by your Express application
    .mountOnStandaloneServer(3000, '127.0.0.1')
    .start();
//# sourceMappingURL=index.js.map