import React from 'react';

const Analytics = () => {
    return (
        <div>
            <div style={{ width: "100%", height: "100vh", border: "none" }}>
                <iframe
                    src="http://localhost:5178"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            </div>
        </div>
    );
};

export default Analytics;
