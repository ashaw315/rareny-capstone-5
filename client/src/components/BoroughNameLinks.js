import React from "react";
import { Link } from 'react-router-dom';

function BoroughNameLinks({ borough, setCurrentBorough }) {



    return (
        <div>
            <Link className="borough-button-links" to={`/resources/${borough.id}`} onClick={() => setCurrentBorough(borough)}>
                <h3 className="name-button-links" key={borough.id}>{borough.name}</h3>
            </Link>
        </div>
    )
}

export default BoroughNameLinks;