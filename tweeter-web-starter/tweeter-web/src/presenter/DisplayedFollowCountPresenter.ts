import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model.service/FollowService";
import { isLoadingView, MessageView, Presenter } from "./Presenter";

export interface DisplayedFollowCountView extends MessageView, isLoadingView {
    //follow specific:
    setIsFollower : (isFollow : boolean) => void,
    setFollowerCount : (num : number) => void,
    setFolloweeCount : (num : number) => void
}
export abstract class DisplayedFollowCountPresenter extends Presenter<DisplayedFollowCountView>
{
    private _service : FollowService;
    public constructor(view : DisplayedFollowCountView)
    {
        super(view)
        this._service = new FollowService()
    }
    public get service() {
        return this._service
    }
    public async changeDisplayUser (
        displayedUser : User,
        authToken : AuthToken,
        message : string,
        followFunction: (authToken: AuthToken, displayedUser: User) => Promise<[number, number]>,
        isFollowerBool : boolean,
        errorMessage : string
    ): Promise<void> {

        var changedUserToast = "";
        await this.doFailureFinallyReportingOperation(async () => {
            this.view.setIsLoading(true);
            changedUserToast = this.view.displayInfoMessage(
                message,
                0,
            );

            const [followerCount, followeeCount] = await followFunction(authToken, displayedUser)

            this.view.setIsFollower(isFollowerBool);
            this.view.setFollowerCount(followerCount);
            this.view.setFolloweeCount(followeeCount);
        }, errorMessage, () => {
            this.view.deleteMessage(changedUserToast);
            this.view.setIsLoading(false);
        })
    };
}