import { useEffect, useState } from 'react';
import { NAV_LINKS, BRAND } from '../data/navigation';
import { applyTheme, getEffectiveTheme, getStoredTheme, getSystemTheme, normalizeTheme, setStoredTheme, THEME_STORAGE_KEY } from '../theme';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => getEffectiveTheme());
    const [hasStoredPreference, setHasStoredPreference] = useState(() => Boolean(getStoredTheme()));

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (hasStoredPreference) return;
        const mql = window.matchMedia?.('(prefers-color-scheme: light)');
        if (!mql) return;
        const onChange = () => setTheme(getSystemTheme());
        if (mql.addEventListener) mql.addEventListener('change', onChange);
        else if (mql.addListener) mql.addListener(onChange);
        return () => {
            if (mql.removeEventListener) mql.removeEventListener('change', onChange);
            else if (mql.removeListener) mql.removeListener(onChange);
        };
    }, [hasStoredPreference]);

    useEffect(() => {
        const onStorage = (event) => {
            if (event.key !== THEME_STORAGE_KEY) return;
            const nextStored = normalizeTheme(event.newValue);
            setHasStoredPreference(Boolean(nextStored));
            setTheme(nextStored ?? getSystemTheme());
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const toggleTheme = () => {
        setTheme(nextTheme);
        setHasStoredPreference(true);
        setStoredTheme(nextTheme);
    };

    return (
        <header className="navbar" role="banner">
            <div className="navbar__inner container">
                <a href="/" className="navbar__brand" aria-label={`${BRAND.name} 首頁`}>
                    <span className="navbar__logo" aria-hidden="true">◆</span>
                    <span className="navbar__brand-name">{BRAND.name}</span>
                </a>

                <button
                    className="navbar__toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-controls="nav-menu"
                    aria-label="切換導覽選單"
                >
                    <span className="navbar__toggle-bar" />
                    <span className="navbar__toggle-bar" />
                    <span className="navbar__toggle-bar" />
                </button>

                <nav
                    id="nav-menu"
                    className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}
                    role="navigation"
                    aria-label="主要導覽"
                >
                    <ul className="navbar__list">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href} className="navbar__item">
                                <a href={link.href} className="navbar__link" onClick={() => setMenuOpen(false)}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={nextTheme === 'light' ? '切換為淺色模式' : '切換為深色模式'}
                        title={nextTheme === 'light' ? '淺色模式' : '深色模式'}
                    >
                        {nextTheme === 'light' ? (
                            <svg className="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fill="currentColor"
                                    d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Zm0-14a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm8-9a1 1 0 0 1 1 1a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1ZM6 12a1 1 0 0 1-1 1H4a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm12.364-6.364a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM7.757 16.243a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0Zm10.607 1.414a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414ZM7.757 7.757a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 1 1 7.05 5.636l.707.707a1 1 0 0 1 0 1.414Z"
                                />
                            </svg>
                        ) : (
                            <svg className="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fill="currentColor"
                                    d="M21.752 15.002A8.5 8.5 0 0 1 9 2.248a.75.75 0 0 1 .97.97A7 7 0 1 0 20.78 14.03a.75.75 0 0 1 .97.97Z"
                                />
                            </svg>
                        )}
                    </button>
                    <a href="#demo" className="btn btn--primary btn--sm navbar__cta">
                        預約 Demo
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
