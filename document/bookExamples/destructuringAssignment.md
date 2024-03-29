## 구조 분해 할당
- 구조 분해 할당은 영문으로 `destructuring assignment`이다.
- `const box = 'rabbit'`과 같이 변수 하나를 선언하고 하나의 값을 할당하는 방식으로 사용한 반면 구조 분해 할당은 여러 변수를 동시에 선언하고 여러 변수의 값을 동시에 할당할 수 있는 문법을 제공한다.
- 변수를 배열 또는 객체와 같은 방식으로 나열하고 배열 또는 객체를 할당할 때 할당된 배열 또는 객체의 내부 값이 변수에 할당되는 것을 의미한다.

### 구조 분해 할당의 예시
```js
const [a, b] = [10, 20];
```
- 위의 코드를 실행하면 `a`라는 변수에는 10이 할당이 되고, `b`라는 변수에는 20이 할당이 된다.
- `[a, b]`는 자바스크립트에서 일반적으로 배열으로 해석되어 a, b를 변수로 보고 변수에 할당된 값을 얻으려고 하지만, 할당 기호 `=`의 왼쪽에 있으면 구조 분해 할당을 하기 위한 문법이 되어 a, b를 내부의 값을 파악하기 위한 읽기 변수로 해석하지 않고 구조 분해 할당을 하기 위한 쓰기 변수로 해석한다.

```js
const { c, d } = { c: 10, d: 20 , e: 30};
```
- 위의 코드를 실행하면 `c`라는 변수에는 10이 할당이 되고, `d`라는 변수에는 20이 할당이 된다. 하지만 `e`란 변수는 선언되지 않았기 때문에 할당되지 않는다.
- `{ c, d }`는 자바스크립트 문법에서 오브젝트로는 사용할 수 없는 형식이다. 오브젝트는 `키: 벨류` 형식의 문법으로 사용되어야 하는데 `{ c, d }`는 `키: 벨류` 방식인 `{ c: 10, d: 20 }`의 형식이 아니다. `키: 벨류` 형식이 아닌 중괄호 안에 변수를 나열한 코드가 `=` 기호 왼쪽에 있을 때는 구조 분해 할당 문법으로 해석이 된다.

### 여러 대상을 할당하기
- 구조분해 할당에서 변수에 `...`을 사용하면 할당되지 않은 나머지 값을 묶어서 할당할 수 있다.
- 여러 대상을 묶어서 할당하는 방법은 대상을 나열한 방식과 같은 방식으로 묶는 방식으로 하는 것이 직관적이다.
- 따라서 구조 분해 할당을 배열로 하면 여러 대상을 묶어 할당이 되는 경우에는 배열로 할당이 되고, 구조 분해 할당을 오브젝트로 하면 여러 대상을 묶어 할당이 되는 경우에는 오브젝트로 할당이 된다.
```js
const [a, b, ...rest] = [10, 20, 30, 40, 50];
```
- 위 코드를 실행하면 `a`는 10, `b`는 20, `rest`는 `[30, 40, 50]`이 할당이 된다.
- `...`을 사용하면 여럿 묶어서 할당이 되는데, 30, 40, 50을 한꺼번에 `rest`에 할당을 해야 한다. 배열이 구조 분해 할당 되었으므로 묶은 값도 배열이 된다. 따라서 `rest`의 값은 `[30, 40, 50]`이 되는 것이다.

```js
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
```
- 위 코드를 실행하면 `a`는 10, `b`는 20, `rest`는 `{c: 30, d: 40}`이 할당된다.
- `...`을 사용하면 여럿 묶어서 할당이 되는데, `c: 30` `d: 40`을 한꺼번에 `rest`에 할당을 해야 한다. 오브젝트가 구조 분해 할당 되었으므로 묶은 값도 오브젝트가 된다. 따라서 `rest`의 값은 `{c: 30, d: 40}`이 되는 것이다.

