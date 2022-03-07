import React from "react";
import {Link, useNavigate} from 'react-router-dom';

function Profile({ user }){
    return (
        <div className="subforums-forum-posts">
            <Link className="forum-card" to={'/profile'}>
                <h2 className="forum-header-title">Profile.</h2>
            </Link>
            <div className='accountpagecontainer'>
                <div className='accountlinkscontainer'>
                    <h4 className='accountheader'>Shared Resources</h4>
                    <div className='accountlinkdiv'>
                        <Link className='accountlink' to='/profile'>Profile</Link>
                    </div>
                </div>
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
                            {user ? <a href={user.website} target="_blank">{user.website}</a> : null }
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