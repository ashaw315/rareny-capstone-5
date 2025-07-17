import React from "react";
import {Link, useNavigate} from 'react-router-dom';

function Profile({ user }){


const user_listings = user?.listings.map((listing) => 
            <Link key={listing.id} className="user-posts-detail" to={`/listings/${listing.id}`}>
            <h5>{listing.listing_summary}</h5>
            <p>{listing.post_date}</p>
            </Link>)

const user_subforums = user?.subforums.map((subforum) => 
            <Link key={subforum.id} className="user-posts-detail" to={`/forums/${subforum.forum_id}`}>
                <h5>{subforum.name}</h5>
                <p>{subforum.post_date}</p>
            </Link>)

const user_forum_posts = user?.forum_posts.map((post) => 
        <Link key={post.id} className="user-posts-detail" to={`/subforums/${post.subforum_id}`}>
            <h5>{post.title_summary}</h5>
            <p>{post.post_date}</p>
        </Link>)

    return (
        <div className="subforums-forum-posts">
            <Link className="forum-card" to={'/profile'}>
                <h2 className="forum-header-title">Profile.</h2>
            </Link>
            <div className='accountpagecontainer'>
                <div className='accountlinkscontainer'>
                    <h4 className='accountheader'>Shared Resources</h4>
                    <div className='accountlinkdiv'>
                        {/* <Link className='accountlink' to='/profile'>Profile</Link> */}
                    </div>
                    <div className='accountlinkdiv'>
                    <h5><strong>YOUR LISTINGS</strong></h5>
                            {user_listings?.length > 0 ? (
                                <ul >
                                    {user_listings}
                                </ul>) : (
                                <ul>
                                <h5><em>No listings posted yet</em></h5>
                                </ul>)}                      
                    </div>
                    <div className='accountlinkdiv'>
                        <h5><strong>YOUR SUBFORUMS</strong></h5>
                        {user_subforums?.length > 0 ? (
                                <ul>
                                    {user_subforums}
                                </ul>) : (
                                <ul>
                                    <h5><em>No listings posted yet</em></h5>
                                </ul>)}   
                    </div>
                    <div className='accountlinkdiv'>
                        <h5><strong>YOUR POSTS</strong></h5>
                        {user_forum_posts?.length > 0 ? (
                                <ul>
                                    {user_forum_posts}
                                </ul>) : (
                                <ul>
                                   <h5><em>No listings posted yet</em></h5>
                                </ul>)}   
                    </div>
                </div>
                <div className="profile-divider"><span className="line"></span></div>
                <div className='accountformcontainer'>
                    <span>
                        <h4 className='accountheader'>Your Profile</h4>
                    </span>
                    <div className='accountinputdiv'>
                            {/* <p className='accountp'>Username</p> */}
                            {user ? <p >{user.username}</p> : null }
                    </div>
                    <div className='accountinputdiv'>
                            {/* <p className='accountp'>Username</p> */}
                            {user ? <a href={user.website} target="_blank" rel="noreferrer">{user.website}</a> : null }
                    </div>
                    <div className='accountinputdiv'>
                            {/* <p className='accountp'>Username</p> */}
                            {user ? <p >{user.discipline}</p> : null }
                    </div>
                    <div className='accountinputdiv'>
                            {/* <p className='accountp'>Username</p> */}
                            {user ? <p >{user.bio}</p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;