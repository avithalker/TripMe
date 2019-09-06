import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default class Paginator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currItem: 0
    };
  }

  renderPaginationItems = () => {
    var paginationItems = [];
    for (var i = 1; i <= this.props.numOfItems; i++) {
      paginationItems.push(
        <PaginationItem>
          <PaginationLink onClick={this.handleClick} id={i}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return paginationItems;
  };

  handleClick = event => {
    event.preventDefault();
    this.props.OnSelect(event.target.id - 1);
    this.setState({
      currItem: Number(event.target.id -1)
    });
  };
  handleFirstClick = () => {
    this.props.OnSelect(0);
    this.setState({ currItem: 0 });
  };

  handlePreviousClick = () => {
    this.props.OnSelect(this.props.currItem - 1);
    this.setState({ currItem: this.state.currItem - 1 });
  };

  handleLastClick = () => {
    this.props.OnSelect(this.state.numOfItems - 1);
    this.setState({ currItem: this.props.numOfItems - 1 });
  };

  handleNextClick = () => {
    this.props.OnSelect(this.state.currItem + 1);
    this.setState({ currItem: this.state.currItem + 1 });
  };

  render() {
    return (
      <Pagination className="pagination">
        <PaginationItem>
          {this.state.currItem == 0 ? (
            <PaginationLink first disabled />
          ) : (
            <PaginationLink first onClick={this.handleFirstClick} />
          )}
        </PaginationItem>
        <PaginationItem>
          {this.state.currItem == 0 ? (
            <PaginationLink previous disabled />
          ) : (
            <PaginationLink previous onClick={this.handlePreviousClick} />
          )}
        </PaginationItem>
        {this.renderPaginationItems()}
        <PaginationItem>
          {this.state.currItem == (this.props.numOfItems - 1) ? (
            <PaginationLink next disabled />
          ) : (
            <PaginationLink next onClick={this.handleNextClick} />
          )}
        </PaginationItem>
        <PaginationItem>
          {this.state.currItem == (this.props.numOfItems -1) ? (
            <PaginationLink last disabled />
          ) : (
            <PaginationLink last onClick={this.handleLastClick} />
          )}
        </PaginationItem>
      </Pagination>
    );
  }
}
