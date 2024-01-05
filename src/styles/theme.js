const theme = {
  color: {
    black: '#000',
    white: '#fff',
    primaryColor: '#77bb70',
    secondaryColor: '#b3d3b0',
    tertiaryColor: '#d4ffb3',

    textColor: '#212121',
    bgColor: '#f5f5f5',
    accentColor: '#f0b13b',
    sectionColor: 'rgba(0, 0, 0, 0.5)',
  },
  border: {
    borderRadius: `14px`,
    primaryColor: '#3f4050',
    secondaryColor: '#8c8d96',
    tertiaryColor: '#b2b3b9',
  },

  buttonStyle: `
    all: unset;
    display: block;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    `,

  containerStyle: `
    position: relative;
    max-width: 480px;

    padding: 0 24px;
    margin: 16px auto 0;
  `,

  boxShadow: `rgba(70, 70, 70, 0.16) 0px -1px 6px,
  rgba(70, 70, 70, 0.23) 0px 4px 6px, rgba(70, 70, 70, 0.16) 0px 0px 6px,
  rgba(70, 70, 70, 0.23) 2px 0px 6px`,

  flex: (jc = 'flex-start', ai = 'flex-start') => `
  display:flex;
  flex-direction: row;
  justify-content: ${jc};
  align-items: ${ai};
  `,
  flexColumn: (jc = 'flex-start', ai = 'flex-start') => `
  display:flex;
  flex-direction: column;
  justify-content: ${jc};
  align-items: ${ai};
  `,
};

export { theme };
