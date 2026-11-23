import { UserDTO } from "./UserDTO";

export interface StatusDTO 
{
    readonly post: string;
    readonly user: UserDTO;
    readonly timestamp: number;
}