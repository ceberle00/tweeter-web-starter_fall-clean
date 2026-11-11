import { AuthToken, User } from "tweeter-shared";
import { Service } from "../model.service/Service";
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export const PAGE_SIZE = 10;

export interface PagedItemView<T> extends View {
    addItems : (items: T[]) => void
}

export abstract class PagedItemPresenter<T, S extends Service> extends Presenter<PagedItemView<T>>
{
    private _hasMoreItems = true;
    private _lastItem: T | null = null;
    private _userService: UserService
    private _service: S

    public constructor(view : PagedItemView<T>) {
        super(view)
        this._userService = new UserService();
        this._service = this.serviceFactory();
    }
    
    public get lastItem() {
        return this._lastItem
    }
    public get hasMoreItems() {
        return this._hasMoreItems
    }
    protected set hasMoreItems(item : boolean) {
        this._hasMoreItems = item
    }
    protected set lastItem(item : T | null ) {
        this._lastItem = item
    }
    public get service() {
        return this._service
    }

    public async getUser (
        authToken: AuthToken,
        alias: string
    ): Promise<User | null> {
        // TODO: Replace with the result of calling server
        return await this._userService.getUser(authToken, alias);
    };
    public async loadMoreItems (authToken : AuthToken, userAlias : string)
    {
        await this.doFailureReportingOperation(async () => {
            const [newItems, hasMore] = await this.getMoreItems(authToken, userAlias)
            this._hasMoreItems = hasMore;
            this._lastItem = newItems.length > 0 ? newItems[newItems.length - 1] : null;
            this.view.addItems(newItems);
        }, this.itemDescription())
    };
    reset() {
        this._lastItem = null;
        this._hasMoreItems = true;
    }

    protected abstract itemDescription() : string
    protected abstract getMoreItems(authToken : AuthToken, userAlias : string) : Promise<[T[], boolean]>
    protected abstract serviceFactory() : S
}