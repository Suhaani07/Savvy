import './App.css';
import Navbar from "./layout/Navbar/Navbar"
import Footer from "./layout/Footer/Footer"
import Home from "./layout/Home/Home"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import ProductDetails from './layout/ProductDetails/ProductDetails';
import Login from './layout/Login/Login';
import Products from './layout/Products/Products';
import Register from './layout/Register/Register';
import Category from './layout/Categories/Category';
import CreateProduct from './layout/AdminProducts/CreateProduct';
import TestCarousel from './layout/Carousel/TestCarousel';
import UserProfile from './layout/UserProfile/UserProfile';
import logout from './layout/logout';
import Update from './layout/Update Profile/Update';
import DeleteProduct from './layout/AdminProducts/DeleteProduct';
import Panel from './layout/AdminProducts/Panel';
import Search from './layout/Search';
import Cart from './layout/Cart/Cart';

function App() {
  const loggedin =window.localStorage.getItem("loggedin");
  const role =window.localStorage.getItem("status");
  return (
    <div >
      <Navbar/>
      {role==="admin"? <Panel/>:null}
      <BrowserRouter>
      <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/category/:name" component={Category} />
                <Route exact path="/search/:name" component={Search} />
                <Route exact path="/products/:_id" component={ProductDetails} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/login" component={loggedin?UserProfile:Login} />
                <Route exact path="/login/update" component={loggedin?Update:Login} />
                <Route exact path="/logout" component={logout} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/admin/create" component={role==="admin"?CreateProduct:Login} />
                <Route exact path="/admin/delete" component={role==="admin"?DeleteProduct:Login} />
            </Switch>
            </BrowserRouter>
      <TestCarousel/>
      <Footer/>
    </div>
  );
}

export default App;
