import React, { Component } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import './MainPage.css';
import axios from 'axios';
import SearchAutoComplete from './components/SearchAutoComplete';
import PaginatedList from './components/PaginatedList';

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ImageOfTheDay: [],
            TitleOFImage: "",
            DateOfClicked: "",
            ImageDesc: "",
            ImageCredit: "",
            query: "",
            searchData: [],
            isSearch: false,

        };

    }
    componentDidMount() {
        axios.get('https://api.nasa.gov/planetary/apod?api_key=2h5aX6O4BQcuzyrH3MDOrBO2u3E0SDljsuUHwv4c')
       
        .then((response)=>
            {
            console.log("successfully fetched the image of the day",response);
            this.setState({ImageOfTheDay:response.data.hdurl,
                TitleOFImage:response.data.title,
                DateOfClicked:response.data.date,
                ImageDesc:response.data.explanation,
                ImageCredit:response.data.copyright
            });
        })
            
        .catch(err=>
        {
            console.log(err);
        })
    }

    handleOnInputChange = (value,result) => {
        const querydata = value;
        this.setState({ query: querydata });
        
    }



    fetchSearchResult = (e) => {
        let data = []
        axios.get(`https://images-api.nasa.gov/search?q=${this.state.query}`)
            .then(response => {
                console.log("reposne successed", response);
                const imagesData = response.data.collection.items;
                console.log(imagesData);
                const filteredData = imagesData.filter(record => record.links!==undefined);
                data = filteredData.map(record => {
                    return {
                        title: record.data[0].title,
                        img: record.links[0].href
                    }
                })

                this.setState({
                    searchData: data,
                    isSearch: true  
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { ImageOfTheDay, query } = this.state;
        return (
            this.state.isSearch ? (<PaginatedList data = {this.state.searchData}/>) :
            <div>
                <h1 className="titleofPage">NASA Media Search</h1>
                <h3 className="titleofImage"><b>Image Title :</b> {this.state.TitleOFImage}</h3>
                <SearchAutoComplete handleChange={this.handleOnInputChange} onSearchBtnClick={this.fetchSearchResult} />
               

                <img src={this.state.ImageOfTheDay} alt="pic of the day" className="imageoftheday"></img>
                <h2 className="dateDisp"><b>Date: </b>{this.state.DateOfClicked}</h2>
                <h4 className="Imagedesc"><b>Explanation :</b> {this.state.ImageDesc}</h4>
                <h2 className="imagecredit"><b>Image Credit & Copyright :</b> {this.state.ImageCredit}</h2>
            </div>
        )
    }
}