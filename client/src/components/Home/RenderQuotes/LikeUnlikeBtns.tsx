import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UnlikeQuote, likeQuote } from 'state/actions-creators/quotes.actions-creators';
import { useAppDispatch, useAppSelector } from 'state/store.state';

function LikeUnlikeBtns({ item }: any) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAppSelector(state => state.login);

    const handleLikeQuote = (quoteID: string) => {
        dispatch(likeQuote(quoteID))
    }

    const handleUnlikeQuote = (quoteID: string) => {
        dispatch(UnlikeQuote(quoteID))
    }

    const checkLike = (likedBy: any) => {
        return likedBy.includes(user?.user._id)
    }

    const redirectToLoginPage = () => {
        navigate('/entry')
    }
    return (
        <div id='like-unlike-btns' className="col-3 d-flex justify-content-center">
            {isAuthenticated ?
                checkLike(item.likedBy) ?
                    <i onClick={() => handleUnlikeQuote(item._id)} className="fa-solid fa-heart fa-2x" style={{ color: '#ff0000' }}></i>
                    :
                    <i onClick={() => handleLikeQuote(item._id)} className="fa-light fa-heart fa-2x"></i>
                :
                <i onClick={() => redirectToLoginPage()} className="fa-light fa-heart fa-2x"></i>
            }
            {item.likedBy.length > 0 ? <span className="badge"> {item.likedBy.length} </span> : null}
        </div>
    )
}

export default LikeUnlikeBtns