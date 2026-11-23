"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class StatusService {
    async loadMoreStoryItems(authToken, userAlias, pageSize, lastItem) {
        // TODO: Replace with the result of calling server
        const [items, hasMore] = await this.getFakeData(pageSize, lastItem);
        return [items, hasMore];
    }
    ;
    async loadMoreFeedItems(authToken, userAlias, pageSize, lastItem) {
        // TODO: Replace with the result of calling server
        const [items, hasMore] = await this.getFakeData(pageSize, lastItem);
        return [items, hasMore];
    }
    ;
    async postStatus(authToken, newStatus) {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        // TODO: Call the server to post the status
    }
    ;
    async getFakeData(pageSize, lastItem) {
        const [items, hasMore] = await tweeter_shared_1.FakeData.instance.getPageOfStatuses(tweeter_shared_1.Status.fromDTO(lastItem), pageSize);
        return [items.map((status) => status.DTO), hasMore];
    }
}
exports.StatusService = StatusService;
