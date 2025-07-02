import { PortableTextBlock } from '@portabletext/types';

export interface simpleBlogCard {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}

export interface Fullblog {
  currentSlug: string;
  title: string;
  Content: PortableTextBlock[];
  titleImage: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}
