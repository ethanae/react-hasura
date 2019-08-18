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
    progress: number | null;
  }
}

const Home = (props: IProps) => {
  return (
    <div className="container-fluid text-light">
      <div className="d-flex flex-column align-items-center mt-5">
        <p>{props.dataProgress.message}</p>
        {
          props.dataProgress.progress == null ?
            <img src={aegisImgLoader} alt="Aegis" className="mt-5"
              style={{ cursor: 'pointer', height: '250px', width: '250px' }}
              onClick={props.onInitialiseApp}
            />
            :
            <CircularProgressbar
              styles={{ root: { height: '20%', width: '20%' } }}
              value={props.dataProgress.progress}
              text={`${props.dataProgress.progress}%`} />
        }
      </div>
    </div>
  );
}


export default withApollo(Home);