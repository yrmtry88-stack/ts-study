// enum 타입 : 여러가지 값들에 각각 이름을 부여해 열거해두고 사용하는 타입
// 타입별칭과 다르게 대입연산자를 사용하지 않는다.
// enum은 컴파일해도 코드가 사라지지 않는다.

// 숫자형 enum
enum Role {
  ADMIN, 
  USER1,
  USER2,
  USER3=9,
  GUEST,
}

enum Language {
  Korea = 'ko',
  English = 'en'
}
const user1 = {
  name:"yr",
  role: Role.ADMIN, // 0
  language: Language.Korea
}
const user2 = {
  name:"yr",
  role: Role.USER1  // 1
}
const user3 = {
  name:"yr",
  role: Role.USER2, // 2
  language: Language.English
}
const user4 = {
  name:"yr",
  role: Role.USER3  // 9
}
const user5 = {
  name:"yr",
  role: Role.GUEST // 10
}
console.log(user1,user2,user3,user4, user5)