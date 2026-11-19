import { TweeterResponse } from "tweeter-shared";
import { TokenRequest } from "tweeter-shared/dist/model/net/request/TokenRequest";
import { UserService } from "../../model/service/UserService";

export const handler = async (request: TokenRequest) : Promise<TweeterResponse> => {
    const userService = new UserService();
    await userService.logout(request.token);
    return {
        success: true,
        message: null
    }
}