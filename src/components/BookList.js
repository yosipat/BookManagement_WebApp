import { BrowserRouter, Route, Routes, Link, useParams, useNavigate, Outlet, Navigate } from 'react-router-dom'
import "./BookList.css"
import { useContext, useEffect, useState } from 'react';
import CardBook from './CardBook';
import { ModeContext } from './ModeContextProvider';
import banner from "./banner.jpg"

const BookList = () => {

    const [books, setBooks] = useState([]);
    const [filterBook, setFilterBook] = useState([]);
    const [filterKeyword, setFilterKeyword] = useState("");
    const [sort, setSort] = useState("titleAZ");

    var user = window.localStorage.getItem("username")


    const { mode } = useContext(ModeContext)
    const navigate = useNavigate();

    async function fetchBooks() {
        const response = await fetch("http://localhost:8000/books");
        const data = await response.json(); //convert json to object
        console.log("fetchProducts");
        setBooks(data);
        setFilterBook(data);
    }

    useEffect(() => {
        fetchBooks();
    }, [])

    function btnFilter() {
        var data = [...books];
        var keyword = filterKeyword.toLowerCase();

        data = data.filter((a) => a.title.toLowerCase().includes(keyword) || a.author.toLowerCase().includes(keyword) || a.publicationDate.toLowerCase().includes(keyword));

        switch (sort) {
            case "titleAZ":
                data.sort((a, b) => (a.title > b.title ? 1 : -1));
                break;
            case "titleZA":
                data.sort((a, b) => (a.title < b.title ? 1 : -1));
                break;
            case "authorAZ":
                data.sort((a, b) => (a.author > b.author ? 1 : -1));
                break;
            case "authorZA":
                data.sort((a, b) => (a.author < b.author ? 1 : -1));
                break;
            case "dateON":
                data.sort((a, b) => (a.publicationDate > b.publicationDate ? 1 : -1));
                break;
            case "dateNO":
                data.sort((a, b) => (a.publicationDate < b.publicationDate ? 1 : -1));
                break;
            default:
                data = data;
                break;
        }
        setFilterBook(data);
    }

    function btnAddNew() {
        navigate('/books/add')
    }

    return (
        <div>
            <div className='banner'><img src={banner} /></div>
            <div className="page">
                <div className="filter">
                    <h2>Filter Option</h2>
                    <h4>Search</h4>
                    <div className="search"><input type='text' placeholder='Title, Author, Date' onChange={e => setFilterKeyword(e.target.value)} /></div>
                    <h4>Sort by</h4>
                    <div>
                        <select onChange={e => setSort(e.target.value)}>
                            <option value="titleAZ">Title A-Z</option>
                            <option value="titleZA">Title Z-A</option>
                            <option value="authorAZ">Author A-Z</option>
                            <option value="authorZA">Author Z-A</option>
                            <option value="dateON">Publish Date Old-New</option>
                            <option value="dateNO">Publish Date New-Old</option>
                        </select>
                    </div><br />
                    <button onClick={btnFilter}>Filter</button>
                </div>
                <div className='display'>
                    
                    <div className="topbar">
                        <h2>Books</h2>
                        <div className={mode}><button onClick={btnAddNew}>Add New Book</button></div>
                    </div>

                    <div className="list">

                        {filterBook.map((b) => (
                            <div key={b.id}>
                                <CardBook id={b.id} title={b.title} image={b.coverImage} author={b.author} date={b.publicationDate} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>)

}

export default BookList