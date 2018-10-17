module.exports = {

  title: { //done
    color: {name: "titleStyleColor", type: "ColorPickerInput", value: "color-15"},
    font: {
      name: "fontStyle",
      type: "FontPicker",
      value: "Body-M",
      theme: "font_4",
      minSize: 7,
      maxSize: 50,
      startSize: 15,
      startFontFamily:'Avenir Light'
    },
  },
  titleHover:{
    color: {name: "titleMouseoverColor", type: "ColorPickerInput", value: "color-14"}
  }

};
