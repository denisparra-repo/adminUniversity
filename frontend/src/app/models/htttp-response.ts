export interface UserResponse {
    name: string,
    lastname: string,
    email: string,
    roles: string
}

export interface HTTP_STANDARD_RESPONSE {
    message: string,
    status: number,
    data: any
}

export interface PAGEABLE<T> {
    content: Array<T>,
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
          empty : boolean,
          unsorted: boolean,
          sorted: boolean  
        },
        offset: number,
        unpaged: boolean,
        paged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: false
}

export interface HTTP_PAGEABLE_RESPONSE<T> {
    message: string,
    code: number,
    data: PAGEABLE<T>
}


