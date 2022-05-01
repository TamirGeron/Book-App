const { Link, NavLink, withRouter } = ReactRouterDOM

export function AppHeader() {
    return <header className="app-header">
        <Link to="/"><h3>Book App</h3></Link>

        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/book">Books</NavLink>
        </nav>
    </header>
}