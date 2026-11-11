import PostStatus from "../../../src/components/postStatus/PostStatus"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useUserInfo } from "../../../src/components/userInfo/UserInfoHooks";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken, User } from "tweeter-shared";
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";

library.add(fab);
jest.mock("../../../src/components/userInfo/UserInfoHooks", () => ({
    ...jest.requireActual("../../../src/components/userInfo/UserInfoHooks"),
    __esModule: true,
    useUserInfo: jest.fn(),
}));

let mockUserInstance: User;
let mockAuthTokenInstance: AuthToken;

describe("PostStatus Componenet", () => {
    beforeEach(() => {
        mockUserInstance = mock<User>();
        mockAuthTokenInstance = mock<AuthToken>();
    (useUserInfo as jest.Mock).mockReturnValue({
        currentUser: mockUserInstance,
        authToken: mockAuthTokenInstance
    });
    });
    
    it("When first rendered the Post Status and Clear buttons are both disabled", () => {
        const {postButton, clearButton } = renderPostStatusAndGetElements()
        expect(postButton).toBeDisabled();
        expect(clearButton).toBeDisabled();
    })
    it("both buttons are enabled when the text field has text", async () => {
        const {user, postButton, clearButton, textArea } = renderPostStatusAndGetElements();
        await user.type(textArea, "a");
        expect(clearButton).toBeEnabled();
        expect(postButton).toBeEnabled();
    })
    it("both buttons are disabled when the text field is cleared", async () => {
        const {user, postButton, clearButton, textArea } = renderPostStatusAndGetElements();
        await user.type(textArea, "a");
        expect(clearButton).toBeEnabled();
        expect(postButton).toBeEnabled();

        await user.clear(textArea);
        expect(clearButton).toBeDisabled();
        expect(postButton).toBeDisabled();
    })
    it("the presenter's postStatus method is called with correct parameters when the Post Status button is pressed", async () => {
            const mockPresenter = mock<PostStatusPresenter>();
            const mockPresenterInstance = instance(mockPresenter)

            const text = "sometext"
            const {user, postButton, textArea } = renderPostStatusAndGetElements(mockPresenterInstance);

            await user.type(textArea, text)
            await user.click(postButton)
            verify(mockPresenter.submitPost(text, mockUserInstance, mockAuthTokenInstance)).once();
        })
})

function renderPostStatus(presenter? : PostStatusPresenter) {
    return render(
        !! presenter ? (<PostStatus presenter={presenter}/> ) : (<PostStatus/>)
    );
}
function renderPostStatusAndGetElements(presenter? : PostStatusPresenter)
{
    const user = userEvent.setup();
    renderPostStatus(presenter);
    const postButton = screen.getByRole("button", { name: /Post Status/i });
    const clearButton = screen.getByRole("button", { name: /Clear/i });
    const textArea = screen.getByRole("textbox");

    return { user, postButton, clearButton, textArea };
}