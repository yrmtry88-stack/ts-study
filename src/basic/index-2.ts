// 타입 별칭
type User = {
  id: number;
  name: string;
  nickname: string;
  birth:string;
  bio: string;
  location: string;
  extra?:string;
}
let user1: User={
  id: 1,
  name: "yr",
  nickname: "yr",
  birth:"yy-mm-dd",
  bio: "hi",
  location: "seoul"
}
let user2: User={
  id: 1,
  name: "yr",
  nickname: "yr",
  birth:"yy-mm-dd",
  bio: "hi",
  location: "seoul",
  extra:"특이사항"
}

// 인덱스 시그니처
type CountryCodes = {
  [key:string]: string;
}
let countryCodes: CountryCodes = {
  Korea: 'ko',
  UnitedState:"us",
  UnitedKingdom:'uk'
}
type CountryNumberCodes = {
  [key:string]: number;
  Korea:number // 필수로 포함하여야 하는 프로퍼티 (반드시 호환되는 타입이거나 number 타입이어야 함.)
}
let countryNumberCodes: CountryNumberCodes = {
  Korea: 410,
  UnitedState:840,
  UnitedKingdom:826
}
