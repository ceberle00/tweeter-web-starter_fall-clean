import {
    ChangeFollowStatusResponse,
    CheckIfFollowRequest,
    CheckIfFollowResponse,
    FollowCountResponse,
    FollowRequests,
    PagedUserItemRequest,
    PagedUserItemResponse,
    User,
    UserDTO,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
    private SERVER_URL = "https://dl542elx01.execute-api.us-east-2.amazonaws.com/dev";

    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

    public async getMoreFollowees(
        request: PagedUserItemRequest<UserDTO>,
    ): Promise<[User[], boolean]> {
        const response = await this.clientCommunicator.doPost<
        PagedUserItemRequest<UserDTO>,
        PagedUserItemResponse<UserDTO>
        >(request, "/followee/list");

        // Convert the UserDTO array returned by ClientCommunicator to a User array
        const items: User[] | null =
        response.success && response.items
            ? response.items.map((dto) => User.fromDTO(dto) as User)
            : null;

        // Handle errors
        if (response.success) {
        if (items == null) {
            throw new Error(`No followees found`);
        } else {
            return [items, response.hasMore];
        }
        } else {
        console.error(response);
        throw new Error(response.message ?? undefined);
        }
    }
    public async getMoreFollowers(
        request: PagedUserItemRequest<UserDTO>,
    ): Promise<[User[], boolean]> {
        const response = await this.clientCommunicator.doPost<
        PagedUserItemRequest<UserDTO>,
        PagedUserItemResponse<UserDTO>
        >(request, "/follower/list");

        const items: User[] | null =
        response.success && response.items
            ? response.items.map((dto) => User.fromDTO(dto) as User)
            : null;

        // Handle errors
        if (response.success) {
        if (items == null) {
            throw new Error(`No followees found`);
        } else {
            return [items, response.hasMore];
        }
        } else {
        console.error(response);
        throw new Error(response.message ?? undefined);
        }

    }
    public async checkIfFollower(
        request: CheckIfFollowRequest
    ): Promise<boolean>
    {
        const response = await this.clientCommunicator.doPost<
            CheckIfFollowRequest,
            CheckIfFollowResponse
        >(request, "/follow/status")
        const isFollow = response.isFollowing
        if (!response.success) {
            console.error(response);
            throw new Error(response.message ?? undefined);
        }
        if (response.isFollowing === undefined || response.isFollowing === null) {
            throw new Error("Invalid server response: isFollowing missing");
        }
        return isFollow;
    }
    public async getFolloweesCount(
        request: FollowRequests
    ): Promise<number> {
        const response = await this.clientCommunicator.doPost<
            FollowRequests,
            FollowCountResponse
        > (request, "/followee/count");
        const count = response.followCount;
        if (response.success) {
            if (count === undefined || count === null) {
                throw new Error(`Failed to return number of followees`);
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? undefined);
        }
        return count
    }
    public async getFollowersCount(
        request: FollowRequests
    ): Promise<number> {
        const response = await this.clientCommunicator.doPost<
            FollowRequests,
            FollowCountResponse
        > (request, "/follower/count");
        const count = response.followCount;
        if (response.success) {
            if (count === undefined || count === null) {
                throw new Error(`Failed to return number of followers`);
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? undefined);
        }
        return count
    }
    public async follow(
        request: FollowRequests
    ): Promise<[followerCount: number, followeeCount: number]> {
        const response = await this.clientCommunicator.doPost<
            FollowRequests,
            ChangeFollowStatusResponse
        >(request, "/follow")
        const [followers, followees] = [response.followerCount, response.followeeCount]
        if (response.success) {
            if (followees == null || followers == null) {
                throw new Error(`Some error with returning followers or followees`);
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? undefined);
        }
        return [followers, followees];
    }
    public async unfollow(
        request: FollowRequests
    ): Promise<[followerCount: number, followeeCount: number]> {
        const response = await this.clientCommunicator.doPost<
            FollowRequests,
            ChangeFollowStatusResponse
        >(request, "/unfollow")
        const [followers, followees] = [response.followerCount, response.followeeCount]
        if (response.success) {
            if (followees == null || followers == null) {
                throw new Error(`Some error with returning followers or followees`);
            }
        } else {
            console.error(response);
            throw new Error(response.message ?? undefined);
        }
        return [followers, followees];
    }
}