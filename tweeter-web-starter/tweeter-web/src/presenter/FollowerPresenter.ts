import { AuthToken } from "tweeter-shared";
import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";


export class FollowerPresenter extends UserItemPresenter
{
    protected itemDescription(): string {
        return "load followers"
    }
    public async getMoreItems(authToken : AuthToken,  userAlias: string) {
        return this.service.loadMoreFollowers(authToken,userAlias,PAGE_SIZE,this.lastItem);
    }
}