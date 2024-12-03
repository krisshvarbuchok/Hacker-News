import { useEffect, useMemo } from 'react';
import HeaderComponent from "../../components/Header";
import MainPage from "../MainPage";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetInfo, fetchGetList } from '../../redux/slices/ListSlice';
import FooterComponent from '../../components/Footer';



function HomePage() {
  const dispach = useDispatch();
  const { data, error } = useSelector(state => state.list);

  const cachedComponent = useMemo(() => {
    return <MainPage />;
  }, [data]);

  useEffect(() => {
    dispach(fetchGetList());
  }, []);
  useEffect(() => {
    data.forEach(item => dispach(fetchGetInfo(item)));
  }, [dispach, data])
  if (error !== null) {
    return <div className='error'>
      <p>...ooops</p>
      <img src='/error.svg' alt='error' width={50} />
    </div>
  }
  return (
    <>
      <HeaderComponent />
      {cachedComponent}
      <FooterComponent />
    </>
  )
}

export default HomePage;

