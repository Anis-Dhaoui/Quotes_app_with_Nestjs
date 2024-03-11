import React from 'react'
import RenderPopularQuotes from './popularQuotes/RenderPopularQuotes'
import NavbarCmp from './navbar/NavbarCmp'


function HeaderCmp() {
    return (
        <section id="nav-container" contextMenu='return false' className='snippet-body, mt-0'>
            <NavbarCmp />
            <div className="slider-container">
                <h3>Best Quotes</h3>
                <RenderPopularQuotes />
            </div>
        </section>
    )
}

export default HeaderCmp