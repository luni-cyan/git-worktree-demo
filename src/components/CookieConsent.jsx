import { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasConsented = localStorage.getItem('cookieConsentAccepted');
        if (!hasConsented) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsentAccepted', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent">
            <div className="cookie-consent__content">
                <p className="cookie-consent__text">
                    We use cookies to improve your experience and deliver personalized content. By continuing to use this site, you agree to our use of cookies.
                </p>
                <button className="btn btn--primary btn--sm cookie-consent__btn" onClick={handleAccept}>
                    Accept
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
