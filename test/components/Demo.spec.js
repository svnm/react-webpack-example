import test from 'tape'
import React from 'react'
import { shallow } from 'enzyme'
import Demo from '../../src/components/Demo'

test('Demo component', (t) => {
  const component = shallow(<Demo />)

  t.equal(
    component.find('button').length, 2, 'the Demo component has 2 button elements'
  )

  t.end()
});
