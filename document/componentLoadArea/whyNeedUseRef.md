## 현재 코드의 문제점
- input 태그의 입력 정보를 `useState`로 저장하기 때문에 input 태그에 값을 입력할 때마다 컴포넌트 함수가 다시 실행되어 컴퓨팅 리소스의 낭비가 일어난다.
- `useRef`라는 기술을 사용하여 유저가 input 태그에 값을 입력하여도 컴포넌트 함수가 다시 실행되지 않게 코드를 작성할 수 있다.

## 리액트의 특징
- 리액트에서 어떤 값을 저장하기 위해서는 상태 변경 함수에 변경되는 값을 전달해야 한다. 상태 변경 함수가 실행이 되면 리액트는 컴포넌트 함수를 다시 실행하여 컴포넌트 함수 내부에서 선언되는 상태 변수의 값을 앞서 상태 변경 함수에 전달했던 값으로 세팅을 한다.
- 리액트에서 화면에 출력되는 값을 변경하기 위해서는 상태 변경 함수를 실행해야 한다. 상태 변경 함수가 실행되면 컴포넌트 함수가 실행되고 컴포넌트 함수가 반환하는 JSX와 이전에 렌더링된 JSX와 비교하여 변경점이 있다면 변경된 부분의 JSX 태그를 화면에 다시 랜더링 하는 방식이다. 만약 태그의 속성만 변경되었다면 리액트는 태그를 대체하지 않고 랜더링 되는 태그의 속성만 변경하도록 한다.

## 상태 변경을 통한 input 값 저장
```js
// ...

function App() {
  // ...
  const [inputValue, setInputValue] = useState();
  console.log(inputValue);
  // ...
}

// ...
```
- `const [inputValue, setInputValue] = useState()` 코드 아래에 `console.log(inputValue)`를 입력 해 보자.
- 브라우저의 콘솔 창을 열고 input 태그에 값을 입력한 후 확인하면 값을 입력할 때마다 `console.log(inputValue)`가 실행되는 것을 알 수 있다. 이를 통해서 input 태그에 값을 한 글자라도 입력을 할 때마다 컴포넌트 함수가 다시 실행된다는 것을 확인할 수 있다.

## 왜 useRef가 만들어졌는가?

### 컴포넌트 함수를 실행하지 않는 저장 방식의 필요성
- 리액트에서 컴포넌트 함수 외부에 var 또는 let을 사용해서 변수를 만들면 컴포넌트 함수를 다시 실행하지 않고서도 변수에 값을 저장할 수 있고, 컴포넌트 함수를 다시 실행하더라도 변수에 값이 사라지지 않는다. 하지만 이는 동일한 컴포넌트 함수를 여러번 재사용하는 경우 변수의 공유가 일어나기 때문에 안티 패턴이 되어 사용하지 않는다고 하였다.
- 리액트에서 상태를 통해서 값을 저장하기 위해서는 컴포넌트 상태 변경 함수를 통해 상태 변경을 시도하고, 상태 변경에 따라서 컴포넌트 함수가 다시 실행되면서 함수 내부의 상태 변수의 값이 할당될 때, 컴포넌트 함수가 실행되기 전 상태에서 지정된 변경 값을 상태 변수의 초기 값으로 할당하는 방식으로 이뤄진다. 하지만 이 방식이 컴퓨팅 리소스를 소모하기 때문에 컴포넌트 함수 외부의 var, let과 비슷한 방식으로 컴포넌트 함수를 재시작 하지는 않지만 안티패턴이 아닌 방식의 값 저장 방식을 만들 필요성이 있다.
- **1. "변수에 값을 저장할 때 컴포넌트 함수를 실행하지 않으면서"**, **2. "컴포넌트 함수가 다시 실행될 때는 저장한 변수 값을 컴포넌트 함수에서 초기값으로 갖는"** 저장 방식을 만들면 컴포넌트 함수 외부에 변수를 두지 않고도 변경되는 값을 저장할 수 있다.

