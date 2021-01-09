import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from 'react-reveal/Fade';
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchfoods } from "../actions/foodActions";
import { addToCart } from "../actions/cartActions";


class Foods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: null,
    };
  }
  componentDidMount() {
    this.props.fetchfoods();
  }
  openModal = (food) => {
    this.setState({food});
  };
  closeModal = () => {
    this.setState({ food: null });
  };
  render() {
    const { food } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.foods ? (
            <div>Loading...</div>
          ) : (
            <ul className="foods">
              {this.props.foods.map((food) => (
                <li key={food._id}>
                  <div className="food">
                    <a href={"#" + food._id}onClick={() => this.openModal(food)}>
                      <img src={food.image} alt={food.name}></img>
                      <p>{food.name}</p>
                </a>
                <div className="food-price">
                  <div>{formatCurrency(food.price)}</div>
                  <button onClick={() => this.props.addToCart(food)}
                    className="button primary">Add To Cart</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
          )}
        </Fade>
        {food && (
         <Modal isOpen={true}onRequestClose={this.closeModal}>
           <Zoom>
           <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="food-details">
              <img src={food.image} alt={food.name}></img>
                <div className="food-details-description">
                  <p>
                    <strong>{food.name}</strong>
                  </p>
                  <p>{food.description}</p>
                  <p>{food.availabletypes}</p>
                  <div className="food-price">
                    <div>{formatCurrency(food.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(food);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
          ) }
      </div>
    );
  }
}
export default connect((state) => ({ foods: state.foods.filteredItems }), {
  fetchfoods,
  addToCart,
})(Foods);
