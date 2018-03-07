import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as Rx from 'rxjs/Rx';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Phonebook extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
      // Rx.Observable.fromEvent(window, 'scroll')
      // .throttle(1000)
      // //.map((data) => {return data})
      // .subscribe(function(e){console.log(e);});
    
      // Rx.Observable.fromEvent(this.scrl, 'click')
      // .subscribe(Rx.Observer.create(
      //   function(value) {
      //     console.log(value);
      //   },
      //   function(err) {
      //     console.error(err);
      //   },
      //   function() {
      //     console.log('Completed');
      //   }
      // ));

      var s3 = Rx.Observable.of(1,2,3);
      var sbs3 = s3.subscribe(x => console.log(x));

      var observable2 = Rx.Observable.interval(1000);
      var subscription2 = observable2.subscribe(x => console.log(x));
      setTimeout(function(){
        subscription2.unsubscribe();
      },5000);

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
