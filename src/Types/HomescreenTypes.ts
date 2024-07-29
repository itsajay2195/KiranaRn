export interface NewsItemProps {
  data: {
    title: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    id: string;
    author: string;
    source: {
      id: string;
      name: string;
    };
  };
}
