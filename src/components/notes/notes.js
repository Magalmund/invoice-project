import React from 'react';

const Notes = ({notes}) => {
    return (
        <div>
            <section className="mb-5">
                <p className="lg:w-1/2 text-justify">{notes}</p>
            </section>
        </div>
    );
};

export default Notes;