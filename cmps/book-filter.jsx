

export class BookFilter extends React.Component {
    state = {
        name: '',
        minPrice: '',
        maxPrice: ''
    }

    handleChange = ({ target }) => {
        const value = (target.type === 'number') ? +target.value : target.value
        const field = target.name
        this.setState((prevState) => ({ ...prevState, [field]: value }), () => {
            this.props.onSetFilter(this.state)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state)
    }

    render() {
        const { name, minPrice, maxPrice } = this.state
        return <section className="book-filter">
            <form onSubmit={this.onFilter}>
                <label>Filter by name <input type="text" placeholder="By name" name="name" value={name} onChange={this.handleChange} /></label>

                <label>Filter by min price <input type="number" placeholder="By name" name="minPrice" value={minPrice} onChange={this.handleChange} /></label>

                <label>Filter by max price <input type="number" placeholder="By name" name="maxPrice" value={maxPrice} onChange={this.handleChange} /></label>
            </form>
        </section>
    }
}