"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class StatusService {
    async loadMoreStoryItems(authToken, userAlias, pageSize, lastItem) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }
    ;
    async loadMoreFeedItems(authToken, userAlias, pageSize, lastItem) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.getPageOfStatuses(lastItem, pageSize);
    }
    ;
    async postStatus(authToken, newStatus) {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server to post the status
    }
    ;
}
exports.StatusService = StatusService;
