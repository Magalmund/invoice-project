import React from 'react';

const Dates = ({invoiceNumber, invoiceDate, dueDate}) => {
    return (
        <div>
            <article className="mt-10 mb-20 flex flex-col items-end justify-end">
                <ul>
                    <li className="py-1"><span className="font-bold">Invoice number:</span>{invoiceNumber}</li>
                    <li className="py-1 bg-gray-100"><span className="font-bold">Invoice date:</span>{invoiceDate}</li>
                    <li className="py-1"><span className="font-bold">Due date:</span>{dueDate}</li>
                </ul>
            </article>
        </div>
    );
};

export default Dates;