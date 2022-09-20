export interface UserLoginPayload {
    user: string,
    clave: string,
}

export interface apiResponseAuth {
    tokenJWT: string,
    error: string,
}