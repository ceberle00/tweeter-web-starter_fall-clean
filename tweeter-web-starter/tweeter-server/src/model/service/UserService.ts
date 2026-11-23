import { AuthToken, User, FakeData, UserDTO } from "tweeter-shared";
import { Service } from "./Service";
import { Buffer } from "buffer";

export class UserService implements Service
{
    public async getUser (
        authToken: string,
        alias: string
    ): Promise<UserDTO | null> {
        // TODO: Replace with the result of calling server
        const user = FakeData.instance.findUserByAlias(alias);
        return user === null ? null : user.DTO
    };
    public async login (
        alias: string,
        password: string
    ): Promise<[UserDTO, string]> {
        // TODO: Replace with the result of calling the server
        return this.authenticate(alias, password, "alias or password");
    };

    public async logout (authToken: string): Promise<void>{
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    };
    public async register (
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        userImageBytes: string,
        imageFileExtension: string
    ): Promise<[UserDTO, string]> {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64: string =
        Buffer.from(userImageBytes).toString("base64");

        // TODO: Replace with the result of calling the server
        return this.authenticate(alias, password, "registration");
    };
    private async authenticate(alias: string, password: string, message: string): Promise<[UserDTO, string]>
    {
        //passed in alias and password, not used now but will be eventually
        const user = FakeData.instance.firstUser;
        if (user === null) {
            throw new Error(`Invalid ${message}`);
        }

        return [user.DTO, FakeData.instance.authToken.token];
    }
}