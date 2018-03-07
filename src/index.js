import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Phonebook extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
      Rx.Observable.fromEvent(window, 'scroll')
      .throttle(1000)
      //.map((data) => {return data})
      .subscribe(function(e){console.log(e);});
    
      Rx.Observable.fromEvent(this.scrl, 'click')
      .subscribe(Rx.Observer.create(
        function(value) {
          console.log(value);
        },
        function(err) {
          console.error(err);
        },
        function() {
          console.log('Completed');
        }
      ));
    }

    render(){  
        return (
          <div>
            <div ref={(node)=>(this.scrl = node)} style={{ height: 200000, width: '100%'}}></div>
          </div>
        );
    }  
}

ReactDOM.render(<Phonebook
  />, document.getElementById('app'));
registerServiceWorker();
