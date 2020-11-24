// This plugin creates 5 rectangles on the screen.

// const textKeys = 	[...Object.keys(Object.getPrototypeOf(figma.getLocalTextStyles()[0] 	|| {}	))]
// const paintKeys = 	[...Object.keys(Object.getPrototypeOf(figma.getLocalPaintStyles()[0] 	|| {}	))]
// const effectKeys = 	[...Object.keys(Object.getPrototypeOf(figma.getLocalEffectStyles()[0] || {}	))]
// const gridKeys = 	[...Object.keys(Object.getPrototypeOf(figma.getLocalGridStyles()[0]	|| {}	))]


const paintKeys = [
  "name",
  "paints",
  "description"
]
const textKeys = [
'description', 
'fontName',
'fontSize',
'letterSpacing',
'lineHeight',
'name', 
'paragraphIndent',
'paragraphSpacing',
'textCase',
'textDecoration'
]



console.log("Running")

figma.currentPage.selection.forEach((sel: any) => {

console.log(sel)

    if(sel.fills.length > 0 && sel.fillStyleId != ""){
      let newStyle = figma.createPaintStyle()
      let libStyle = figma.getStyleById(sel.fillStyleId)
      if(libStyle.remote == true){
        paintKeys.forEach((key) => {
          newStyle[key] = libStyle[key]
        })
    }
  }


    if(sel.type == "TEXT" && sel.textStyleId != ""){
      let newStyle = figma.createTextStyle()
      let libStyle = figma.getStyleById(sel.textStyleId) as TextStyle
      console.log(libStyle)
      if(libStyle.remote == true){
        Promise.all([figma.loadFontAsync(libStyle.fontName)]).then(() => {
        textKeys.forEach((key) => {
          newStyle[key] = libStyle[key]
        })
         }
        )
      }
    }  
    

})





// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin()
