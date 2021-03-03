export type AuthorizedRequest = Request & {
  headers: Request['headers'] & { authorization: string }
  user: {
    uid: string
    email?: string
  }
}
