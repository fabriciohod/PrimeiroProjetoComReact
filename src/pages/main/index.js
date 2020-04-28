import React, { Component } from 'react';
import api from '../../service/api';
import { Link } from 'react-router-dom';
import './Styles.css'

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    componentDidMount() {
        this.loadProduct();
    }

    loadProduct = async (page = 1) => {
        const Response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = Response.data

        this.setState({ products: Response.data.docs, page, productInfo })
    }
    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProduct(pageNumber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProduct(pageNumber);
    }

    render() {
        const { products, page, productInfo } = this.state;
        return (

            <div className="product-list">
                {products.map(products => (
                    <article key={products._id}>
                        <strong>{products.title}</strong>
                        <p>{products.description}</p>
                        <Link to={`/products/${products._id}`}>Acessar informções</Link>
                    </article>

                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Proximo</button>
                </div>
            </div>
        )
    }
}