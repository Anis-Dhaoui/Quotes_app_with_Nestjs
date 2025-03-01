import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UnlikeQuote, likeQuote } from 'state/actions-creators/quotes.actions-creators';
import LikeBadgeList from './LikeBadgeList';
import './style.Like-Unlike.scss'

function LikeUnlikeBtns({ item, user, isAuthenticated, dispatch }: any) {
    const navigate = useNavigate();

    const handleLikeQuote = (quoteID: string) => {
        dispatch(likeQuote(quoteID))
    }

    const handleUnlikeQuote = (quoteID: string) => {
        dispatch(UnlikeQuote(quoteID))
    }

    const checkLike = (likedBy: any) => {
        // console.log(likedBy)
        return likedBy?.includes(user?.user._id)
    }

    const redirectToLoginPage = () => {
        navigate('/entry')
    }

    return (
        <div id='like-unlike-btns' className="col-3 d-flex justify-content-center">
            {
                isAuthenticated ?
                    checkLike(item?.likedBy) ?
                        <i onClick={() => handleUnlikeQuote(item._id)} className="fa-solid fa-heart fa-2x" style={{ color: '#ff0000' }}></i>
                        :
                        <i onClick={() => handleLikeQuote(item._id)} className="fa-light fa-heart fa-2x"></i>
                    :
                    <i onClick={() => redirectToLoginPage()} className="fa-light fa-heart fa-2x"></i>
            }

            {
                item?.likedBy.length > 0 ?
                    <LikeBadgeList
                        item={item}
                        isAuthenticated={isAuthenticated}
                        redirectToLoginPage={redirectToLoginPage}
                    />
                    :
                    null
            }
        </div>
    )
}

export default LikeUnlikeBtns