### 함수 파라메터의 기본적인 특성
- 함수의 파라메터에는 변수를 써야 한다.
```js
((var1, var2 = 200, var3 = 100, var4) => {
  console.log(var1);
  console.log(var2);
  console.log(var3);
  console.log(var4);
  var2 = 20;
  console.log(var2);
})(1, 2);
```
- 함수의 파라메터로 받은 변수는 변경이 가능하다. `var2`의 값을 2로 받아서 20을 재할당 할 수 있는 것을 확인할 수 있다.
- 함수의 인자를 할당 받지 않은 경우에는 `undefined`가 할당이 된다. `var4`에서 확인을 할 수 있다.
- 함수의 인자를 할당 받지 않은 경우에도 `파라메터 = 값`의 방식으로 파라메터를 쓰는 부분에 써 주면 기본 값을 전달 받을 수 있다. `var3` 파라메터에 아무것도 전달되지 않았지만, 파라메터 변수의 기본값이 `= 100`으로 할당이 되었기 때문에 함수 내부에서 100으로 할당되어 있는 것을 확인할 수 있다.
- 함수 파라메터의 기본값이 존재하지만, 인자로 값이 전달된 경우 기본값이 아닌 전달된 값을 우선한다. `var2`에 200을 기본값으로 주었지만 인자로 2의 값이 할당되었기 때문에 기본값 보다 인자로 전달된 값을 우선해서 할당하므로 2가 된다.
- 함수의 파라메터로 쓰인 변수명은 변수를 읽기의 대상으로 보는 게 아닌, 쓰기의 대상이 되는 것으로 본다. 이는 할당 기호 `=`를 기준으로 왼쪽에 위치하는 대상과 비슷한 역할을 하도록 한다.

### 함수의 인자를 구조분해 할당하기
- 기본적으로 함수의 파라메터로 사용되는 문법은 인자의 값으로 전달되는 변수를 나열하거나 변수의 기본값을 설정하는 방식이다.
- 하지만 파라메터에 `[]` 또는 `{}`를 사용한 표현을 사용하면 구조 분해 할당을 통한 변수 할당 문법으로 해석된다.
```js
(([a, b, c, d]) => {
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
})([10, 20, 30, 40, 50]);
```
- 함수의 인자로 배열을 넘겨 주었을 때 배열의 각 원소를 구조 분해 할당을 통해 파라메터로 전달 받을 수 있다.
- 함수에 `[10, 20, 30, 40, 50]` 값을 전달 했으므로 파라메터는 `[a, b, c, d] = [10, 20, 30, 40, 50]`로 할당 받는 것과 동일하다.
- `a`의 값은 10, `b`의 값은 20, `c`의 값은 30, `d`의 값은 40이 되고 50의 값은 버려진다.

```js
(({a, b, c, d}) => {
  console.log(a);
  console.log(b); 
  console.log(c);
  console.log(d);
})({a: 10, b: 20, c: 30, d: 40});
```
- 함수인 인자로 오브젝트를 넘겨 주었을 때 오브젝트의 각 원소를 구조 분해 할당을 통해 파라메터로 전달 받을 수 있다.
- 함수에 `{a: 10, b: 20, c: 30, d: 40}` 값을 전달했으므로 파라메터에는 `{a, b, c, d} = {a: 10, b: 20, c: 30, d: 40}`로 할당 받는 것과 동일하다.
- `a`의 값은 10, `b`의 값은 20, `c`의 값은 30, `d`의 값은 40이 되고 50의 값은 버려진다.

