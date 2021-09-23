/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
const baseURL= 'http://localhost:3035'
import ItemsResult from './Items/ItemsResult';


class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor(props) {
        super(props);
        this.state = {
            showingSearch: false,
            data: [],
            text: '',
            suggestion:'',  
        };
    }



    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    fetchItems(value) {

        this.setState({loading: true})
        //fetch(`${baseURL}?filter=${value}`)

        axios.get(`${baseURL}`, {
            //params: {/* whatever data you want to send */ },
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(resp=>{
            const filterItems = resp.data.filter( (list) => {
                const regex = new RegExp(value, "gi");
                if(list.name.match(regex)){
                   return list.name.match(regex);
                }
                if(list.about.match(regex)){
                   return list.about.match(regex);
                }
            })

            this.setState({
                items: filterItems,
                loading: false,
            })
            
        }).catch(err=>{
            this.setState({loading: false})
        })

    }


    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        // Start Here
        // ...
        e.preventDefault();

        this.setState({ 
            items:null 
        })

        const {target:{value}} = e
        if(e.target.value.length > 0 ){
            this.fetchItems(value)
        }
       
    }


    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        const { showingSearch, items, loading, typedText } = this.state

        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    {loading && "Loading..."}
                    {showingSearch && items 
                        && <ItemsResult items={items} />}
                </div>
            </header>
        );
    }

}

// Export out the React Component
module.exports = Menu;