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

    

    console.log(forums)

    return (
        <div>
            <h2>Forum.</h2>
            {forums.map((f) => 
            <Link className="forum-card" to={`/forums/${f.id}`} key={f.id} onClick={() => setCurrentForum(f.id)}>
                <h2 className="forum-title">{f.name}</h2>
            </Link>)}
        </div>
    )
}

export default Forum;