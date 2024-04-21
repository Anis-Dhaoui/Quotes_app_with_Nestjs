import React, { useState } from 'react'

function LikeBadgeList(props: any) {
    const [showLikesList, setShowLikesList] = useState(false)
    console.log(props.item.likedBy)
    return (
        <>
            <span style={{ cursor: "help" }}
                className="badge"
                onClick={props.isAuthenticated ? () => setShowLikesList(!showLikesList) : () => props.redirectToLoginPage()}>
                {props.item?.likedBy.length}
            </span>
            {
                props.isAuthenticated ?
                    <div className="list-wrapper" style={!showLikesList ? { display: "none" } : { display: "block" }}>
                        <ul className="list">
                            {
                                props.item.likedBy.map((item: any) => {
                                    <li className="list-item">
                                        <div>
                                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                                        </div>
                                        <div className="list-item-content">
                                            <h4>Hitesh Kumar</h4>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    :
                    null

            }
        </>
    )
}

export default LikeBadgeList