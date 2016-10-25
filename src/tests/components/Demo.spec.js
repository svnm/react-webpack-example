import expect from 'expect'
import test from 'tape'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { setupJsdom } from '../jsdom'
import Demo from '../../components/Demo'

test('Demo component', (t) => {
  setupJsdom()
  const wrapper = mount( <Demo /> )
  const component = shallow(<Demo />)

  t.equal(
    component.find('button').length, 2, 'the Demo component has 2 button elements'
  )

  t.end()
});
