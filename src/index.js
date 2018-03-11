import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as Rx from 'rxjs/Rx';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var getYOffset = function () {
  return window.pageYOffset;
};

var initialScrollSubject = (new Rx.ReplaySubject(1));
initialScrollSubject.next(getYOffset());

var yOffsetStream = initialScrollSubject.merge(
  Rx.Observable.fromEvent(window, 'scroll').map(getYOffset)
);

var getWindowHeight = function () {
  return window.innerHeight;
};

var initialHeightSubject = (new Rx.ReplaySubject(1));
initialHeightSubject.next(getWindowHeight());

var windowHeightStream = initialHeightSubject.merge(
  Rx.Observable.fromEvent(window, 'resize').map(getWindowHeight)
);

class Phonebook extends Component {
constructor(props){
  super(props);
  this.state = {
    visibleIndices: [],
  }
}

  render() {
    var {totalResults, rowHeight} = this.props;
    var elements = this.state.visibleIndices.map(function (index, i) {
      return (
        <tr><td
        key={i+6328}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+190}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+212}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+3789}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+4456}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+5789}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td>
      <td
        key={i+65456}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+723432}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+112}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+121318}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+13453253}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+13439}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+12015}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+199878}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+11321}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+1353453}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+133}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+1444}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+164318}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+1123}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+99}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+13121}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+146}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+1234}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+13433}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+1456456}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+132423}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+1122}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+1689}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+154654}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td><td
        key={i+1000}
        style={{
          top: index * rowHeight
        }}>
        {index}
      </td></tr>
      );
    });
    return (
      <div>
        <ul
          className="phonebook"
          style={{
            height: totalResults * rowHeight
          }}>
          <table>
          {elements}
          </table>
        </ul>
      </div>
    );
  }

  componentDidMount() {
    var {rowHeight, totalResults} = this.props;

    var firstVisibleRowStream = yOffsetStream.map(function (y) {
      return Math.floor(y / rowHeight);
    }).distinctUntilChanged();

    var windowHeightStream = this.props.windowHeightStream.distinctUntilChanged();
    var rowCountStream = windowHeightStream.map(function (screenHeight) {
      return Math.ceil(screenHeight / rowHeight);
    }).distinctUntilChanged();

    var visibleIndicesStream = Rx.Observable.combineLatest(
      firstVisibleRowStream,
      rowCountStream,
      function (firstRow, rowCount) {
        var visibleIndices = [];

        // Limit the number of visible rows
        var lastRow = firstRow + rowCount + 1;
        if (lastRow > totalResults) {
          firstRow -= lastRow - totalResults;
        }

        for (var i = 0; i <= rowCount; i++) { visibleIndices.push(i + firstRow) }
        return visibleIndices;
      }
    );

    this.visibleIndicesSubscription = visibleIndicesStream.subscribe((indices) => {
      this.setState({
        visibleIndices: indices
      });
    });
  }
};

ReactDOM.render(
  <Phonebook
    totalResults={10000}
    rowHeight={30}
    yOffsetStream={yOffsetStream}
    windowHeightStream={windowHeightStream}
  />,
  document.getElementById('app')
);


