const rootStyles = window.getComputedStyle(document.documentElement);

if(rootStyles.getPropertyValue('--book-cover-width-large') !== null ){
    ready();
}else{
    document.getElementById('main-css').addEventListener('load', ready)
}


function ready(){
    const coverWitdh = parseFloat(rootStyles.getPropertyValue('--book-cover-witdth-large'));
    const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'));
    const coverHeight = coverWitdh / coverAspectRatio;
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    );
    
    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspectRatio,
        imageResizeTargetWidth: coverWitdh,
        imageResizeTargetHeight: coverHeight,
    })
    
    FilePond.parse(document.body);
}
