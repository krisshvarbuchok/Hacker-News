import { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetInfo, fetchGetList, fetchGetListRefresh } from './redux/slices/ListSlice';
import MainPage from './MainPage/MainPage';

function App() {
  const dispach = useDispatch();
  const {data} = useSelector(state => state.list);
  //console.log(data);
  
  const handleRefresh = () =>{
    console.log('click');
    dispach(fetchGetListRefresh());
    
  }

  useEffect(()=>{
    dispach(fetchGetList());
  }, []);
  useEffect(() =>{
    data.forEach(item => dispach(fetchGetInfo(item)));
  }, [dispach, data])
  return (
    <>
      <button onClick={handleRefresh}>refresh</button>
      <MainPage data={data}/>

    </>
  )
}

export default App

//увеличивается массив больше 100 при рефреше
//нужно в мемо добавить так же ререндер если изменяетс время?