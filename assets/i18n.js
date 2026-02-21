/**
 * Lightweight i18n library for Root Corporation
 * Supports: data-i18n, data-i18n-placeholder, data-i18n-html, data-i18n-aria
 * RTL support for Arabic and Persian
 */
(function() {
    'use strict';

    const I18n = {
        locale: 'en',
        fallbackLocale: 'en',
        translations: {},
        rtlLocales: ['ar', 'fa'],

        /**
         * Available locales configuration
         */
        locales: {
            en: { name: 'English', nativeName: 'English' },
            zh: { name: 'Chinese', nativeName: '中文' },
            hi: { name: 'Hindi', nativeName: 'हिन्दी' },
            id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
            ms: { name: 'Malay', nativeName: 'Bahasa Melayu' },
            ru: { name: 'Russian', nativeName: 'Русский' },
            tr: { name: 'Turkish', nativeName: 'Türkçe' },
            ar: { name: 'Arabic', nativeName: 'العربية' },
            fa: { name: 'Persian', nativeName: 'فارسی' }
        },

        /**
         * Initialize i18n with locale detection
         */
        init: function() {
            this.locale = this.detectLocale();
            this.applyLocale(this.locale);
        },

        /**
         * Detect locale from URL param > localStorage > browser preference
         */
        detectLocale: function() {
            // 1. Check URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lang');
            if (urlLang && this.locales[urlLang]) {
                return urlLang;
            }

            // 2. Check localStorage
            try {
                const storedLang = localStorage.getItem('i18n_locale');
                if (storedLang && this.locales[storedLang]) {
                    return storedLang;
                }
            } catch (e) {
                // localStorage not available
            }

            // 3. Check browser preference
            const browserLangs = navigator.languages || [navigator.language];
            for (const lang of browserLangs) {
                const code = lang.split('-')[0].toLowerCase();
                if (this.locales[code]) {
                    return code;
                }
            }

            // 4. Fallback to English
            return this.fallbackLocale;
        },

        /**
         * Set locale and persist to localStorage
         */
        setLocale: function(locale) {
            if (!this.locales[locale]) {
                console.warn('I18n: Unknown locale:', locale);
                return;
            }

            this.locale = locale;

            try {
                localStorage.setItem('i18n_locale', locale);
            } catch (e) {
                // localStorage not available
            }

            this.applyLocale(locale);
        },

        /**
         * Apply locale to document
         */
        applyLocale: function(locale) {
            const isRTL = this.rtlLocales.includes(locale);

            // Set HTML dir and lang attributes
            document.documentElement.setAttribute('lang', locale);
            document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

            // Toggle RTL class on body
            document.body.classList.toggle('rtl', isRTL);

            // Translate all elements
            this.translatePage();

            // Update language switcher display
            this.updateLanguageSwitcher();

            // Dispatch event for custom handlers
            document.dispatchEvent(new CustomEvent('i18n:localeChanged', {
                detail: { locale: locale, isRTL: isRTL }
            }));
        },

        /**
         * Get translation for a key with optional placeholders
         * @param {string} key - Dot-notation key (e.g., 'nav.home')
         * @param {object} params - Optional placeholder values
         * @returns {string}
         */
        t: function(key, params) {
            let value = this.getTranslation(this.locale, key);

            // Fallback to default locale
            if (value === undefined && this.locale !== this.fallbackLocale) {
                value = this.getTranslation(this.fallbackLocale, key);
            }

            // Return key if no translation found
            if (value === undefined) {
                console.warn('I18n: Missing translation for key:', key);
                return key;
            }

            // Replace placeholders {{name}}
            if (params) {
                Object.keys(params).forEach(function(param) {
                    value = value.replace(new RegExp('\\{\\{' + param + '\\}\\}', 'g'), params[param]);
                });
            }

            return value;
        },

        /**
         * Get nested translation value
         */
        getTranslation: function(locale, key) {
            const translations = this.translations[locale];
            if (!translations) return undefined;

            const keys = key.split('.');
            let value = translations;

            for (const k of keys) {
                if (value === undefined || value === null) return undefined;
                value = value[k];
            }

            return value;
        },

        /**
         * Register translations for a locale
         */
        addTranslations: function(locale, translations) {
            this.translations[locale] = translations;
        },

        /**
         * Translate all elements on the page
         */
        translatePage: function() {
            // data-i18n - text content
            document.querySelectorAll('[data-i18n]').forEach(function(el) {
                const key = el.getAttribute('data-i18n');
                if (key) {
                    el.textContent = I18n.t(key);
                }
            });

            // data-i18n-html - HTML content (for elements with <br>, etc.)
            document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
                const key = el.getAttribute('data-i18n-html');
                if (key) {
                    el.innerHTML = I18n.t(key);
                }
            });

            // data-i18n-placeholder - input placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
                const key = el.getAttribute('data-i18n-placeholder');
                if (key) {
                    el.setAttribute('placeholder', I18n.t(key));
                }
            });

            // data-i18n-aria - aria-label
            document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
                const key = el.getAttribute('data-i18n-aria');
                if (key) {
                    el.setAttribute('aria-label', I18n.t(key));
                }
            });

            // data-i18n-title - title attribute
            document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
                const key = el.getAttribute('data-i18n-title');
                if (key) {
                    el.setAttribute('title', I18n.t(key));
                }
            });
        },

        /**
         * Update language switcher dropdown display
         */
        updateLanguageSwitcher: function() {
            const switchers = document.querySelectorAll('.lang-switcher-current');
            const currentLang = this.locales[this.locale];

            switchers.forEach(function(el) {
                el.textContent = currentLang ? currentLang.nativeName : 'English';
            });

            // Update active state in dropdown
            document.querySelectorAll('.lang-option').forEach(function(el) {
                const optionLocale = el.getAttribute('data-locale');
                el.classList.toggle('active', optionLocale === I18n.locale);
            });
        },

        /**
         * Get current locale
         */
        getLocale: function() {
            return this.locale;
        },

        /**
         * Check if current locale is RTL
         */
        isRTL: function() {
            return this.rtlLocales.includes(this.locale);
        },

        /**
         * Get list of available locales
         */
        getAvailableLocales: function() {
            return Object.keys(this.locales).map(function(code) {
                return {
                    code: code,
                    name: I18n.locales[code].name,
                    nativeName: I18n.locales[code].nativeName
                };
            });
        }
    };

    // Initialize language switcher functionality
    function setupLanguageSwitcher() {
        document.addEventListener('click', function(e) {
            // Toggle dropdown
            const toggle = e.target.closest('.lang-switcher-toggle');
            if (toggle) {
                e.preventDefault();
                const dropdown = toggle.closest('.lang-switcher');
                if (dropdown) {
                    dropdown.classList.toggle('open');
                }
                return;
            }

            // Handle language selection
            const option = e.target.closest('.lang-option');
            if (option) {
                e.preventDefault();
                const locale = option.getAttribute('data-locale');
                if (locale) {
                    I18n.setLocale(locale);
                    // Close dropdown
                    const dropdown = option.closest('.lang-switcher');
                    if (dropdown) {
                        dropdown.classList.remove('open');
                    }
                }
                return;
            }

            // Close dropdown when clicking outside
            const openDropdowns = document.querySelectorAll('.lang-switcher.open');
            openDropdowns.forEach(function(dropdown) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.lang-switcher.open').forEach(function(dropdown) {
                    dropdown.classList.remove('open');
                });
            }
        });
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setupLanguageSwitcher();
            I18n.init();
        });
    } else {
        setupLanguageSwitcher();
        I18n.init();
    }

    // Export to global scope
    window.I18n = I18n;
})();
