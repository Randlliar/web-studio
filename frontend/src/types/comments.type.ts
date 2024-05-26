export type CommentType = {
  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  user: UserType
}

export type UserType = {
  id: string,
  name: string
}

export type CommentCountType = {
  allCount: number,
  comments : CommentType[]
}

export type AddCommentType = {
  text: string,
  article: string
}
