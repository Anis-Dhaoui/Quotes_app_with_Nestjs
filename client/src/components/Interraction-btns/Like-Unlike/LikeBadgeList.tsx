import React from 'react'

function LikeBadgeList(props: any) {
    console.log(props.item)
    return (
        <>
            <span className="badge"> {props.item?.likedBy.length} </span>

            <div className=""></div>
        </>
    )
}

export default LikeBadgeList