import React from 'react';

const Taxbuddy = () => {
    return (
        <div>
            <div style={{ width: "100%", height: "100vh", border: "none" }}>
                <iframe
                    src="http://localhost:5177"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            </div>
        </div>
    );
};

export default Taxbuddy;
