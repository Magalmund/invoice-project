import React from 'react';

const Client = ({clientName, clientAddress}) => {
    return (
        <div>
            <section className="mt-5">
                <h2 className="text-xl uppercase">{clientName}</h2>
                <p>{clientAddress}</p>
            </section>
        </div>
    );
};

export default Client;