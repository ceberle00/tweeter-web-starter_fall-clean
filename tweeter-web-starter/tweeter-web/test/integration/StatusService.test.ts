import { StatusService } from "../../src/model.service/StatusService";
import { AuthToken, User, Status } from "tweeter-shared";
import "isomorphic-fetch";

// AI-assisted code: See AI-ATTRIBUTION.md for details.
describe("StatusService", () => {
    const service = new StatusService();

    it("GetStoryItems", async () => {
        const authToken = new AuthToken("token", Date.now());
        const userAlias = "@allen";
        const pageSize = 10;
        const lastItem = null;

        const [statuses, hasMore] =
            await service.loadMoreStoryItems(
                authToken,
                userAlias,
                pageSize,
                lastItem
            );

        expect(statuses).not.toBeNull();
        expect(statuses.length).toBeGreaterThan(0);
        expect(statuses.length).toBeLessThanOrEqual(pageSize);

        //check actual status object now that it exists
        expect(statuses[0]).toBeInstanceOf(Status);
        expect(statuses[0].user.alias).toBe("@allen");
        expect(statuses[0].post).toBeDefined();
        expect(typeof hasMore).toBe("boolean");
    });
});