import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#667538]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-[#F4EBD0]">BudgetWise</span>
                        </Link>
                        <p className="text-sm text-[#F4EBD0]">
                            Your ultimate companion for smart money management.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                <span className="sr-only">GitHub</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                <span className="sr-only">Discord</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#F4EBD0] uppercase tracking-wider">Quick Links</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link to="/dashboard" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link to="/transactions" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Transactions
                                </Link>
                            </li>
                            <li>
                                <Link to="/reports" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Reports
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#F4EBD0] uppercase tracking-wider">Resources</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Community
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#F4EBD0] uppercase tracking-wider">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Cookie Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                    Copyright
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 border-t border-[#667538] pt-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <p className="text-sm text-[#F4EBD0]">
                            © {new Date().getFullYear()} BudgetWise. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-sm text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                Accessibility
                            </a>
                            <a href="#" className="text-sm text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                Status
                            </a>
                            <a href="#" className="text-sm text-[#F4EBD0] hover:text-[#b88b5a] transition-colors">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
