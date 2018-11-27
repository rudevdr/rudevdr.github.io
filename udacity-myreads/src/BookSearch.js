import React, {Component} from "react";
import {Link} from "react-router-dom";

import * as BooksAPI from './BooksAPI'
import BookShelf from "./BookShelf";

class BookSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			currentBooks: []
		}
		this.getSearchResultName = this.getSearchResultName.bind(this);
		this.updateBookShelf = this.updateBookShelf.bind(this);

	}

	getSearchResultName(){
		if (this.state.books.length){
			return "Found "+this.state.books.length+" Results"
		}
		else return ""
	}

	componentWillMount(){
         BooksAPI.getAll().then((books) => {
            this.setState({currentBooks: books});
        });

	}

	updateBookShelf(book, shelf) {
		var currentBooks = this.state.books;
		currentBooks.filter(selectedBook => selectedBook.id === book.id)[0].shelf = shelf;
		BooksAPI.update(book, shelf);
	}


	searchBooks(query){
		if (query) {
			BooksAPI.search(query).then((searchableBooks) => {
				if (searchableBooks.length) {
					searchableBooks.forEach((book, index) => {
                        let matchingBook = this.state.currentBooks.find((currentBook) => currentBook.id === book.id);
						if (matchingBook) {
							book.shelf = matchingBook.shelf
						} else {
							book.shelf = 'none'
						}
						searchableBooks[index] = book;

					});
					this.setState({
						books: searchableBooks,
					});
				}
				else {
					this.setState({

					});
				}
			});
		} else {
			this.setState({
				books: []
			});

		}
	};


    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/"> Close Search</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.searchBooks(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                            <li className="contact-list-item">
								<BookShelf name={this.getSearchResultName()} books={this.state.books} updateBookShelf={this.updateBookShelf}/>
                            </li>
                    </ol>
                </div>
            </div>
        )
    }
}


export default BookSearch;
