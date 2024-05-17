export const optionStyle = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: '0.5' } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed ? { ...base, color: '#626262', paddingRight: 6 } : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
  option: (base, state) => ({
    ...base,
    fontSize: '16px'
  }),
  menuPortal: base => ({ ...base, zIndex: 9999 }),
  menu: base => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0
  }),
  menuList: base => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0
  }),
  singleValue: base => ({
    ...base,
    padding: 5
  })
};
