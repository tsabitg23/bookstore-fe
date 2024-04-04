import React from 'react'
import BookEmpty from '../com-small/BookEmpty';
import Loading from '../com-small/Loading';
import Book from './Book';
import InfiniteScroll from 'react-infinite-scroll-component';

function BooksAndPagi({books, fetch, refresh, count}) {
    const [search, setSearch] = React.useState('');
    return (
        <>
            <div
                className='mt-10 container mx-auto'>
                <h2 className='text-xl md:text-2xl text-center md:col-span-full mb-8'>
                    <span className='border-b-2'>Books</span>
                </h2>
                <div className='flex justify-center mb-6'>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                            className='border border-gray-300 p-2 rounded-md w-3/4 md:w-1/2' placeholder='Search...'/>
                    <button className='btn btn-primary ml-2'>Search</button>
                </div>
                {books ? <InfiniteScroll
                    dataLength={books.length} //This is important field to render the next data
                    next={fetch}
                    hasMore={books.length < count}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center', marginTop: 10}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={refresh}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
                    }
                >
                    <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}>
                    {books.length > 0 ? books.map(e => {
                        return <Book key={e._id} book={e}/>
                    }) : <BookEmpty/>}
                    </div>
                </InfiniteScroll> : <Loading/>}
            </div>
        </>
    )
}

export default BooksAndPagi