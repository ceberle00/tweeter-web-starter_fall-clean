import { MemoryRouter } from "react-router-dom";
import Login from "../../../src/components/authentication/login/Login"
import {render, screen } from "@testing-library/react"
import {userEvent} from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { LoginPresenter } from "../../../src/presenter/LoginPresenter";
import { instance, mock, verify } from "@typestrong/ts-mockito";

library.add(fab);


describe("Login Componenet", () => {
    it("when first rendered the sign-in button is disabled", () => {
        const {signInButton} = renderLoginAndGetElement("/");
        expect(signInButton).toBeDisabled();
    })
    it("enabled when both the alias and password fields have text", async () => {
        const {signInButton, aliasField, passwordField, user } = renderLoginAndGetElement("/")
        await user.type(aliasField, "a")
        await user.type(passwordField, "b")

        expect(signInButton).toBeEnabled();
    })
    it("disabled if either the alias or password field is cleared", async () => {
        const {signInButton, aliasField, passwordField, user } = renderLoginAndGetElement("/")
        await user.type(aliasField, "a")
        await user.type(passwordField, "b")
        expect(signInButton).toBeEnabled();

        await user.clear(aliasField)
        expect(signInButton).toBeDisabled()
        
        await user.type(aliasField, "a")
        expect(signInButton).toBeEnabled();

        await user.clear(passwordField)
        expect(signInButton).toBeDisabled()

    })

    it("login method is called with correct parameters when the sign-in button is pressed", async () => {
        const mockPresenter = mock<LoginPresenter>();
        const mockPresenterInstance = instance(mockPresenter)

        const ogUrl = "hello"
        const ogPass = "bye"
        const alias = "alias"

        const {signInButton, aliasField, passwordField, user } = renderLoginAndGetElement(ogUrl, mockPresenterInstance)

        await user.type(aliasField, alias);
        await user.type(passwordField, ogPass);

        await user.click(signInButton);
        verify(mockPresenter.auth(alias, ogPass, ogUrl, false)).once();
    })
    
})
function renderLogin(originalUrl : string, presenter? : LoginPresenter) {
    return render(
        <MemoryRouter>
            {!! presenter ? (<Login originalUrl={originalUrl} presenter={presenter}/> ) : (<Login originalUrl={originalUrl}/>)}
        </MemoryRouter>
    )
}

function renderLoginAndGetElement(originalUrl : string, presenter? : LoginPresenter) {
    const user = userEvent.setup();
    renderLogin(originalUrl, presenter);

    const signInButton = screen.getAllByRole("button", {name: /Sign in/i})[0];
    const aliasField = screen.getByLabelText("alias");
    const passwordField = screen.getByLabelText("password");

    return {user, signInButton, aliasField, passwordField};
}