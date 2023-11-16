import Header from 'ui/common/Header';
import Footer from 'ui/common/Footer';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <Header />
      <Outlet/>
      <Footer />
    </>
  )
}

export default Root;