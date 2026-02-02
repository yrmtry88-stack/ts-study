
// NumberList는 내부 배열이 number[]로 고정되어 있어서, 같은 로직을 string[], boolean[] 등에 재사용하려면 타입별로 클래스를 새로 만들어야 한다.
// 이런 중복을 줄이기 위해 타입만 바꿔 끼울 수 있는 제네릭 클래스를 사용하면 된다.
class NumberList {
  constructor(private list: number[]){}

  push(data: number){
    this.list.push(data);
  }
  pop(){
    return this.list.pop();
  }
  print(){
    console.log(this.list);
  }
}
const numberList = new NumberList([1,2,3]);
numberList.pop();
numberList.push(4);
numberList.print();

/**
 * 제네릭 클래스
 * List<T>는 T라는 타입 매개변수를 받아 내부 배열의 타입을 결정한다.
 * 따라서 List<number>, List<string>, List<boolean>처럼 동일한 코드로 서로 다른 타입의 리스트를 안전하게 다룰 수 있다.
 * 또한 생성자 인자에서 타입이 명확하면 new List([...]) 형태로 타입 추론이 가능해 <T>를 생략할 수도 있다.
 */

class List<T> {
  constructor(private list: T[]){}

  push(data:T){
    this.list.push(data);
  }
  pop(){
    return this.list.pop();
  }
  print(){
    console.log(this.list);
  }
}
const list1 = new List<number>([1,2,3]);
list1.pop();
list1.push(5);
list1.print();
const list2 = new List(["string","2","type"]);
list2.pop();
list2.push("str");
list2.print();
const list3 = new List([true,false, true, true]);
list3.pop();
list3.push(false);
list3.print();

