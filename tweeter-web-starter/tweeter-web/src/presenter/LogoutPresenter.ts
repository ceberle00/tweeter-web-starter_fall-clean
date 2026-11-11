//called in appNavBar

import { AuthToken } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { MessageView, NavView, Presenter } from "./Presenter";

export interface LogoutView extends MessageView, NavView //eventually navView as well
{
    clearUserInfo: () => void
}
export class LogoutPresenter extends Presenter<LogoutView>{
    private _service : UserService
    public constructor(view : LogoutView) {
        super(view)
        this._service = new UserService();
    }
    public get service() {
        return this._service;
    }

    public async logOut (authToken : AuthToken) {
        const loggingOutToastId = this.view.displayInfoMessage("Logging Out...", 0)
        await this.doFailureReportingOperation(async () => {
            await this.service.logout(authToken!);
            this.view.deleteMessage(loggingOutToastId);
            this.view.clearUserInfo();
            this.view.navigate("/login");
        }, "log user out")
    };
}