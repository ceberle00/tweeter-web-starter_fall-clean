import { ServerFacade } from "../../src/network/ServerFacade"
import { FollowRequests, PagedUserItemRequest, RegisterRequest, User, UserDTO } from "tweeter-shared"
import { Buffer } from "buffer";
import "isomorphic-fetch"

describe("GetFollowers", () => {
    const facade = new ServerFacade()
    it("Register", async () => {
        const imageFile = new Uint8Array([1, 2, 3])
        const imageStringBase64: string = Buffer.from(imageFile).toString("base64");
        const request : RegisterRequest =
        {
            firstName : "firstName",
            lastName : "lastName",
            userAlias : "@testuser",
            password : "password",
            userImageBytes : imageStringBase64,
            imageFileExtension : "png"
        }
        const [user, token] = await facade.register(request)
        expect(user).not.toBeNull()
        expect(user.firstName).toBe("Allen")
        expect(user.lastName).toBe("Anderson")
        expect(token).not.toBeNull()
    })
    it("GetFollowers", async () => {
        const request : PagedUserItemRequest<UserDTO> =
        {
            token : "token",
            userAlias : "@allen",
            pageSize : 16,
            lastItem : null
        }
        const [users, isFollow] = await facade.getMoreFollowers(request)

        expect(users.length).toBeGreaterThan(0);
        expect(users.length).toBeLessThanOrEqual(16);

        expect(users[0].alias).toBeDefined();
        expect(users[0].firstName).toBeDefined();

        expect(typeof isFollow).toBe('boolean')
        expect(users[0]).toBeInstanceOf(User);

    })
    it("GetFollowersCount", async () => {
        const request : FollowRequests = {
            token: "token",
            userAlias: "@allen"
        }
        const numFollowers = await facade.getFollowersCount(request);

        expect(numFollowers).not.toBeNull();
        expect(typeof numFollowers).toBe("number");
        expect(numFollowers).toBeGreaterThan(0);
    })
})