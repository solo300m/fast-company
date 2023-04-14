import React from 'react';

export const Bookmark = (props) => {
    const users = props
    return (
        <>
            <td className='ps-5' onClick={() => users.onBookmarck(users._id)}>{!users.bookmark ? <i class="bi bi-bookmark"></i> : <i class="bi bi-bookmark-fill"></i>}</td>
        </>
    )
}