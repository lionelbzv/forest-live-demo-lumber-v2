"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("dotenv/config");
var agent_1 = require("@forestadmin/agent");
var datasource_sql_1 = require("@forestadmin/datasource-sql");
// Create your Forest Admin agent
// This must be called BEFORE all other middleware on the app
var agent = (0, agent_1.createAgent)({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    // isProduction: process.env.NODE_ENV === 'production',
    isProduction: false,
    typingsPath: './typings.ts',
    typingsMaxDepth: 5
})
    // Create your SQL datasource
    .addDataSource((0, datasource_sql_1.createSqlDataSource)(process.env.DATABASE_URL))
    // Replace "myExpressApp" by your Express application
    .customizeCollection('customers', function (collection) {
    collection
        // Create a new field
        .addField('fullname', {
        columnType: 'String',
        dependencies: ['firstname', 'lastname'],
        getValues: function (records, context) { return records.map(function (r) { return "".concat(r.firstname, " ").concat(r.lastname); }); }
    });
    // // Make it writable,
    // .replaceFieldWriting('fullname', (value, context) => {
    //   const [firstName, lastName] = value.split(' ');
    //   return { firstName, lastName };
    // })
    // // Make it filterable and sortable
    // .emulateFieldFiltering('fullname')
    // .emulateFieldSorting('fullname')
    // ;
})
    .customizeCollection('companies', function (collection) {
    return collection.addAction('Mark as live', {
        scope: 'Single',
        execute: function (context, resultBuilder) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('mark as live');
                        // Change the company's status to live.
                        return [4 /*yield*/, context.collection.update(context.filter, { status: 'live' })];
                    case 1:
                        // Change the company's status to live.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }
    });
})
    .customizeCollection('companies', function (collection) {
    return collection.addHook('After', 'Update', function (context) { return __awaiter(void 0, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            console.log('hook after update');
            console.log(context);
            id = context.collection.getForm('id');
            console.log(id);
            return [2 /*return*/];
        });
    }); });
})
    .mountOnStandaloneServer(3000, '127.0.0.1')
    .start();
