/**
 * 맵드 타입 기반
 * Partial<T> , Pick<T, K>, Required<T>, Omit<T, K>, Readonly<T>, Record<K, V>
 * 
 * 조건부 타입 기반
 * Exclude<T, U>, Extract<T, U>, ReturnType<T>
 */

/**
 * Partial<T>
 * -> 부분적인, 일부분의
 * -> 특정 객체 타입의 모든 프로퍼티를 선택적 프로퍼티로 바꿔주는 타입
 */
 interface Post {
  title: string;
  tag: string[];
  content: string;
  thumbnailURL?: string;
 }

 type Partial<T> = {
  [key in keyof T] ?: T[key];
 };
 const draft: Partial<Post> = {
  title:"제목",
  content: "초안"
 }

 /**
  * Required<T>
  * -> 필수의, 필수적인
  * -> 특정 객체 타입의 모든 프로퍼티를 필수 프로퍼티로 바꿔주는 타입
  */

 type Required<T> = {
  [key in keyof T]-?: T[key]
 }
 const withThumbnailPost: Required<Post> = {
    title:"제목",
    tag: ["ts"],
    content: "초안",
    thumbnailURL:"https://.."
 }  

 
 /**
  * Readonly<T>
  * -> 읽기전용 수정불가
  * -> 특정 객체 타입에서 모든 프로퍼티를 읽기 전용 프로퍼티로 만들어주는 타입
  */

 type Readonly<T> = {
  readonly [key in keyof T]: T[key];
 }
 const readonlyPost: Readonly<Post> = {
    title:"제목",
    tag: ["ts"],
    content: "초안",
 }

 /**
  * Pick<T, K>
  * -> 뽑다, 고르다
  * -> 객체 타입으로부터 특정 프로퍼티만 골라내는 타입
  */

 type Pick<T, K extends keyof T> = {
  // K extends 'title' | 'tags' | 'content' | 'thumbnailURL'
  // => ('title' | 'content') extends ('title' | 'tags' | 'content' | 'thumbnailURL')
  [key in K] : T[key];
 }
 const legacyPost: Pick<Post, "title" | "content"> = {
  title: "옛날 글",
  content:"옛날 컨텐츠"
 }

 /**
  * Omit<T, K>
  * -> 생략하다, 빼다
  * -> 객체 타입으로부터 특정 프로퍼티를 제거하는 타입
  */

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>; 
// T = Post, K = 'title'
// Pick<Post, Exclude<keyof Post, 'title'>>
// Pick<Post, Exclude<'title' | 'tags' | 'content' | 'thumbnailURL', 'title'>>
// Pick<Post, 'tags' | 'content' | 'thumbnailURL'>


// 타이틀만 제거 필요한 변수
const noTitlePost: Omit<Post, "title"> = {
  tag: ["ts"],
  content: "초안",
  thumbnailURL:"https://.."
}


 /**
  * Record<K, V>
  */

type Record<K extends keyof any ,V> = {
  [key in K]: V;
} 

type ThumbnailLegacy = {
  large: {
    url: string;
  };
  medium: {
    url: string;
  };
  small: {
    url: string;
  };
  watch: {
    url: string;
  };
};

type Thumbnail = Record<'large' | 'medium' | 'small' | 'watch' , {url: string; size:number;} >