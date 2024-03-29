import React, {useState, useMemo} from 'react';

const getAverage = numbers => {
  console.log('calculate average');
  if(numbers.length === 0) return 0;
  const sum = numbers.reduce((a,b) => a + b);
  return sum/numbers.length;
};

const CalculateAverage = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState('');
  const onChange = e => {
    setNumber(e.target.value);
  }
  const onInsert = e => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber('');
  };

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>register</button>
      <ul>
      {list.map((value, index) => {
        <li key={index}>{index}</li>
      })}
      </ul>
      <div>
        <b>average : </b>{getAverage(list)}
      </div>
    </div>
  );
}

export default CalculateAverage;
