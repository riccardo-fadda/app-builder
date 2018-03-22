import React from 'react';
import 'test/enzyme-init';
import { shallow } from 'enzyme';
// import { GROUPS } from 'test/mocks/groups';
// import { ROLES } from 'test/mocks/roles';

import UserAuthorityTable from 'ui/users/authority/UserAuthorityTable';

// const groups = GROUPS.payload[0];
// const roles = ROLES.payload[0];
//
// const GROUP_SAME = [
//   {
//     name: 'Choose an option',
//     code: '',
//   },
// ];
// const ROLES_SAME = [
//   {
//     name: 'Choose an option',
//     code: '',
//   },
// ];
//
// const FIELDS = {
//   push: jest.fn(),
//   remove: jest.fn(),
// };

const GROUPS_MOCKS = [
  { code: 'opt1', name: 'Option 1' },
  { code: 'opt1', name: 'Option 1' },
];
const ROLES_MOCKS = [
  { code: 'opt1', name: 'Option 1' },
  { code: 'opt1', name: 'Option 1' },

];

jest.mock('state/users/selectors', () => ({
  getUserList: jest.fn(),
}));

describe('UserListTable', () => {
  let component;
  beforeEach(() => {
    component = shallow(<UserAuthorityTable
      groups={GROUPS_MOCKS}
      roles={ROLES_MOCKS}
    />);
  });

  console.log(component.debug());

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('renders with a BUTTON', () => {
    expect(component.find('BUTTON').exists());
  });

  // it('renders as many <option> as the provided array', () => {
  //   expect(component.find('option')).toHaveLength(OPTIONS_MOCKS.length);
  // });

  // it('depending on values selected call push() or not', () => {
  //   if (GROUP_SAME === ROLES_SAME) {
  //     component.find('BUTTON').simulate('click');
  //     expect(PUSH_FUNC.push).not.toHaveBeenCalled();
  //   } else {
  //     expect(PUSH_FUNC.push).toHaveBeenCalled();
  //   }
  // });


  describe('test table component', () => {
    beforeEach(() => {
      component = shallow(<UserAuthorityTable />);
    });
  });
});
