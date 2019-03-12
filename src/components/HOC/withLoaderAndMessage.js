import React from 'react';
import Progress from '../Progress';
import NoMatch from '../../pages/NoMatch';

const withLoaderAndMessage = (WrappedComponent) => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { loader, dataLength, count } = this.props;

      return (

        <>
          {
            (loader) ? (
            <div style={{margin: 200, marginLeft:500}} >
              <Progress size={100} />
            </div>
            )
              : (
                (count) ?
                  <WrappedComponent {...this.props} />
                  : <NoMatch heading="OOPS!" message="No More Trainees are available" />
              )
          }

        </>
      );
    }
  }

  return HOC;
};

export default withLoaderAndMessage;
