import React from 'react'
import { useParams } from "react-router-dom";

export default function Details() {

    const { id } = useParams();
    return (
        <div>
            display the details about the meeting with meeting id {id}
            <h2>bargraph veno ?</h2>
            <h2>vere vella plot veno</h2>
            <h2>data venam :)</h2>

            <h2>pinne generated summary ivede kanikkam</h2>
            <h2>ver entha pinne kanikkan patuka</h2>
        </div>
    )
}

