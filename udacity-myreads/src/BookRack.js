import React, {Component} from 'react'
import './App.css'
import {Link} from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

class BookRack extends Component {
	constructor(props){
		super(props);
		this.state = {
			books : []
		};
		this.updateBookShelf = this.updateBookShelf.bind(this);
	}


	getBooksByShelf(shelf) {
		return this.state.books.filter(book => book.shelf === shelf);
	}

	updateBookShelf(book, shelf) {
		BooksAPI.update(book, shelf).then((response) => {
			this.fetchAllBooks();
		});
	}

	fetchAllBooks(){
        BooksAPI.getAll().then((books) => {
            this.setState({books: books});
        });

	}

    componentWillMount() {
		this.fetchAllBooks();
    }


	render(){
		return (
				<div className="app">
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								<BookShelf name="Currently Reading" books={this.getBooksByShelf('currentlyReading')} updateBookShelf={this.updateBookShelf} />
								<BookShelf name="Want To Read" books={this.getBooksByShelf('wantToRead')} updateBookShelf={this.updateBookShelf} />
								<BookShelf name="Read" books={this.getBooksByShelf('read')} updateBookShelf={this.updateBookShelf}/>
							</div>
						</div>
						<div className="open-search">
							<div className="open-search">
								<Link to="/search">
									<button >Add a book</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
		)
	}
}

export default BookRack
