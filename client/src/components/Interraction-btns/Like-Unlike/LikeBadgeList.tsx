import React from 'react'

function LikeBadgeList(props: any) {
    console.log(props.item)
    return (
        <>
            <span className="badge"> {props.item?.likedBy.length}
                <div className="list-wrapper">
                    <ul className="list">
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumarxxxxxxxxx</h4>
                            </div>
                        </li>
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumar</h4>
                            </div>
                        </li>
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumar</h4>
                            </div>
                        </li>
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumar</h4>
                            </div>
                        </li>
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumar</h4>
                            </div>
                        </li>
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumar</h4>
                            </div>
                        </li>
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumar</h4>
                            </div>
                        </li>
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumar</h4>
                            </div>
                        </li>
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumar</h4>
                            </div>
                        </li>
                        <li className="list-item">
                            <div>
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/488320/profile/profile-80.jpg" className="list-item-image" />
                            </div>
                            <div className="list-item-content">
                                <h4>Hitesh Kumar</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </span>



        </>
    )
}

export default LikeBadgeList