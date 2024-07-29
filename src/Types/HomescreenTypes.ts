export interface NewsItemProps {
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  id: string;
  author: string;
  isDeleted: boolean;
  textBgColor: string;
  source: {
    id: string;
    name: string;
  };
}
