import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetInfo, fetchGetList } from './redux/slices/ListSlice';
import MainPage from './components/MainPage/MainPage';
import HeaderComponent from './components/Header/HeaderComponent';

function App() {
  const dispach = useDispatch();
  const { data } = useSelector(state => state.list);
  //console.log(data);


  useEffect(() => {
    dispach(fetchGetList());
  }, []);
  useEffect(() => {
    data.forEach(item => dispach(fetchGetInfo(item)));
  }, [dispach, data])
  return (
    <>
      <HeaderComponent />
      <MainPage />

    </>
  )
}

export default App

//увеличивается массив больше 100 при рефреше
// нужно в мемо добавить так же ререндер если изменяетс время????
//кнопка рефреша тоже становится прозрачной
//цвет тела вижно из под полупрозраного хэдэра
//линии разного размера если делать цвет
//фавиконка
