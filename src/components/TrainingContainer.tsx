//общий компонет для отрисовки компонета с данными и компонента с историей
import { useState } from 'react';
import { nanoid } from 'nanoid';
import {TrainingForm} from './TrainingForm';
import { TrainingBlock } from "./TrainingBlock";

export function TrainingContainer() {
    let [value1, setValue1] = useState(''); //состояние ввода даты
    let [value2, setValue2] = useState(''); //состояние ввода дистанции
    const [result, setResult]: any = useState([]); //состояние ввода нажатия кнопки OK
    
    let handCange1 = ({target}: React.ChangeEvent<HTMLInputElement>) => {   
       setValue1(target.value);              
    }

    let handCange2 = ({target}: React.ChangeEvent<HTMLInputElement>) => {        
        setValue2(target.value);              
     }

    let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {    
        e.preventDefault();
        let add  = {id: nanoid(), date: value1, dist: Number(value2)};

        const findEl = result.find((el: any) => el.date === value1);

        if(findEl) {
            findEl.dist = findEl.dist + Number(value2);
            const newArr = result.filter((el: any) => el.date !== value1)
            setResult([...newArr, findEl])
        } else {  
            setResult([...result, add]);
        }                                                               
    }

    //удаление родительского элемента кнопки крестик
    const handDel = ({target}: any) => {
        const parrentId = target.parentElement.id;
        const record = result.find((el) => el.id === parrentId);

        if(record) {
            const newArr = result.filter((el: any) => el.id !== parrentId)
            setResult([...newArr])
        }
    }
   
    //Сортировка массива объектов по дате
    result.sort((a: any, b: any) => (
        a.date < b.date ? 1 : b.date < a.date ? -1 : 0));
    
   return (
    <div className="trainingContainer">    
        <TrainingForm submit={handleSubmit} input1={handCange1} input2={handCange2} /> 
        <TrainingBlock  res={result} delClick={handDel}/>
    </div>
   )   
}