### 일반적인 태그와 달리 input 태그의 특이점
- 일반적인 태그와 달리 input 태그의 특이한 점은 브라우저에서 제공하는 기능이란 것이다. input 태그에 입력하는 값은 유저가 HTML의 태그로 만들지 않아도 화면에 입력한 값이 표시된다. 일반적인 태그는 화면에 나타나는 모습을 바꾸기 위해 태그 자체를 변경시켜야 하지만, input 태그와 같은 유저의 입력을 받는 태그는 유저의 입력을 받을 때 태그 자체를 변경시키지 않아도 된다.

### 상태 변경을 사용하지 않아도 컴포넌트 함수의 실행에 따른 값 유지의 필요성
- 리액트의 상태 변경에 따른 컴포넌트 함수의 재실행은 일반적인 태그의 변경을 화면에 표시할 때 쓰는 방식이지만, input 태그와 같이 태그의 직접적인 변경이 없을 경우, 유저 입력 값을 저장하기 위한 용도로 컴포넌트 함수를 재실행한다는 것은 컴퓨팅 리소스 낭비이다.
- input 태그의 유저의 입력값을 화면에 표시하는 기능은 태그를 화면에 다시 그릴 필요 없이, 브라우저가 제공하는 기능이기 때문에 리액트가 태그를 화면에 다시 그릴 필요가 없다. 유저의 입력 값을 자바스크립트 코드로 가져오려면 유저의 입력이 있을 때 마다 함수를 실행하는 이벤트를 이용해서 유저의 입력 값을 자바스크립트 코드로 가져와야 한다.
- input 태그에 입력한 값을 저장할 때는 컴포넌트가 다시 실행되어도 저장된 값이 유지될 수 있도록 저장을 해야한다. 하지만 리액트에서 컴포넌트 함수가 다시 실행 되어도 저장한 값을 보존하려면 상태 변경 함수를 이용한 저장방식을 써야 한다.
- 하지만 상태 변경 함수를 이용하면 컴포넌트 함수가 다시 실행되어 버리기 때문에 컴퓨팅 리소스 낭비에 대한 대책이 될 수 없다. 1. **저장할 때 직접적으로 컴포넌트 함수를 다시 실행하지 않으면서**도 2. **컴포넌트 함수가 다시 실행이 되어도 저장한 값을 보존**할 수 있는 기능이 필요하다.

## 지역변수를 사용하지 않는 이유

### 지역변수를 사용해 보기
- input 태그의 입력 값이 태그를 다시 그릴 필요가 없는 것이라면 상태변수를 굳이 사용하지 않는 방식을 생각해 볼 수 있다. 이를 위해 컴포넌트 함수 안에 임시적으로 값을 저장할 수 있는 지역 변수를 만드는 방식을 생각해 볼 수 있다. 이 때 값이 객체가 아닌 일반적인 값이라면 값의 변경을 위해 `const`가 아닌 `let` 또는 `var` 변수를 사용해야 변수에 값을 바꾸어 저장할 수 있다.
- input 태그에 유저가 값을 입력할 때 마다 onChange 이벤트가 실행이 된다. onChange 이벤트로 함수가 실행이 될 때 input 태그에 유저가 입력한 값을 컴포넌트 함수 안에 `let` 또는 `var`으로 선언한 변수의 값에 저장한다.

### 컴포넌트 함수 재실행으로 발생하는 문제점
- input 값을 컴포넌트 함수 내부에서 선언한 지역 변수에 저장하는 것은 상태 변수를 변경하는 것이 아니기 때문에 만약 어떤 요인에 의해서 컴포넌트 함수가 다시 실행 될 경우, 컴포넌트 함수에 의해서 지역변수의 값이 초기화 되어 버린다.
- input 태그에 값을 입력하고 있는데 컴포넌트 함수가 재시작 되면 지역 변수에 저장하던 값이 사라지지만 input 태그에 유저가 입력한 값은 input 태그의 변경이 없을 경우에는 그대로 유지되므로 컴포넌트 함수가 재시작 되고 나서 input 태그에 입력한 값을 사용하려고 시도하면 컴포넌트 함수 내의 지역 변수는 초기화가 되었기 때문에 input에 넣은 값과 다른 값이 사용되는 문제가 발생한다.
- 초기화를 대응하기 위해서 input 태그의 초기 값을 이전 input 태그에서 사용하던 값으로 세팅할 수 있는 방법이 필요하다. 하지만 컴포넌트 함수를 재실행 했을 때 이전 컴포넌트의 값을 가져오는 방법은 상태를 사용하는 방법뿐이다. 어떤 경우에서든 컴포넌트 함수가 재실행되는 경우에 이전의 컴포넌트 값을 사용할 수 있는 방법은 리액트의 상태를 사용하는 방법뿐이다.

