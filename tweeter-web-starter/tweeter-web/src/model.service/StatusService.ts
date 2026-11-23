import { AuthToken, Status, FakeData, PagedUserItemRequest, StatusDTO, PostStatusRequest } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../network/ServerFacade";

export class StatusService implements Service
{
    private service = new ServerFacade();
    
    public async loadMoreStoryItems (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        const request : PagedUserItemRequest<StatusDTO> = {
            token: authToken.token,
            userAlias : userAlias,
            pageSize : pageSize,
            lastItem : lastItem ? lastItem.DTO : null
        };
        return this.service.getMoreStories(request);
    };

    public async loadMoreFeedItems  (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: Status | null
    ): Promise<[Status[], boolean]> {
        // TODO: Replace with the result of calling server
        const request : PagedUserItemRequest<StatusDTO> = {
            token: authToken.token,
            userAlias : userAlias,
            pageSize : pageSize,
            lastItem : lastItem ? lastItem.DTO : null
        };
        return this.service.getMoreFeedItems(request);
    };

    public async postStatus (
        authToken: AuthToken,
        newStatus: Status,
    ): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        const request : PostStatusRequest = {
            token: authToken.token,
            post: newStatus.DTO
        }
        this.service.postStatus(request);
    };
}