### 구조 분해 할당은 하나의 값을 분해한다.
```js
(([a, b, c, d], e, {f, g}) => {
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
  console.log(e);
  console.log(f);
  console.log(g);
})([10, 20, 30, 40, 50], 100, {f: 1000, g: 2000});
```
- 위 예제를 보면 `[10, 20, 30, 40, 50]`는 배열으로 하나의 값이다. 또한 `{f: 1000, g: 2000}`도 하나의 값이다.
- 구조 분해 할당은 하나의 값에 대해 적용이 되며, 하나의 값 내부에 배치된 여러 값을 구조 분해 할당을 통해서 분해하여 여러 변수에 할당할 수 있다.
- 파라메터를 보면 `[a, b, c, d]`가 하나의 값인 `[10, 20, 30, 40, 50]`를 받으며, `e`가 하나의 값인 `100`을 받으며, `{f, g}`가 하나의 값인 `{f: 1000, g: 2000}`를 받는다.

## 컴포넌트 함수에서 구조분해 할당
src/components/17-destructuringAssignment/ParentComponent.js
```js
import ParameterDestructuringAssignment from './ParameterDestructuringAssignment';
import VariableDestructuringAssignment from './VariableDestructuringAssignment';

const ParentComponent = () => {
  return (
    <div>
      <ParameterDestructuringAssignment>children</ParameterDestructuringAssignment>
      <hr />
      <VariableDestructuringAssignment>children</VariableDestructuringAssignment>
    </div>
  );
};

export default ParentComponent;
```
- `ParameterDestructuringAssignment`와 `VariableDestructuringAssignment` 두 컴포넌트의 `children` prop에 `children`란 문자열을 전달한다.

src/components/17-destructuringAssignment/VariableDestructuringAssignment.js
```js
const VariableDestructuringAssignment = props => {
  const { name, children } = props;
  return (
    <div>
      Hi, my name is '{name}'
      <br />
      props.children is '{children}'
    </div>
  )
}

VariableDestructuringAssignment.defaultProps = {
  name: 'default name'
};

export default VariableDestructuringAssignment;
```
- `defaultProps`에 의해 컴포넌트 함수는 `props`으로 `name` 속성 값을 받으며, 부모 컴포넌트에서 전달된 `children` 속성으로 `children`란 문자열을 받는다.
- 따라서 위 컴포넌트 함수가 `props` 오브젝트를 받을 때 속성으로 `name`과 `children` 두 가지 속성을 받는다.
- 컴포넌트 함수의 첫 번째 파라메터가 `props`에 해당한다. `const { name, children } = props;` 부분을 보면 `props` 오브젝트가 `name`, `children` 속성을 갖고 있기 때문에 구조 분해 할당이 되어 `name` 변수에는 `defaultProps`에서 전달된 값인 `'default name'`가 할당이 되고, `children` 변수에는 부모 컴포넌트에서 전달 받는 `children`란 문자열이 할당이 된다.


src/components/17-destructuringAssignment/ParameterDestructuringAssignment.jsx
```js
const ParameterDestructuringAssignment = ({ name, children }) => {
  return (
    <div>
      Hi, my name is '{name}'
      <br />
      props.children is '{children}'
    </div>
  );
};

ParameterDestructuringAssignment.defaultProps = {
  name: 'default name',
};

export default ParameterDestructuringAssignment;
```
- 앞선 예제는 컴포넌트 함수 내부에서 변수의 구조 분해 할당을 하였다. 이번 예제는 컴포넌트 함수의 파라메터에서 구조분해 할당을 한다.
- 위 컴포넌트의 `props`로 전달되는 값은 `{ name: 'default name', children: 'children'}`값이 전달되고 `props` 파라메터 부분을 구조 분해 할당의 구조로 바꾸면 `props` 대신에 `{ name, children }`로 바꿀 수 있다. 전달되는 `prop`의 속성 값을 속성에 대응되는 이름의 변수로 받게 되어, 구조 분해 할당을 통해 `name` 변수에는 'default name'을 할당이 되고, `children` 변수에는 `children`값이 할당이 된다.
- 이 때 컴포넌트 함수 내에는 구조 분해 할당으로 변수를 파라메터 부분에서 받아 왔기 때문에 `name`, `children` 변수를 선언하지 않아도 컴포넌트 함수 내부에서 이들 변수를 사용할 수 있는 것을 볼 수 있다.
