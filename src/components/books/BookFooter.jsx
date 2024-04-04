import { addToCart } from "../../redux/apiCalls/cartApiCall";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";



function BookFooter({book,books}) {
    const dispatch = useDispatch()

    const AddToCart = (book) => {
        dispatch((addToCart(book)))
      }

  return (
        <div className="text-2xl space-x-2 flex justify-between mt-2 items-center">
             <Link to={`/books/${book._id}`} className="btn btn-sm" >
                <i className="bi bi-eye text-base"></i>
              </Link>
             <div className="flex items-center space-x-2">
                 <button onClick={()=> AddToCart(book)} className="hover:text-red-700 btn btn-sm">
                     <i className="bi bi-cart2 text-base"></i>
                 </button>
             </div>

            </div>
  )
}

export default BookFooter