import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { store } from "../redux/configureStore";
import SignInPage from "./authorization/SignInPage";
import SignUpPage from "./authorization/SignUpPage";
import Products from "./vendor/product/Products";
import Header from "./header/header";
import Two from "./TwoHeader/Two";
import ProductGuest from './Products/Index'
import ProductsByCategory from './Products/ProductsByCategory'
import OrdersModal from './header/OrdersModal'
import Main from "./main/main";
import Foods from './Food';
import "./App.css"
import VendorHeader from "./header/VendorHeader";
import CourierHeader from "./header/CourierHeader";
import ClientHeader from "./header/ClientHeader";


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={"/orders"}>
            <Header />
            <OrdersModal/>
          </Route>

          <Route exact path="/">
            <Main />
            <Header />
            <Two />
            <Main />
          </Route>
          <Route path="/signIn">
            <SignInPage />
          </Route>
          <Route path="/signUp">
            <SignUpPage />
          </Route>
          <Route path="/product/category">
            <ProductGuest />
          </Route>
          <Route path="/product/category/:id">
            <ProductsByCategory />
          </Route>
          <Route path="/vendor">
            <Header />
            <Products />
          </Route>
          <Route path="/">
            <Header />
            <Two />
            <Main />
          </Route>
          <Route path="/food">
            <Header />
            <Foods/>
          </Route>
          {/*<Route path="/food">*/}
          {/*  <Header/>*/}
          {/*  <Foods/>*/}
          {/*</Route>*/}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
