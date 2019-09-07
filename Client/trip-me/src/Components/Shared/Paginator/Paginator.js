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
    debugger;
    this.props.OnSelect(this.state.currItem - 1);
    this.setState({ currItem: this.state.currItem - 1 });
  };

  handleLastClick = () => {
    this.props.OnSelect(this.props.numOfItems - 1);
    this.setState({ currItem: this.props.numOfItems - 1 });
  };

  handleNextClick = () => {
    this.props.OnSelect(this.state.currItem + 1);
    this.setState({ currItem: this.state.currItem + 1 });
  };

  render() {
    return (
      <Pagination className="pagination">
          {this.state.currItem == 0 ? (
          <PaginationItem disabled>
            <PaginationLink  first/>
          </PaginationItem>
          ) : (
            <PaginationItem>
             <PaginationLink first onClick={this.handleFirstClick} />
            </PaginationItem>
          )}
          {this.state.currItem == 0 ? (
            <PaginationItem disabled>
              <PaginationLink previous disabled />
            </PaginationItem>
          ) : (
            <PaginationItem>
            <PaginationLink previous onClick={this.handlePreviousClick} />
            </PaginationItem>
          )}
        {this.renderPaginationItems()}
          {this.state.currItem == (this.props.numOfItems - 1) ? (
            <PaginationItem disabled>
            <PaginationLink next />
            </PaginationItem>
          ) : (
            <PaginationItem>
            <PaginationLink next onClick={this.handleNextClick} />
            </PaginationItem>
          )}
          {this.state.currItem == (this.props.numOfItems -1) ? (
            <PaginationItem disabled>
              <PaginationLink last />
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationLink last onClick={this.handleLastClick} />
            </PaginationItem>
          )}
      </Pagination>
    );
  }
}
