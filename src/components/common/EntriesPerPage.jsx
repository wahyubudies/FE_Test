import React from 'react'

const EntriesPerPage = ({entriesPerPage, setEntriesPerPage}) => {
    return (
        <div>
            <label className="text-sm">Show: </label>
            <select
                className="border rounded p-1"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
                <option value="5">5 entries</option>
                <option value="10">10 entries</option>
                <option value="15">15 entries</option>
            </select>
        </div>


    )
}

export default EntriesPerPage