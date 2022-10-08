export interface UserPayload {
    user: string,
    clave: string,
}

export interface apiResponseLogin {
    tokenJWT: string,
    error: string,
}

export interface apiResponseRegister {
    id: number,
    user: string,
    error: string,
}