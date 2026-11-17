"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const buffer_1 = require("buffer");
class UserService {
    async getUser(authToken, alias) {
        // TODO: Replace with the result of calling server
        return tweeter_shared_1.FakeData.instance.findUserByAlias(alias);
    }
    ;
    async login(alias, password) {
        // TODO: Replace with the result of calling the server
        const user = tweeter_shared_1.FakeData.instance.firstUser;
        if (user === null) {
            throw new Error("Invalid alias or password");
        }
        return [user, tweeter_shared_1.FakeData.instance.authToken];
    }
    ;
    async logout(authToken) {
        // Pause so we can see the logging out message. Delete when the call to the server is implemented.
        await new Promise((res) => setTimeout(res, 1000));
    }
    ;
    async register(firstName, lastName, alias, password, userImageBytes, imageFileExtension) {
        // Not neded now, but will be needed when you make the request to the server in milestone 3
        const imageStringBase64 = buffer_1.Buffer.from(userImageBytes).toString("base64");
        // TODO: Replace with the result of calling the server
        const user = tweeter_shared_1.FakeData.instance.firstUser;
        if (user === null) {
            throw new Error("Invalid registration");
        }
        return [user, tweeter_shared_1.FakeData.instance.authToken];
    }
    ;
}
exports.UserService = UserService;
