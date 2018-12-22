import React from 'react'
import {Route} from "react-router-dom";
import BookRack from './BookRack'
import BookSearch from './BookSearch'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
	render() {
		return (
			<div className="app">
				<Route exact path="/" render={() => <BookRack/>} />
				<Route
					path="/search"
					render={() =>
					<BookSearch />
					}/>
			</div>
		)
	}
}

export default BooksApp