### 코드 변경하기
#### 상태 저장 방식 변경
변경 전
```js
const [inputValue, setInputValue] = useState();
console.log(inputValue);
```
변경 후
```js
let inputValue = 0;
console.log(inputValue);
```

#### input 값 저장 방식 변경
변경 전
```js
const changeInputValue = (e) => {
  setInputValue(parseInt(e.target.value));
}
```

변경 후
```js
const changeInputValue = (e) => {
  inputValue = parseInt(e.target.value);
}
```
- 변경 전과 변경 후의 코드를 보면, 변경 전에는 상태 변경 함수를 통해서 유저가 input 태그에 입력한 값을 저장한 반면, 변경 후는 상태 변경 없이 변수에 값을 저장하는 방식으로 바뀌었다.

#### 코드 변경의 결과
- 브라우저의 콘솔 창에서 확인 했을 때, input 태그에 입력을 하여도 `console.log(inputValue)` 부분에 대한 결과 값이 나오지 않는 것을 알 수 있다. 컴포넌트 함수 내에서 사용한 `let`, `var` 사용한 지역 변수는 변경을 해도 상태를 사용한 것과 달리 컴포넌트 함수가 실행되지 않는다는 것을 알 수 있다.
- 하지만 유효한 범위의 입력값 1~5의 값 중 하나인 3을 input 태그에 입력을 하고 move 버튼을 누르게 되면 화면의 `current component number : 3` 부분으로 값이 변경되는 것을 알 수 있다.
- `move` 함수는 `setComponentNumber(inputValue)` 코드를 통해 저장된 `inputValue`의 값으로 상태 변경을 하기 때문에 컴포넌트 함수가 다시 실행되면서 `console.log(inputValue)` 부분의 코드가 실행된다.
- 그런데 이 때 브라우저의 콘솔 창에 찍힌 값을 확인하면 `0`으로 표기된다. input 태그에 입력되어 있는 값은 3인데 `inputValue` 변수에 저장되어 있는 값은 컴포넌트 함수가 다시 실행되면서 초기값 `let inputValue = 0`인 0이 실행되어 버린 것이다.
- 이를 통해 리액트의 상태가 변경되면서 지역변수는 사라지게 된다는 문제점을 확인할 수 있다.

### 초기값 바꾸기
```js
const [componentNumber, setComponentNumber] = useState(lastComponentNumber);
let inputValue = componentNumber;
console.log(inputValue);
```
- 상태 변경에 따라 컴포넌트 함수가 재실행 되면서 초기값이 `0`이 된다는 문제가 있기 때문에, 초기값을 `componentNumber`으로 세팅을 해 주었다.
- move 버튼을 누를 때 `setComponentNumber(inputValue)` 코드가 실행되면서 상태가 변경이 될 때, `componentNumber` 값과 `inputValue` 값이 동일하게 된다. 따라서 input 태그 안에 입력한 값이 `inputValue`의 초기값으로 세팅이 된다.

### 지역변수가 문제가 되는 이유
- 예를 들어 input 태그 안의 유저의 입력값을 3으로 한 뒤 move 버튼을 누른다. 현재 컴포넌트 번호가 3이 되고 input 태그 안에 입력된 값은 3인 상태이다. move 버튼을 누르지 않고 prev나 next 버튼을 눌러보자. 그리고 move 버튼을 누르면 컴포넌트 번호가 3으로 변경되어야 하는데 2로 변경된다.

