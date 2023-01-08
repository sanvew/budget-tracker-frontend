import './_header.scss';

type Props = {}

export const Header = (props: Props) => {
    return (
        <div className='container-header'>
            <header>
                <div className='header-logo'>
                    <a href="/">Budget Tracker</a>
                </div>
                <nav className='header-nav'>
                    <ul>
                        <li><a href="index.html">Overview</a></li>
                        <li><a href="expenses.html">Expenses/Earnigns</a></li>
                        <li><a href="goals.html">Goals</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}
