/**
 * 인덱스드 엑세스 타입
 */

interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age:number;
    location: string;
  }
}
// 여기서 author:Post["author"] author는 타입이다. 인덱스드 엑세스 타입은 스트링 리터럴 타입만 명시할 수 있다.
// id만 가져오고 싶으면 author:Post["author"][id] 로 타입을 작성한다.
function printAuthorInfo(author:Post["author"]){
  console.log(`${author.name}-${author.id}`);
}
const post: Post = {
  title: "게시글 제목",
  content: "게시글 본문",
  author:{
    id:1,
    name: "yoora",
    age:1,
    location:"seoul"
  },
}

type PostList = {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    age:number;
    location: string;
  }
}[];
function printAuthorInfo2(author:PostList[number]["author"]){
  console.log(`${author.name}-${author.id}`);
}
const post1: PostList[number] = {
  title: "게시글 제목",
  content: "게시글 본문",
  author:{
    id:1,
    name: "yoora",
    age:1,
    location:"seoul"
  },
}
printAuthorInfo2(post1.author);

type Tup = [number, string, boolean];

type Tup0 = Tup[0];
type Tup1 = Tup[1];
type Tup2 = Tup[2];

type TupNum = Tup[number];