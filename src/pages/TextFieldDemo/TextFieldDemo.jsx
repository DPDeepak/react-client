import React from 'react';
import TextField, { Slider } from '../../components';
import { PUBLIC_IMAGE_FOLDER } from '../../configs/constants';

const bannerImages = [
  `${PUBLIC_IMAGE_FOLDER}default.png`,
  `${PUBLIC_IMAGE_FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE_FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE_FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE_FOLDER}js.jpg`,
  `${PUBLIC_IMAGE_FOLDER}load-balancer.png`,

];

const TextFieldDemo = () => (
  <>
    <Slider banners={bannerImages} random />
    <h3>This is Disabled input</h3>
    <TextField value="disabled input" disabled />
    <h3>A Valid input</h3>
    <TextField placeholder="Accessible" />
    <h3>An input with errors</h3>
    <TextField value="101" error="could not be greater than" />
  </>

);

export default TextFieldDemo;
