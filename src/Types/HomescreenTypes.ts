export interface NewsItemProps {
  data: {
    title: string;
    url: string;
    urltoimage: string;
    publishedAt: string;
    id: string;
    author: string;
    source: {
      id: string;
      name: string;
    };
  };
}
