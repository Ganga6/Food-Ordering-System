import React from "react";
import Filter from "./Component/Filter";
import Foods   from "./Component/Foods";
import Cart from "./Component/Cart";
import store from "./store";
import { Provider } from "react-redux";
class App extends React.Component {      
render() {
    return (
      <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">Resturant lalala!!</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter></Filter>
              <Foods></Foods>
              
            </div>
            <div className="sidebar">
              <Cart/>
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
      </Provider>
    );
  }
}

export default App;