import { AuthToken, User } from "tweeter-shared"
import {PostStatusPresenter, PostStatusView} from "../../src/presenter/PostStatusPresenter"
import {anything, capture, instance, mock, spy, verify, when} from "@typestrong/ts-mockito"
import { StatusService } from "../../src/model.service/StatusService"

describe("PostStatusPresenter", () => {
    let mockPostStatusPresenterView : PostStatusView
    let postStatusPresenter : PostStatusPresenter
    let mockService : StatusService

    const authToken = new AuthToken("abc", Date.now())
    const user = new User("name", "last", "user", "url")

    beforeEach(() => {
        mockPostStatusPresenterView = mock<PostStatusView>();
        const mockPostStatusPresenterViewInstance = instance(mockPostStatusPresenterView);

        const appPostStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusPresenterViewInstance))
        postStatusPresenter = instance(appPostStatusPresenterSpy)

        mockService = mock<StatusService>();
        when(appPostStatusPresenterSpy.service).thenReturn(instance(mockService))
    })
    it("tells the view to display a posting status message", async () => {
        await postStatusPresenter.submitPost("message", user, authToken)
        verify(mockPostStatusPresenterView.displayInfoMessage("Posting status...", 0)).once();
    })
    it("calls postStatus on the post status service with the correct status string and auth token", async () => {
        await postStatusPresenter.submitPost("message", user, authToken);
        let [auth, status] = capture(mockService.postStatus).last();
        expect(auth).toEqual(authToken)
        expect(status.post).toEqual("message")
    })
    it("tells the view to clear the info message that was displayed previously, clear the post, and display a status posted message", async () => {
        await postStatusPresenter.submitPost("message", user, authToken);
        verify(mockPostStatusPresenterView.deleteMessage(anything())).once();
        verify(mockPostStatusPresenterView.setPost("")).once();
        verify(mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)).once(); //idk
    })
    it("tells the view to clear the info message and display an error message but does not tell it to clear the post or display a status posted message", async () => {
        let error = new Error("error")
        when(mockService.postStatus(anything(), anything())).thenThrow(error)
        await postStatusPresenter.submitPost("message", user, authToken);
        verify(mockPostStatusPresenterView.displayErrorMessage("Failed to post the status because of exception: Error: error")).once();
        verify(mockPostStatusPresenterView.deleteMessage(anything())).once()
        verify(mockPostStatusPresenterView.setPost("")).never();
        verify(mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)).never();
    })
})