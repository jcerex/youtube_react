import React, { Component } from 'react';
import youtubeFetch from '../utils/youtube';
import VideoItem from './videoItem';
import FeaturedVideo from './featuredVideo';
import _ from 'lodash';
import style from './videoItem.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      query: '',
      featuredResult: {},
      pastQueries: []
    };
  }

  fetchData = () => {
    youtubeFetch(this.state.query).then((response) => {
      const data = _.filter(response.items, (elem) => !!elem.id.videoId);
      this.setState({
        searchResults: data,
        featuredResult: data[0],
        pastQuery: this.state.pastQueries.push(this.state.query),
        query: '',
      });
      console.log(this.state.pastQueries);
    });
  }

  updateQuery(e) {
    this.setState({
      query: e.target.value,
    });
  }

  updateFeatured(obj) {
    this.setState({
      featuredResult: obj,
    });
  }

  updateFromPast(query) {
    this.setState({
      query: query,
    });
    // this.fetchData;
  }

  render() {
    const { searchResults } = this.state;
    return (
      <div>
        <div className='row'>
          <div className='col-md-12'>
            <input value={this.state.query} onChange={(e) => this.updateQuery(e)} placeholder='Find a video' />
            <button onClick={this.fetchData}> Search </button>
            <p>Past Queries:</p>
            {_.map(this.state.pastQueries, (query) => <a onClick={() => this.updateFromPast(query)}>{query}, </a>)}
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            {!_.isEmpty(searchResults) ? <FeaturedVideo id={this.state.featuredResult.id} /> : ''}
          </div>
          <div className='col-md-4'>
            {!_.isEmpty(searchResults) ? _.map(searchResults, (searchResult) => <div key={searchResult.id.videoId}><VideoItem searchObj={searchResult} imgUrl={searchResult.snippet.thumbnails.high.url} updateFeatured={(obj) => this.updateFeatured(obj)} /></div>) : ''}
          </div>
        </div>
      </div>
    );
  }
}

// TO add: loader, highlight list item, past searches etc.
