import { AuthToken } from "tweeter-shared"
import {LogoutPresenter, LogoutView} from "../../src/presenter/LogoutPresenter"
import { anything, instance, mock, spy, verify, when} from "@typestrong/ts-mockito"
import { UserService } from "../../src/model.service/UserService"

describe("AppNavBarPresenter", () => {
    let mockAppNavbarPresenterView : LogoutView
    let appNavBarPresenter : LogoutPresenter
    let mockService : UserService

    const authToken = new AuthToken("abc123", Date.now());

    beforeEach(() => {
        mockAppNavbarPresenterView = mock<LogoutView>();
        const mockAppNavbarPresenterViewInstance = instance(mockAppNavbarPresenterView);

        when(mockAppNavbarPresenterView.displayInfoMessage(anything(), 0)).thenReturn("messageId");

        const appNavBarPresenterSpy = spy(new LogoutPresenter(mockAppNavbarPresenterViewInstance));
        appNavBarPresenter = instance(appNavBarPresenterSpy)

        mockService = mock<UserService>();

        when(appNavBarPresenterSpy.service).thenReturn(instance(mockService));

    })
    it("tells the view to display a logging out message", async() => {
        await appNavBarPresenter.logOut(authToken);
        verify(mockAppNavbarPresenterView.displayInfoMessage("Logging Out...", 0)).once();
    })
    it("calls logout on the user service with the correct auth token", async () => {
        await appNavBarPresenter.logOut(authToken);
        verify(mockService.logout(authToken)).once();
    })
    it("tells the view to clear the info message that was displayed previously, clear the user info, and navigate to the login page", async () => {
        await appNavBarPresenter.logOut(authToken);
        verify(mockAppNavbarPresenterView.displayErrorMessage(anything())).never();
        verify(mockAppNavbarPresenterView.deleteMessage("messageId")).once();
        verify(mockAppNavbarPresenterView.clearUserInfo()).once();
        verify(mockAppNavbarPresenterView.navigate("/login")).once();
    })
    it("tells the view to display an error message and does not tell it to clear the info message, clear the user info or navigate to the login page", async () => {
        let error = new Error("error")
        when(mockService.logout(anything())).thenThrow(error);

        await appNavBarPresenter.logOut(authToken);

        verify(mockAppNavbarPresenterView.displayErrorMessage("Failed to log user out because of exception: Error: error")).once();
        verify(mockAppNavbarPresenterView.clearUserInfo()).never();
        verify(mockAppNavbarPresenterView.deleteMessage(anything())).never();
        verify(mockAppNavbarPresenterView.navigate("/login")).never();
    })
})