import { User, AuthToken } from "tweeter-shared";
import { AuthenticatePresenter } from "./AuthenticatePresenter";


export class RegisterPresenter extends AuthenticatePresenter
{
    protected doAuthenticate(firstName : string, lastName : string, alias : string, password : string, imageBytes: Uint8Array, imageFileExtension: string): Promise<[User, AuthToken]> {
        return this.service.register(firstName,lastName,alias,password, imageBytes, imageFileExtension);
    }
    protected itemDescription(): string {
        return "register user"
    }
}