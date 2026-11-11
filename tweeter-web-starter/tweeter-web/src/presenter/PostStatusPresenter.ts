import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model.service/StatusService";
import { isLoadingView, MessageView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageView, isLoadingView
{
    setPost : (value : string) => void;
}
export class PostStatusPresenter extends Presenter<PostStatusView>{
    private _service : StatusService;

    public constructor(view : PostStatusView) {
        super(view)
        this._service = new StatusService()
    }
    public get service() {
        return this._service;
    }

    public async submitPost(post : string, currentUser : User, authToken : AuthToken) {

        var postingStatusToastId = ""; //is this fine??
        await this.doFailureFinallyReportingOperation(async () => {
            this.view.setIsLoading(true);
            postingStatusToastId = this.view.displayInfoMessage(
                "Posting status...",
                0,
            );

            const status = new Status(post, currentUser, Date.now());

            await this.service.postStatus(authToken, status);

            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        }, "post the status", () => {
            this.view.deleteMessage(postingStatusToastId);
            this.view.setIsLoading(false);
        })
    };
}