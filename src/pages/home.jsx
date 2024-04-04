import React, {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import customAxios from '../axios';
import {useSelector} from 'react-redux';
import BooksAndPagi from '../components/books/BooksAndPagi';
import toast from "react-hot-toast";


function Home() {
    const {user} = useSelector(state => state.auth)
    const [books, setBooks] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const limit = 8;

    const fetchData = useCallback(async () => {
        const url = 'books';
        await customAxios.get(`/${url}?page=${page}&limit=${limit}`)
            .then((res) => {
                setCount(res.data.count);
                if (page === 1) {
                    setBooks(res.data.books);
                } else {
                    setBooks([...books, ...res.data.books]);
                }
                setPage(page + 1);
            })
            .catch(e => toast.error(e.message));
    }, [page, limit]);

    const refresh = () => {
        setBooks(null);
        setPage(1);
    };

    useEffect(() => {
        (async () => fetchData())()
    }, []);

    return (
        <div className='min-h-[83vh] px-4'>
            <div className='hero py-40'>
                <div className="hero-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="text-xl md:text-5xl font-bold mb-6">Hello <span
                            className='capitalize'>{user ? user.firstName : "Dear!"}</span></h1>
                        {user ? <Link to="/profile">
                            <button className='btn btn-primary btn-sm md:btn-md'>Show Profile</button>
                        </Link> : <Link to="/login">
                            <button className='btn btn-primary'>Login</button>
                        </Link>}
                    </div>
                </div>
            </div>
            <BooksAndPagi books={books} fetch={fetchData} refresh={refresh} count={count}/>
        </div>
    )
}

export default Home
