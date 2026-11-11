import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { NavView, Presenter } from "./Presenter";

export interface UserNavigationView extends NavView
{
    setDisplayedUser: (user: User) => void //maybe also display user? check if has problems
}
export class UserNavigationPresenter extends Presenter<UserNavigationView>{
    private service : UserService
    public constructor (view : UserNavigationView) {
        super(view);
        this.service = new UserService();
    }

    private extractAlias (value: string): string
    {
        const index = value.indexOf("@");
        return value.substring(index);
    };
    public async navigateToUser (eventAlias : string, authToken : AuthToken, displayedUser : User, featureUrl : string): Promise<void> {

        await this.doFailureReportingOperation(async () => {
            const alias = this.extractAlias(eventAlias);

            const toUser = await this.service.getUser(authToken!, alias);

            if (toUser) {
                if (!toUser.equals(displayedUser!)) {
                this.view.setDisplayedUser(toUser);
                this.view.navigate(`${featureUrl}/${toUser.alias}`);
                }
            }
        }, "get user")
    };
}