#### 왜 이런일이 발생할까?
- prev나 next 버튼을 누른 상태라면 상태 변경 함수를 통해 상태 값이 변경이 되고 컴포넌트 함수가 다시 실행된다. 이때 prev 버튼은 `setComponentNumber(componentNumber-1)`의 값으로 상태 변경 값을 설정하고 있고, next 버튼은 `setComponentNumber(componentNumber+1)`의 값으로 상태 변경 값을 설정하고 있으므로 컴포넌트 함수가 다시 실행될 때 `componentNumber`의 값은 이전값의 +1 또는 -1이 된 값이 저장되어 있다.
- input 태그에 값을 입력한 후 prev나 next 등의 다른 버튼을 누르지 않고 move 버튼을 누르게 되면 input 태그에 값을 입력 하면서 onchange 이벤트가 동작하면서 `changeInputValue` 함수를 실행하고 `inputValue` 지역변수의 값을 변경하고 move 버튼을 누르면 이 `inputValue`값을 `componentNumber` 값으로 상태 변수를 변경 하지만 prev나 next 등의 다른 상태 변경 함수를 실행하였다면 컴포넌트 함수가 다시 실행하게 되면서 `inputValue`의 값이 input 태그에 입력한 값이 아니라, `componentNumber+1` 또는 `componentNumber-1`한 값이 `let inputValue = componentNumber` 부분의 코드에 의해 실행되어 버린다.

#### 원인 정리
- 컴포넌트 함수 안의 지역 변수는 상태 변경이 될 때 컴포넌트 함수가 다시 실행되면서 초기화 된다. 변수를 저장하기 위해 만들어 둔 지역변수가 초기화 될 때 이전 컴포넌트 함수가 실행되는 시기에 저장한 값을 현재 컴포넌트 함수가 실행되었을 때의 초기값으로 가져와야 한다. 이를 위해서 리액트에서 상태 변경을 할 때 지역 변수에 저장되어 있는 값도 항상 상태 변경 함수에 전달해야 컴포넌트 함수가 다시 실행되면서 지역변수를 초기화할 때 이전에 지역 변수에 저장한 값을 다시 사용할 수 있기 때문이다.
- 하지만 리액트 컴포넌트 내에서 상태 변경 함수를 실행하는 요인은 다양하다. 모든 상태 변경이 일어날 때 마다 현재 시점의 컴포넌트 함수의 지역 변수에 저장되어 있는 값을 상태 변경 함수로 전달해서 다음 컴포넌트 함수가 실행될 때 변경된 상태 값으로 지역 변수를 초기화 할 수 있는 로직을 만들어 줘야 한다.
- 모든 상태 변수가 변경 될 때 지역 변수에 저장된 값을 상태 변경 함수로 초기화 해 준다는 것은 지역 변수를 사용하여 무언가를 만들 때 모든 상태 변수를 고려해서 만들어야 한다는 불편함을 초래한다.

#### 지역변수 문제 해결해 보기
- 상태 변경 함수에 변경 값을 전달 하는 로직에 컴포넌트 함수의 지역변수를 다음 컴포넌트 함수를 실행할 때 지역변수의 초기 값으로 세팅할 수 있도록 지역변수의 값을 상태로 만들어 전달 해야한다.
```js
const [inputValueState, setInputValueState] = useState(0);
let inputValue = inputValueState;
```
- `let inputValue = componentNumber;` 코드 위에 `inputValue`를 상태 값으로 전달하기 위해서 `inputValueState` 상태 변수와 `setInputValueState` 상태 함수를 만든다.
- `inputValue`의 초기값은 상태 변수로 전달 받은 값으로 세팅한다.
```js
const prev = () => {
  if(1 < componentNumber) {
    setComponentNumber(componentNumber-1);
    setInputValueState(inputValue);
  }
}
  
const next = () => {
  if(componentNumber < lastComponentNumber) {
    setComponentNumber(componentNumber+1);
    setInputValueState(inputValue);
  }
}
```
```js
const move = () => {
  if(0 < inputValue && inputValue <= lastComponentNumber) {
    setComponentNumber(inputValue);
    setInputValueState(inputValue);
  } else {
    alert('컴포넌트 번호가 정의된 범위 밖입니다.');
  }
}
```
- 모든 상태 변경을 할 때 마다 `inputValue`의 값도 다음 컴포넌트 함수에 전달하기 위해 상태 변경 함수를 통해 전달한다.
- 이렇게 코드를 만들면 상태 변경으로 컴포넌트 함수가 재실행 될 때마다 지역 변수 `inputValue`의 값을 다음 컴포넌트 함수 지역 변수의 초기 값으로 설정할 수 있다.

### 지역 변수 사용의 장단점

