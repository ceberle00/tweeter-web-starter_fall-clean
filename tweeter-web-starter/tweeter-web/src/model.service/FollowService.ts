import { AuthToken, CheckIfFollowRequest, FakeData, FollowRequests, PagedUserItemRequest, User, UserDTO } from "tweeter-shared";
import { Service } from "./Service";
import { ServerFacade } from "../network/ServerFacade";

export class FollowService implements Service
{
    private service = new ServerFacade();

    public async loadMoreFollowees (
        authToken: AuthToken,
        userAlias: string,
        pageSize: number,
        lastItem: User | null
    ): Promise<[User[], boolean]> {
        // TODO: Replace with the result of calling server
        const request : PagedUserItemRequest<UserDTO> = {
            token: authToken.token,
            userAlias : userAlias,
            pageSize : pageSize,
            lastItem : lastItem ? lastItem.DTO : null
        };
        return this.service.getMoreFollowees(request);
    };
    public async loadMoreFollowers (
            authToken: AuthToken,
            userAlias: string,
            pageSize: number,
            lastItem: User | null
    ): Promise<[User[], boolean]> {
            // TODO: Replace with the result of calling server
        const request : PagedUserItemRequest<UserDTO> = {
            token: authToken.token,
            userAlias : userAlias,
            pageSize : pageSize,
            lastItem : lastItem ? lastItem.DTO : null
        };
        return this.service.getMoreFollowers(request);
    };
    public async getIsFollowerStatus (
        authToken: AuthToken,
        user: User,
        selectedUser: User,
    ): Promise<boolean> {
        // TODO: Replace with the result of calling server
        const request : CheckIfFollowRequest = {
            token: authToken.token,
            userAlias: user.alias,
            selectedUserAlias: selectedUser.alias
        }
        return this.service.checkIfFollower(request);
    };
    public async getFolloweeCount (
        authToken: AuthToken,
        user: User,
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        const request : FollowRequests = {
            token: authToken.token,
            userAlias: user.alias,
        }
        return this.service.getFolloweesCount(request);
    };
    public async getFollowerCount (
        authToken: AuthToken,
        user: User,
    ): Promise<number> {
        // TODO: Replace with the result of calling server
        const request : FollowRequests = {
            token: authToken.token,
            userAlias: user.alias,
        }
        return this.service.getFollowersCount(request);
    };
    public async follow (
        authToken: AuthToken,
        userToFollow: User,
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000)); //leaving here for now???
        
        const request : FollowRequests = {
            token: authToken.token,
            userAlias: userToFollow.alias,
        }
        return this.service.follow(request);
    };

    public async unfollow (
        authToken: AuthToken,
        userToUnfollow: User,
    ): Promise<[followerCount: number, followeeCount: number]> {
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
        const request : FollowRequests = {
            token: authToken.token,
            userAlias: userToUnfollow.alias,
        }
        return this.service.follow(request);
    };
}