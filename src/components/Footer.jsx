import { Link } from 'react-router-dom';

const Footer = () => {
    const date = new Date().getFullYear();

    return (
        <footer className='Footer-Landing' role='contentinfo'>
            <p className='footerText'>© {date} Zachary Wood. All rights reserved.</p>
            <p className='footerText'>
                Powered by{' '}
                <Link
                    className='Hyperlink'
                    to='https://cneos.jpl.nasa.gov/sentry/'
                    aria-label='CNEOS impact monitoring system'>
                    CNEOS
                </Link>{' '}
                impact monitoring system. Visit the{' '}
                <Link
                    className='Hyperlink'
                    to='https://github.com/zwood011/sentry'
                    aria-label='GitHub project repository'>
                    Github
                </Link> Repository.
            </p>
        </footer>
    );
}

export default Footer;