#### 장점
- input 태그에 유저가 값을 입력해도 지역 변수인 `inputValue`에 저장을 하고 상태 변경 함수를 통해서 값을 저장하지 않기 때문에 컴포넌트 함수가 다시 실행되지 않는다.

#### 단점
- 모든 상태 변수가 변경되는 코드에 지역 변수인 `inputValue`를 다음 컴포넌트 함수가 실행될 때의 `inputValue`의 초기값으로 세팅하기 위해 코드를 추가해 주어야 한다. 
- 코드를 보면 모든 상태 변경 코드에 `setInputValueState(inputValue)`를 추가하였다.
- 이런 식으로 모든 상태 변경 코드에 추가하는 방식은 간단한 코드에서는 사용할 수 있겠지만 리액트의 상태 변경이 많아지고 복잡해 지면 점점 더 관리하기 어려운 로직이 되어 버린다.

## 컴포넌트 함수 내 지역 변수는 안티패턴
- 리액트에서 컴포넌트 함수 내부에 지역 변수를 사용하는 것은 `useRef` 함수를 통해서 대체할 수 있다.
- 지역 변수를 사용하게 되면 지역 변수에 저장된 값을 날리지 않기 위해 모든 상태 변경이 일어날 때 이전 지역 변수 값을 다음 컴포넌트 함수가 실행될 때 전달하여 지역 변수의 값을 보존하는 방법을 사용해야 하는데 이는 코드를 작성하고 관리하기 어렵게 만든다는 단점이 있다.
- `useRef`를 사용하면 모든 상태 변경 로직에 따로 코드를 추가할 필요가 없기 때문에 훨씬 깔끔한 코드를 만든다.
- 따라서 컴포넌트 함수 내에서 지역 변수를 사용하지 않는 것이 좋은 방식의 스타일이며, 코드를 불필요하게 복잡하게 만들고 관리하기 어렵게 만드므로 안티패턴에 해당한다. 그러므로 지역 변수를 사용하지 않도록 하자.

## 지역변수 전체 코드
```js
import { useState } from 'react';
import componentList from './componentList';
import NotFoundComponent from './NotFoundComponent';

const style = {
  numberDisplay : {
    marginLeft: '10px'
  },
  prevNextBtn : {
    marginLeft: '10px'
  },
  inputTitle : {
    marginLeft: '10px'
  },
  input : {
    width: '80px',
    marginRight: '20px',
    marginLeft: '10px'
  },
  componentLoadArea : {
    border: '1px solid black'
  }
};

const getLastestKeyFromOrderedKeyObject = (literalObject) => {
  return Object.keys(literalObject).pop();
}

const lastComponentNumber = getLastestKeyFromOrderedKeyObject(componentList);

function App() {
  const [componentNumber, setComponentNumber] = useState(lastComponentNumber);
  const [inputValueState, setInputValueState] = useState(0);
  let inputValue = inputValueState;
  console.log(inputValue);

  const prev = () => {
    if(1 < componentNumber) {
      setComponentNumber(componentNumber-1);
      setInputValueState(inputValue);
    }
  }

  const next = () => {
    if(componentNumber < lastComponentNumber) {
      setComponentNumber(componentNumber+1);
      setInputValueState(inputValue);
    }
  }

  const move = () => {
    if(0 < inputValue && inputValue <= lastComponentNumber) {
      setComponentNumber(inputValue);
      setInputValueState(inputValue);
    } else {
      alert('컴포넌트 번호가 정의된 범위 밖입니다.');
    }
  }

  const changeInputValue = (e) => {
    inputValue = parseInt(e.target.value);
  }

  return (
    <div>
      <h3 style={style.numberDisplay}>current component number : {componentNumber}</h3>
      <div style={style.prevNextBtn}>
        <button onClick={prev}>prev</button>
        <button onClick={next}>next</button>
      </div>
      <br/><br/>
      <div style={style.inputTitle}>
        <div>input component number</div>
        <input type='number' style={style.input} onChange={changeInputValue}></input>
        <button type='button' onClick={move}>move</button>
      </div>
      <br/><br/><br/>
      <div style={style.componentLoadArea}>
        {componentList[componentNumber] ?? NotFoundComponent()}
      </div>
    </div>
  );
}

export default App;
```