import React from 'react';
import styles from './Pagination.module.css';
class PaginatedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allImages: this.props.data,
      currentPage: 1,
      imagesPerPage: 10,
      
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {  
    this.setState({
      currentPage: Number(event.target.id),
    
    });
  }

  render() {
    const { allImages, currentPage, imagesPerPage } = this.state;

  
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentTodos = allImages.slice(indexOfFirstImage, indexOfLastImage);

      const renderTodos = currentTodos.map((allImages, index) => {
          return (<div>
              <h4 className={styles.title} key={index}>{allImages.title}</h4>
              <img src={allImages.img} alt={allImages.title} className={styles.imageDisplay}/>
          </div>);
      });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allImages.length / imagesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <a 
          key={number}
          id={number}
          onClick={this.handleClick}
          className={this.state.isActive ? styles.active : ""}
        >
          {number}
        </a>
      );
    });

    return (
      <div>
          {renderTodos}
        <div className={styles.pagination}>
          {renderPageNumbers}
        </div>
      </div>
    );
  }
}

export default PaginatedList;