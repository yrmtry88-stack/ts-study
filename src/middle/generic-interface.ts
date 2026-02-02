/**
 * 제네릭 인터페이스
 * 
 */
// 타입변수(공식문서) = 타입 파라미터 = 제네릭 타입 변수 = 제네릭 타입 파라미터
interface KeyPair<K, V>{
  key: K;
  value: V;
}

// 제네릭 인터페이스를 사용할 때는 반드시 타입으로 사용할 때 타입을 <>에 명시해야 한다.
let keyPair:KeyPair<string, number> = {
  key: "key",
  value:0
}
let keyPair2 :KeyPair<boolean, string[]> = {
  key: true,
  value:["1"]
}

/**
 * 제네릭 인터페이스 + 인덱스 시그니처
 */
interface NumberMap {
  [key:string]: number;
}
let numberMap1 : NumberMap = {
  key: -1231, 
  key2: 123123
}

interface Map1<V> {
  [key: string]: V;
}
let stringMap: Map1<string> = {
  key:"value"
}
let booleanMap: Map1<boolean> = {
  key: true
}

/**
 * 제네릭 타입 별칭
 */

type Map2<V>={
  [key: string]: V;
}
let stringMap2: Map2<string> = {
  key: "hello"
}

/**
 * 제네릭 인터페이스의 활용 예시
 * -> 유저 관리 프로그램
 * -> 유저 구분 : 학생 유저 / 개발자 유저
 */
interface Student {
  type: "student";
  school: string;
}

interface Developer {
  type: "developer";
  skill: string;
}

interface User<T> {
  name: string;
  profile: T;
}

function goToSchool(user: User<Student>){
  if(user.profile.type!=='student'){
    console.log("잘못 오셨습니다.")
    return;
  }
  const school = user.profile.school;
  console.log(`${school}로 등교 완료`);
}
const developerUser : User<Developer> ={
  name:"yoora",
  profile:{
    type:"developer",
    skill: "TS"
  }
}
const studentUser : User<Student> ={
  name:"yoora2",
  profile:{
    type:"student",
    school: "대학교"
  }
}