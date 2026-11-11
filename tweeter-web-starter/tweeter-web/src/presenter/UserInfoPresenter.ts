import { AuthToken, User } from "tweeter-shared";
import { DisplayedFollowCountPresenter } from "./DisplayedFollowCountPresenter";

export class UserInfoPresenter extends DisplayedFollowCountPresenter{

    public async setIsFollowerStatus (
        authToken: AuthToken,
        currentUser: User,
        displayedUser: User,
    ) {
        await this.doFailureReportingOperation(async () => {
            if (currentUser === displayedUser) {
                this.view.setIsFollower(false);
            } else {
                this.view.setIsFollower(
                    await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!),
                );
            }
        }, "determine follower status")
    };
    public async setNumbFollowees (
    authToken: AuthToken,
    displayedUser: User,
    ) {
        await this.doFailureReportingOperation(async () => {
            this.view.setFolloweeCount(await this.service.getFolloweeCount(authToken, displayedUser));
        }, "get followees count")
    };
    public async setNumbFollowers (
        authToken: AuthToken,
        displayedUser: User,
    ) {
        await this.doFailureReportingOperation(async () => {
            this.view.setFollowerCount(await this.service.getFollowerCount(authToken, displayedUser));
        }, "get followers count")
    };

    public async followDisplayedUser (
        displayedUser : User,
        authToken : AuthToken,
    ): Promise<void> {
        this.changeDisplayUser(
            displayedUser,
            authToken,
            `Following ${displayedUser!.name}...`,
            async () => {return this.service.follow(authToken!, displayedUser!)},
            true,
            "follow user"
        )
    };

    public async unfollowDisplayedUser (
        displayedUser : User,
        authToken : AuthToken
    ): Promise<void> {

        this.changeDisplayUser(
            displayedUser,
            authToken,
            `Unfollowing ${displayedUser!.name}...`,
            async () => {return this.service.unfollow(authToken!, displayedUser!)},
            false,
            "unfollow user"
        )
    };
}