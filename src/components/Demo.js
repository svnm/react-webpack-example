import React from 'react';
import CSSModules from 'react-css-modules';

let styles = {}
import demo from './Demo.css'

/* 
  import { fancyButton } from 'css-fancy-button'
  import fancyButton from 'css-fancy-button'
*/

import fancyButton from '../../../lib/fancyButton.css'
Object.assign(styles, fancyButton, demo)

function Demo( props) {

    const { route } = props;

    return (
    	<div styleName='demo'>
    		<button styleName='button blue'>press me</button>
    		<button styleName='button green'>press me</button>
    		<button styleName='button red'>press me</button>
       	</div>
    );
}

export default CSSModules(Demo, styles, {allowMultiple: true} )
