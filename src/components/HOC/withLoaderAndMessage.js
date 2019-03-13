import React from 'react';
import Progress from '../Progress';
import NoMatch from '../../pages/NoMatch';

const withLoaderAndMessage = (WrappedComponent) => {
  const HOC = (props) => {
    const { loader, count } = props;
    return (

      <>
        {
          (loader) ? (
            <div style={{ margin: 200, marginLeft: 500 }} >
              <Progress size={100} />
            </div>
          )
            : (
              (count) ?
                <WrappedComponent {...props} />
                : <NoMatch heading="OOPS!" message="No More Trainees are available" />
            )
        }

      </>
    );
  }

  return HOC;
};

export default withLoaderAndMessage;
