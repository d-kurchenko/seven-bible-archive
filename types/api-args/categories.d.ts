import { Bookmark, BookmarkCategory } from 'types/bookmark';

export interface GetPreparedCategoriesArgs {
  bibleFileName: string;
  categories: BookmarkCategory[];
}

export interface CreateCategoryArgs {
  filename: string;
  category: BookmarkCategory;
}
export interface DeleteCategoryArgs {
  filename: string;
  categoryName: string;
}
