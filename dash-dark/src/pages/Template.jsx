import React, {useEffect, useState} from 'react';
import tempadvisor from '../assets/temp-advisor.webp'
import {Link} from 'react-router-dom'

const Template = () => {

    const text = "Personalized Financial Advisor";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typingSpeed = 100; // Typing speed (in ms)
        const deletingSpeed = 50; // Deleting speed (in ms)
        const pauseTime = 1000; // Pause before deleting (in ms)

        let timeout;

        if (!isDeleting && index < text.length) {
            // Typing effect
            timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, typingSpeed);
        } else if (isDeleting && index > 0) {
            // Deleting effect
            timeout = setTimeout(() => {
                setDisplayedText((prev) => prev.slice(0, -1));
                setIndex(index - 1);
            }, deletingSpeed);
        } else if (!isDeleting && index === text.length) {
            // Pause before deleting
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && index === 0) {
            // Restart typing
            setIsDeleting(false);
        }

        return () => clearTimeout(timeout);
    }, [index, isDeleting]);

    return (
        <div className={'!p-[54px]'}>
            <div className={'!flex justify-around'}>
                <div>
                    <div className="text-8xl font-bold">
                        {displayedText}
                        <span className="animate-blink">|</span> {/* Blinking Cursor */}
                    </div>
                    {/*<div className="text-8xl font-bold">*/}
                    {/*    Personalized Financial Advisor*/}
                    {/*</div>*/}
                    <div className={'!mt-3 font-medium text-xl'}>Financial Advisors is very much required for each and every individual to enable Financial planning in their lives, but hiring a Personal financial advisor is expensive and not affordable for everyone. A Virtual assistant acting as a Personalised Financial Advisor that gives advices about Investment, Wealth Management and Financial Services is needed.</div>
                </div>
                <div>
                    <img className={'w-550 !mt-10'} src={tempadvisor} alt={'Tempadvisor'}/>
                </div>
            </div>
            <div className="flex justify-center !space-x-4 !p-4">
                <div>
                    <Link
                        to="/login"
                        className="!px-6 !py-3 !bg-green-600 !text-white !font-semibold !rounded-lg !shadow-md !hover:bg-green-700 !transition !duration-300"
                    >
                        Sign In
                    </Link>
                </div>
                <div>
                    <Link
                        to="/signup"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Template;
