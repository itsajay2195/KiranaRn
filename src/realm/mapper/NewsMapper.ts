class NewsMapper {
  toNewsMapper = (news: any[]) => {
    return news?.map(item => {
      const newsObj = {
        id: item?.id,
        source: item?.source,
        author: item?.author,
        url: item.url,
        urlToImage: item.urlToImage,
        title: item.title || '',
        description: item.description || '',
        publishedAt: item.published || '',
      };
      return newsObj;
    });
  };
}

const newsMapper = new NewsMapper();
export {newsMapper};
