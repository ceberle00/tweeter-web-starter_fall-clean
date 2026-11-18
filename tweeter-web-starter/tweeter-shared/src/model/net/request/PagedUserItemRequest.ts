
export interface PagedUserItemRequest <T>
{
    readonly token : string,
    readonly userAlias : string,
    readonly pageSize : number,
    readonly lastItem: T | null
}