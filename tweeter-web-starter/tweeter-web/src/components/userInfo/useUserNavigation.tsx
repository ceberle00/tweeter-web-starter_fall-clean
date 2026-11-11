import { useNavigate } from "react-router-dom";
import { useMessageActions } from "../toaster/MesssageHooks";
import { useUserInfo, useUserInfoActions } from "./UserInfoHooks";
import { UserNavigationPresenter, UserNavigationView } from "../../presenter/UserNagivationPresenter";
import { useRef } from "react";

export const useUserNavigation = (featureUrl : string) => {
    const { displayErrorMessage } = useMessageActions();
    const { displayedUser, authToken } = useUserInfo();
    const { setDisplayedUser } = useUserInfoActions();
    const navigate = useNavigate();


    const listener : UserNavigationView = {
    displayErrorMessage : displayErrorMessage,
    navigate : navigate,
    setDisplayedUser : setDisplayedUser
    }
    const presenterRef = useRef<UserNavigationPresenter | null>(null)
        if (!presenterRef.current) {
            presenterRef.current = new UserNavigationPresenter(listener);
        }
    const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
        event.preventDefault();
        presenterRef.current!.navigateToUser(event.target.toString(), authToken!, displayedUser!, featureUrl)
    };
    
    return {navigateToUser}
}