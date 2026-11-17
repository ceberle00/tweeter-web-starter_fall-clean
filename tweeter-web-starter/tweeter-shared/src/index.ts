export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";

// All classes that should be avaialble to other modules need to exported here. export * does not work when 
// uploading to lambda. Instead we have to list each export.
export { FakeData } from "./util/FakeData";

//DTOs
export type { UserDTO } from "./model/dto/UserDTO";

//Requests
export type { PagedUserItemRequest } from "./model/net/request/PagedUserItemRequest";
export type { CheckIfFollowRequest } from "./model/net/request/CheckIfFollowRequest";
export type { FollowRequests } from "./model/net/request/FollowRequests";

//Responses
export type { PagedUserItemResponse } from "./model/net/response/PagedUserItemResponse";
export type { CheckIfFollowResponse } from "./model/net/response/CheckIfFollowResponse";
export type { FollowCountResponse } from "./model/net/response/FollowCountResponse";
export type { ChangeFollowStatusResponse } from "./model/net/response/ChangeFollowStatusResponse";

