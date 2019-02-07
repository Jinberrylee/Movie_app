import React, { Component } from "react";
import "./App.css";
import Movie from "./Movie";

class App extends Component {
  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update componentWillReceiveProps() -> shouldComponentUpdate() -> componentWillUpdate() -> render() -> componentDidUpdate()

  state = {};

  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
    //각각 무비 인덱스에 각각영화의 타이틀, 포스터, 키 들의 값들을 초기화 시켜주는 작업
      return( <Movie
      title={movie.title_english}
      poster={movie.medium_cover_image}
      key={movie.id}
      genres={movie.genres} 
      synopsis={movie.synopsis}
      />
      );
     });
     return movies;
   };

  _getMovies = async () => { //이전작업과 상관없이 작업수행 async가 있어서 await가 작용
    const movies = await this._callApi(); // await은 callapi기능이 끝날때까지 기다린 (단순 완료) 그러고 call api리턴값을 movidesdp wjwkd)
    this.setState({ 
      movies
    });
  };

  _callApi = () => {
    return fetch(
      "https://yts.am/api/v2/list_movies.json?sort_by=download_count"
    ) 
    .then(potato => potato.json()) // =>: 'arrow function' : return의 기능 response 오브젝트를 확인할수 있는 json으로 바꾸기
    .then(json => json.data.movies)
    .catch(err => console.log(err))

  };
 
  render() {
   const { movie } = this.state;
    return (
      <div className="App">
        {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    );
   
  }
}

export default App;