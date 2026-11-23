import { AuthToken, User, FakeData, GetUserRequest, LoginRequest, RegisterRequest } from "tweeter-shared";
import { Service } from "./Service";
import { Buffer } from "buffer";
import { ServerFacade } from "../network/ServerFacade";
import { TokenRequest } from "tweeter-shared/dist/model/net/request/TokenRequest";

export class UserService implements Service
{
    private service = new ServerFacade();
    
    public async getUser (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        const request : GetUserRequest = 
        {
            token: authToken.token,
            userAlias: alias
        }
        return this.service.getUser(request);
    };
    public async login (
        alias: string,
        password: string
    ): Promise<[User, AuthToken]> {
        // TODO: Replace with the result of calling the server
        const request : LoginRequest = {
            userAlias: alias,
            password: password
        }
        return this.service.login(request);
    };

    public async logout (authToken: AuthToken): Promise<void>
    {
        await new Promise((res) => setTimeout(res, 1000));
        const request : TokenRequest = {
            token: authToken.token
        }
        this.service.logout(request);
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    };
    public async register (
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: Uint8Array,
        imageFileExtension: string
    ): Promise<[User, AuthToken]> {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64: string =
        Buffer.from(userImageBytes).toString("base64");

        const request : RegisterRequest = {
            firstName: firstName,
            lastName: lastName,
            userAlias: alias,
            password: password,
            userImageBytes: imageStringBase64,
            imageFileExtension: imageFileExtension
        }
        return this.service.register(request);
    };
}