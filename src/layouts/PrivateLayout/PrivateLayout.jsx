import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

const PrivateLayout = ({ children, ...rest }) => (
  <>
    <Navbar />
    {children}
  </>
);
PrivateLayout.propTypes = {
  children: PropTypes.func.isRequired,
};
export default PrivateLayout;
