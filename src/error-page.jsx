import React, { Component } from 'react'

export class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      randomGif: ''
    }
  }

  /** picks out gif randomly from gif array */
  getRandomGif() {
    const gifs = this.state.gifs;
    const random = Number((Math.random() * (gifs.length - 1)).toFixed(0));
    const randomGif = gifs[random];
    this.setState({
      randomGif: randomGif.images.fixed_height.url
    })
  }

  fetchGif() {
    const checkErrorType = () => {
      if (this.props.internetDown) return;
      if (this.props.noDataFound) return 'tumbleweed';
    }
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=${checkErrorType()}&limit=25&offset=0&rating=G&lang=en`)
      .then(res => res.json())
      .then(gifs => {
        this.setState({
          gifs: gifs.data
        })
        this.getRandomGif();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  componentDidMount() {
    this.fetchGif();
  }

  backToResultsOrHomepage() {
    if (this.props.searchResultsCopy.length) {
      return (
        <h6 className="cursor-pointer" onClick={() => this.props.backToResults()}>
          &#8592; Back to results
        </h6>
      )
    }
    return (
      <h6 className="cursor-pointer" onClick={() => this.props.backToHomepage()}>
        &#8592; Back to homepage
      </h6>
    )
  }

  render() {
    const checkErrorType = () => {
      if (this.props.internetDown) return 'Connection was lost :(';
      if (this.props.noDataFound) return 'No data was found :(';
    }
    return (
      <div className="mx-auto mt-2 w-95">
        <div className="back-to-homepage fit-content">
          {this.backToResultsOrHomepage()}
          <div className="line" />
        </div>
        <h1 className="text-center pt-5">{checkErrorType()}</h1>
        <div className="d-flex justify-content-center my-5">
          <img className="stonks-gif" src={this.state.randomGif} alt="" />
        </div>
      </div>
    )
  }
}

export default ErrorPage
