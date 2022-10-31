import React from 'react';

const Client = ({clientName, clientEmail}) => {
    return (
        <div>
            <section className="mt-5">
                <h2 className="text-2xl uppercase font-bold mb-1">{clientName}</h2>
                <p>{clientEmail}</p>
            </section>
        </div>
    );
};

export default Client;