const { Link } = ReactRouterDOM

export function Home() {
    return <section className="home">
        <h1>Welcome to Book app</h1>
        <img src="assets/img/home.jpg" alt="" />
        <Link to="/book"><button>Enter</button></Link>
    </section>
}