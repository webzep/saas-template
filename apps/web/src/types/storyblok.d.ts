import {StoryblokStory} from 'storyblok-generate-ts'

export interface AssetStoryblok {
  _uid?: string;
  id: number | null;
  alt: string | null;
  name: string;
  focus: string | null;
  source: string | null;
  title: string | null;
  filename: string;
  copyright: string | null;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface AuthorStoryblok {
  name?: string;
  occupation?: string;
  avatar?: AssetStoryblok;
  _uid: string;
  component: "author";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface BlogStoryblok {
  title?: string;
  description?: string;
  banner?: AssetStoryblok;
  author?: any[];
  content?: RichtextStoryblok;
  _uid: string;
  component: "blog";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (AuthorStoryblok | BlogStoryblok | PageStoryblok | RichtextStoryblok)[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface RichtextStoryblok {
  content?: RichtextStoryblok;
  _uid: string;
  component: "richtext";
  [k: string]: any;
}
