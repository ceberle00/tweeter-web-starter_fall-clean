import { User, AuthToken } from "tweeter-shared"
import { isLoadingView, NavView, Presenter } from "./Presenter"
import { UserService } from "../model.service/UserService";

export interface AuthenticateView extends isLoadingView, NavView
{
    updateUserInfo: (currentUser: User, displayedUser: User | null, authToken: AuthToken, remember: boolean) => void,
}
export abstract class AuthenticatePresenter extends Presenter<AuthenticateView>
{
    private _service : UserService;

    public constructor(view : AuthenticateView) {
        super(view);
        this._service = new UserService();
    }

    public get service() {
        return this._service
    }

    public async auth(...args: any[])
    {
        await this.doFailureFinallyReportingOperation(async () => {
            this.view.setIsLoading(true);
            const [user, authToken] = await this.doAuthenticate(...args);

            this.view.updateUserInfo(user, user, authToken, args[args.length - 1]);

            if (args.length == 4 && !!args[2]) {
                
                this.view.navigate(args[2]);
            }
            else {
                this.view.navigate(`/feed/${user.alias}`);
            }
        }, this.itemDescription(), async () => {
            this.view.setIsLoading(false);
        })
    }

    protected abstract doAuthenticate(...args: any[]) : Promise<[User, AuthToken]>

    protected abstract itemDescription() : string

}