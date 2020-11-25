// This plugin creates 5 rectangles on the screen.
// const textKeys = 	[...Object.keys(Object.getPrototypeOf(figma.getLocalTextStyles()[0] 	|| {}	))]
// const paintKeys = 	[...Object.keys(Object.getPrototypeOf(figma.getLocalPaintStyles()[0] 	|| {}	))]
// const effectKeys = 	[...Object.keys(Object.getPrototypeOf(figma.getLocalEffectStyles()[0] || {}	))]
// const gridKeys = 	[...Object.keys(Object.getPrototypeOf(figma.getLocalGridStyles()[0]	|| {}	))]
const paintKeys = [
    "name",
    "paints",
    "description"
];
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
];
const strokeKeys = [
    'description',
    'name',
    'strokeWeight',
    'strokeAlign',
    'strokeCap',
    'strokeJoin',
    'dashPattern',
    'fillStyleId'
];
figma.currentPage.selection.forEach((sel) => {
    if (sel.fills.length > 0 && sel.fillStyleId != "") {
        let libStyle = figma.getStyleById(sel.fillStyleId);
        if (libStyle.remote == true) {
            let newStyle = figma.createPaintStyle();
            sel.fillStyleId = newStyle.id;
            paintKeys.forEach((key) => {
                newStyle[key] = libStyle[key];
            });
        }
    }
    if (sel.strokes.length > 0 && sel.strokeStyleId != "") {
        let libStyle = figma.getStyleById(sel.strokeStyleId);
        console.log(libStyle);
        if (libStyle.remote == true) {
            let newStyle = figma.createPaintStyle();
            sel.strokeStyleId = newStyle.id;
            paintKeys.forEach((key) => {
                newStyle[key] = libStyle[key];
            });
        }
    }
    if (sel.type == "TEXT" && sel.textStyleId != "") {
        let libStyle = figma.getStyleById(sel.textStyleId);
        if (libStyle.remote == true) {
            let newStyle = figma.createTextStyle();
            sel.textStyleId = newStyle.id;
            Promise.all([figma.loadFontAsync(libStyle.fontName)]).then(() => {
                textKeys.forEach((key) => {
                    newStyle[key] = libStyle[key];
                });
            });
        }
    }
});
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
