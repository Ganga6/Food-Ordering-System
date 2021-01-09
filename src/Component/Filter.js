import React, { Component } from 'react'
import { connect } from "react-redux";
import { filterFoods, sortFoods } from "../actions/foodActions";

class Filter extends Component {
    render(){
      return !this.props.filteredfoods ? (
      <div>Loading...</div>
    ) : (
         <div className="filter">
            <div className="filter-result">{this.props.filteredfoods.length} Foods </div>
            <div className="filter-sort">
              Order{" "}
              <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortFoods(
                this.props.filteredfoods,
                e.target.value)}>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </div>
                <div className="filter-type">
                    Filter{" "}
                    <select
            value={this.props.type}
            onChange={(e) =>
              this.props.filterFoods(this.props.foods, e.target.value)}>
                    <option value="">All</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Non-veg">Non-veg</option>
                </select>
                </div>
                
            </div>
        )
      }
    }
export default connect(
  (state) => ({
    type: state.foods.type,
    sort: state.foods.sort,
    foods: state.foods.items,
    filteredfoods: state.foods.filteredItems,
  }),
  {
    filterFoods,
    sortFoods,
  }
)(Filter);