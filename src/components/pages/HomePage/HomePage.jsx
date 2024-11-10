import { useEffect, useMemo } from 'react';
import HeaderComponent from "../../Header/HeaderComponent";
import MainPage from "../MainPage/MainPage";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetInfo, fetchGetList } from '../../../redux/slices/ListSlice';
import FooterComponent from '../../Footer/FooterComponent';



function HomePage() {
  const dispach = useDispatch();
  const { data } = useSelector(state => state.list);
 
const cachedComponent = useMemo(() => {
  
  return <MainPage />;
  }, [data]);

  useEffect(() => {
    dispach(fetchGetList());
  }, []);
  useEffect(() => {
    data.forEach(item => dispach(fetchGetInfo(item)));
  }, [dispach, data])
  return (
    <>
      <HeaderComponent />
      {cachedComponent}
      <FooterComponent />
    </>
  )
}

export default HomePage;

