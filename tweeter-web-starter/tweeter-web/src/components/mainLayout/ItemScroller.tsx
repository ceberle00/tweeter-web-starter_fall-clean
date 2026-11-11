import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { useMessageActions } from "../toaster/MesssageHooks";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoHooks";
import { PagedItemPresenter, PagedItemView } from "../../presenter/PagedItemPresenter";
import { Service } from "../../model.service/Service";

export const PAGE_SIZE = 10;

interface Props<T, S extends Service,> {
    featureUrl : string,
    presenterFactory : (listener: PagedItemView<T>) => PagedItemPresenter<T, S>,
    itemComponentGenerator : (userOrStatus : T) => JSX.Element //either UserItem or StatusItem, how to get???? 

}

//generic types for status or user, 
//T : status or user,
//s for the service needed for PagedItemPresenter
//maybe another for the presenterType? Extends the presenter? IDK that way we can have useritempresenter and statusitempresenter
const ItemScroller = <T, S extends Service, >(props: Props<T, S>) => {
    const { displayErrorMessage } = useMessageActions();
    const [items, setItems] = useState<T[]>([]);

    const { displayedUser, authToken } = useUserInfo();
    const { setDisplayedUser } = useUserInfoActions();
    const { displayedUser: displayedUserAliasParam } = useParams();

    const listener: PagedItemView<T> = {
        addItems : (newItems: T[]) =>
            setItems((previousItems) => [...previousItems, ...newItems]),
        displayErrorMessage : displayErrorMessage
    }

    const presenterRef = useRef<PagedItemPresenter<T, S> | null>(null)
    if (!presenterRef.current) {
        presenterRef.current = props.presenterFactory(listener);
    }

    // Update the displayed user context variable whenever the displayedUser url parameter changes. This allows browser forward and back buttons to work correctly.
    useEffect(() => {
        if (
        authToken &&
        displayedUserAliasParam &&
        displayedUserAliasParam != displayedUser!.alias
        ) {
        presenterRef.current!.getUser(authToken!, displayedUserAliasParam!).then((toUser) => {
            if (toUser) {
            setDisplayedUser(toUser);
            }
        });
        }
    }, [displayedUserAliasParam]);

    // Initialize the component whenever the displayed user changes
    useEffect(() => {
        reset();
        loadMoreItems(null);
    }, [displayedUser]);

    const reset = async () => {
        setItems(() => []);
        presenterRef.current!.reset();
    };

    const loadMoreItems = async (lastItem: T | null) => {
        presenterRef.current!.loadMoreItems(authToken!, displayedUser!.alias)
    };

    return (
        <div className="container px-0 overflow-visible vh-100">
        <InfiniteScroll
            className="pr-0 mr-0"
            dataLength={items.length}
            next={() => loadMoreItems(presenterRef.current!.lastItem)}
            hasMore={presenterRef.current!.hasMoreItems}
            loader={<h4>Loading...</h4>}
        >
            {items.map((item, index) => (
            <div
                key={index}
                className="row mb-3 mx-0 px-0 border rounded bg-white"
            >
                {props.itemComponentGenerator(item)}
            </div>
            ))}
        </InfiniteScroll>
        </div>
    );
};

export default ItemScroller;