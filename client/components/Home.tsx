import * as React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { withApollo } from 'react-apollo';
import { Client } from '../data/apollo';
const aegisImgLoader = require('../assets/aegis-loader.gif');

export interface IProps {
  client: Client;
  onInitialiseApp: () => void;
  dataProgress: {
    message: string;
    progress: number;
  }
}

class Home extends React.Component<IProps, { progressMessage: string; progress: number; initStarted: boolean; initFinished: boolean; }> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      progressMessage: 'Click the Aegis to initialise the App',
      progress: 0,
      initStarted: false,
      initFinished: false
    }
  }

  onInitialiseApp = this.props.onInitialiseApp;

  render() {
    return (
      <div className="container-fluid text-light">
        <div className="d-flex flex-column align-items-center mt-5">
          <p>{this.props.dataProgress.message}</p>
          {
            !this.state.initStarted ?
              <img src={aegisImgLoader} alt="Aegis" className="mt-5"
                style={{ cursor: 'pointer', height: '250px', width: '250px' }}
                onClick={this.onInitialiseApp}
              />
              :
              <CircularProgressbar
                styles={{ root: { height: '20%', width: '20%' } }}
                value={this.props.dataProgress.progress}
                text={`${this.props.dataProgress.progress}%`} />
          }
        </div>
      </div>
    );
  }
}

export default withApollo(Home);