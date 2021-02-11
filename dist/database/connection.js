"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const tslib_1 = require("tslib");
require("dotenv");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const connection = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoose_1.default.set('debug', true);
        yield mongoose_1.default.connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        logger_1.logger.info('Database Connected Successfully');
    }
    catch (error) {
        logger_1.logger.log(error);
        throw error;
    }
});
exports.connection = connection;
module.exports.isValidObjectId = (id) => {
    return mongoose_1.default.Types.ObjectId.isValid(id);
};
