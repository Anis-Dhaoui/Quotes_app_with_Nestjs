import React, { useEffect } from 'react';
import './style.Profile.css';
import { useAppDispatch, useAppSelector } from 'state/store.state';
import { fetchQuotes } from 'state/actions-creators/quotes.actions-creators';
import LoadMoreButton from 'components/Home/LoadMoreButton';
import QuoteCard from 'components/Home/RenderQuotes/QuoteCard.RenderQuotes';
import moment from 'moment';
import Loader from 'shared/loader/loader';
import NewQuoteForm from 'components/PostNewQuote/NewQuoteForm.PostNewQuote';

function Profile() {

  const dispatch = useAppDispatch();
  const { loading, quotes, error } = useAppSelector(state => state.quotes);
  const { isAuthenticated, user } = useAppSelector(state => state.login);

  useEffect(() => {
    dispatch(fetchQuotes(0, 3, "", isAuthenticated, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  let renderQuotes = quotes?.quotesData?.map((item: any) => {
    const postedAtDate = moment(item.createdAt).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: 'MMM/DD/YY'
    });

    const postedAtTime = moment(item.createdAt).format('hh:mm');
    return (
      <li>
        <div className="timeline-time">
          <span className="date">{postedAtDate}</span>
          <span className="time">{postedAtTime}</span>
        </div>
        <div className="timeline-icon">
          <span>&nbsp;</span>
        </div>
        <div className="timeline-body">
          <div className="timeline-content">
            <QuoteCard item={item} />
          </div>
        </div>
      </li>
    )
  })

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {/* Profile */}
          <div className="profile">
            <div className="profile-header">
              {/* Profile Header Cover */}
              <div className="profile-header-cover"></div>

              {/* Profile Header Content */}
              <div className="profile-header-content">
                {/* Profile Header Image */}
                <div className="profile-header-img">
                  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Profile" />
                </div>

                {/* Profile Header Info */}
                <div className="profile-header-info">
                  <h4 className="m-t-10 m-b-5">{`${user?.user.firstName} ${user?.user.lastName}`}</h4>
                  <p className="m-b-10">{user?.user.email}</p>
                  <button className="btn btn-sm btn-info mb-2">Edit Profile</button>
                </div>
              </div>

              {/* Profile Header Tabs */}
              <ul className="profile-header-tab nav nav-tabs">
                <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-with-timeline-posts" target="_blank" rel="noopener noreferrer" className="nav-link_">POSTS</a></li>
                <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-about" target="_blank" rel="noopener noreferrer" className="nav-link_">ABOUT</a></li>
                <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/profile-photos" target="_blank" rel="noopener noreferrer" className="nav-link_">PHOTOS</a></li>
                <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/profile-videos" target="_blank" rel="noopener noreferrer" className="nav-link_">VIDEOS</a></li>
                <li className="nav-item"><a href="https://www.bootdey.com/snippets/view/bs4-profile-friend-list" target="_blank" rel="noopener noreferrer" className="nav-link_ active show">FRIENDS</a></li>
              </ul>
            </div>
          </div>

          {/* Profile Content */}
          <div className="profile-content">
            <div className="tab-content p-0">
              <div className="tab-pane fade active show" id="profile-post">
                {/* Timeline */}
                <ul className="timeline">
                  <li>
                    <div className="timeline-body">
                      <div className="timeline-content">
                        <NewQuoteForm />
                      </div>
                    </div>

                  </li>
                  {
                    loading ? <Loader /> : null
                  }
                  {
                    error ? <div className="alert alert-danger my-5 mx-5" role="alert"> {error} </div> : null
                  }
                  {
                    renderQuotes
                  }
                  {/* Repeat the above structure for other timeline items */}
                </ul>
              </div>
              <LoadMoreButton index={3} myquotes={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;


{/* <div className="timeline-likes">
                          <div className="stats-right">
                            <span className="stats-text">259 Shares</span>
                            <span className="stats-text">21 Comments</span>
                          </div>
                          <div className="stats">
                            <span className="fa-stack fa-fw stats-icon">
                              <i className="fa fa-circle fa-stack-2x text-danger"></i>
                              <i className="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i>
                            </span>
                            <span className="fa-stack fa-fw stats-icon">
                              <i className="fa fa-circle fa-stack-2x text-primary"></i>
                              <i className="fa fa-thumbs-up fa-stack-1x fa-inverse"></i>
                            </span>
                            <span className="stats-total">4.3k</span>
                          </div>
                        </div> */}
{/* <div className="timeline-footer">
                          <a href="#" className="m-r-15 text-inverse-lighter"><i className="fa fa-thumbs-up fa-fw fa-lg m-r-3"></i> Like</a>
                          <a href="#" className="m-r-15 text-inverse-lighter"><i className="fa fa-comments fa-fw fa-lg m-r-3"></i> Comment</a>
                          <a href="#" className="m-r-15 text-inverse-lighter"><i className="fa fa-share fa-fw fa-lg m-r-3"></i> Share</a>
                        </div> */}
{/* <div className="timeline-comment-box">
                          <div className="user"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="User" /></div>
                          <div className="input">
                            <form>
                              <div className="input-group">
                                <input type="text" className="form-control rounded-corner" placeholder="Write a comment..." />
                                <span className="input-group-btn p-l-10">
                                  <button className="btn btn-primary f-s-12 rounded-corner" type="button">Comment</button>
                                </span>
                              </div>
                            </form>
                          </div>
                        </div> */}