import {
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
}