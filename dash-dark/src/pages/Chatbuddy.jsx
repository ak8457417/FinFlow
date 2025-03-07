import React from 'react';
import App from '../../../bot/src/components/FinancialAdvisor.jsx'

const Chatbuddy = () => {
    return (
        <div className={'!p-[24px]'}>
            <div style={{ width: "100%", height: "100vh", border: "none" }}>
                <iframe
                    src="http://localhost:5175"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                />
            </div>
        </div>
    );
};

export default Chatbuddy;
