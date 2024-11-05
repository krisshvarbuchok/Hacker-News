import { useEffect } from 'react';
import HeaderComponent from "../Header/HeaderComponent";
import MainPage from "../MainPage/MainPage";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetInfo, fetchGetList } from '../../redux/slices/ListSlice';


function HomePage() {
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

export default HomePage;

