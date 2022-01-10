import React from 'react';
import logo from './logo.png';
import './App.css';
// import API from '../../my-worker/index';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      textContent: 'Something is happening...',
      url: 'https://my-worker.linqinyun.workers.dev/',
    };
    this.GetRequest();

    this.PostRequest = this.PostRequest.bind(this);
    this.GetRequest = this.GetRequest.bind(this);
  }

  PostRequest(){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', this.state.url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var user_name = document.getElementById('user_name').value;
    var user_post = document.getElementById('user_post').value;
    var data = "user_name=" + user_name + 
      "&&&&& user_post=" + user_post;

    httpRequest.send(data);

    var new_text = user_name + ": " + user_post + "\n\n" + this.state.textContent;
    this.setState({
      textContent: new_text,
    });
  }
  
  GetRequest(){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', this.state.url, true);
    httpRequest.send();
  
    let json = '';
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          json = httpRequest.responseText;
          this.setState({
            textContent: json,
          });
          console.log(this.state.textContent);
      }
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Post Everyday as Anyone</p>
          </div>
          <div className="Message">
            <box className="box">
              <p>Post your life</p>
              <textarea id='user_name' className="user-name" placeholder="What's the name you want to use today?">
              </textarea>
              <p></p>
              <textarea id='user_post' className="textarea" placeholder='Say something...'>
              </textarea>
              <p></p>
              <button className="post-btn" onClick={this.PostRequest}>
                POST
              </button>
            </box>
            
            <box className="box">
              <p>See how is everyone going</p>
              <p></p>
              <textarea className="all-post" value={this.state.textContent} readOnly="readOnly">
              </textarea>
              <p></p>
              <button className="post-btn" onClick={this.GetRequest}>
                REFRESH
              </button>
            </box>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
