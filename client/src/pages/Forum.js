import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Forum({ user, setCurrentForum }){
    const [forums, setForums] = useState([])

    useEffect(() => {
        // auto-login
        fetch("/forums")
            .then((r) => r.json()
            .then((data) => setForums(data))
            );
    }, []);

    

    // console.log(forums)

    return (
        <div className="subforums-forum-posts">
            <Link className="forum-card" to={'/forums'}>
                <h2 className="forum-header-title">Forum.</h2>
            </Link>
            {forums.map((f) =>
            <div className="forums-list"> 
                <Link className="forum-card" to={`/forums/${f.id}`} key={f.id} onClick={() => setCurrentForum(f)}>
                    <h2 className="forum-title">{f.name}</h2>
                    {f.subforums_length > 0 ? <h2 className="forum-title-length">► {f.subforums_length} {f.subforums_length > 1 ? "subforums" : "subforum"}</h2> : null}
                    {/* <h2 className="forum-title-length">{f.subforums_length > 0 ? <h2>{f.subforums_length}</h2> : "subtopic"}</h2>  */}
                </Link>
            </div>)}
            <div className="footer-position">
            <div className='homepagefooter-subforum'>
                            <h3 className='footerheader'>About</h3>
                            <h3  className='footerheader1'>Contact</h3>
                        </div>
                            <ul className='footerul'>
                                <div className='footerp'>Rare NY is a conceptual project by adamshaw.</div>
                                <div className='footerp1'>Resources for Artists Everywhere looks to offer artists a space to communicate and share resources.</div>
                                <a className='footerp2' href="mailto:info.rareny@gmail.com">Email Us</a>  
                            </ul>
            </div>
        </div>
    )
}

export default Forum;