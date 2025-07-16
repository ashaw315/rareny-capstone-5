import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

function Residencies({ user, setCurrentForum }){
    const {id} = useParams();
    const [forums, setForums] = useState([])

    useEffect(() => {
        // auto-login
        fetch(`/forums/${id}`)
            .then((r) => r.json()
            .then((data) => setForums(data))
            );
    }, []);

    


    return (
        <div>
            <h2>Forum.</h2>
            <Link className="forum-card" to={'/subforums'} key={forums.id} onClick={() => setCurrentForum(forums.id)}>
                <h2 className="forum-title">{forums.name}</h2>
            </Link>
        </div>
    )
}

export default Residencies;