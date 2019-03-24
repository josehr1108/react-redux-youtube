import './App.css';
import _ from 'lodash';
import React, {Component} from 'react';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC3Mj8alXdYjL-Nqf_3cieG27X1q7SCD08';

class App extends Component {
    constructor(props){
        super(props);

        this.state = { videos: [] , selectedVideo: null };
        this.videoSearch("cocofunka");
    }

    videoSearch(term){
        YTSearch({key: API_KEY,term: term},(videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render = () => {
        const videoSearch = _.debounce(term => { //delay de 300ms para volver a invocar la función una vez llamada
           this.videoSearch(term)
        },300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}/>
            </div>
        )
    }
};

export default App;
