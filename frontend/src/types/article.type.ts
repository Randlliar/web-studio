export type ArticleType = {
      id: string,
      title:string,
      description: string,
      image: string,
      date: string,
      category: string,
      url: string
}

export type ArticlePageType = {
  count: number,
  pages: number,
  items : ArticleType[];
}
