import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Forum(){
    const [forums, setForums] = useState([])

    useEffect(() => {
        // auto-login
        fetch("/forums")
            .then((r) => r.json())
            .then((data) => setForums(data))
            .catch((error) => console.error('Failed to fetch forums:', error));
    }, []);

    return (
        <div className="subforums-forum-posts">
            <Link className="forum-card" to={'/forums'}>
                <h2 className="forum-header-title">Forum.</h2>
            </Link>
            {forums.map((f) =>
            <div key={f.id} className="forums-list"> 
                <Link className="forum-card" to={`/forums/${f.id}`}>
                    <h2 className="forum-title">{f.name}</h2>
                    {f.subforums_length > 0 ? <h2 className="forum-title-length">► {f.subforums_length} {f.subforums_length > 1 ? "subforums" : "subforum"}</h2> : null}
                </Link>
            </div>)}
        </div>
    )
}

export default Forum;