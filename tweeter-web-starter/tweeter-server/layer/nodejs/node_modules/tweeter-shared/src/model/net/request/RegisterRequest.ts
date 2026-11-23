import { LoginRequest } from "./LoginRequest"

export interface RegisterRequest extends LoginRequest
{
    readonly firstName : string
    readonly lastName : string
    readonly userImageBytes: string //changed, not sure about
    readonly imageFileExtension: string
}