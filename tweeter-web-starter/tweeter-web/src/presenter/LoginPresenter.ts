import { User, AuthToken } from "tweeter-shared";
import { AuthenticatePresenter } from "./AuthenticatePresenter";

export class LoginPresenter extends AuthenticatePresenter {
    protected doAuthenticate(alias : string, password : string): Promise<[User, AuthToken]> {
        return this.service.login(alias, password);
    }
    protected itemDescription(): string {
        return "login user" //log user in?
    }
}