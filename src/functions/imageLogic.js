var imageUrls = ["url('https://i.imgur.com/Je4AcTJ.jpg')", "url('https://i.imgur.com/BE5O37v.jpg')", "url('https://i.imgur.com/E2B4bQD.jpg')", "url('https://i.imgur.com/Ctvtv8m.jpg')", "url('https://i.imgur.com/CdbozMj.jpg')", "url('https://i.imgur.com/DnggAu8.jpg')", "url('https://i.imgur.com/GnUHweL.jpg')", "url('https://i.imgur.com/yMOBRmd.jpg')", "url('https://i.imgur.com/Z6lre2i.jpg')", "url('https://i.imgur.com/wvMRgtj.jpg')", "url('https://i.imgur.com/9jISKj9.jpg')", "url('https://i.imgur.com/1tGU7aI.jpg')", "url('https://i.imgur.com/NddJsrf.jpg')", "url('https://i.imgur.com/zFMgJwa.jpg')", "url('https://i.imgur.com/thmhlb1.jpg')", "url('https://i.imgur.com/ErjHCsw.jpg')", "url('https://i.imgur.com/zlqdIJ8.jpg')", "url('https://i.imgur.com/aLwVsKr.jpg')", "url('https://i.imgur.com/YsZsAV8.jpg')", "url('https://i.imgur.com/N4ZNsAB.jpg')", "url('https://i.imgur.com/VdYh0lg.jpg')", "url('https://i.imgur.com/H10607q.jpg')", "url('https://i.imgur.com/TN6fXJ6.jpg')", "url('https://i.imgur.com/KYRTrCz.jpg')", "url('https://i.imgur.com/R9CJW6R.jpg')", "url('https://i.imgur.com/cjkks54.jpg')", "url('https://i.imgur.com/DiZEY5I.jpg')", "url('https://i.imgur.com/qe0bALG.jpg')", "url('https://i.imgur.com/KEJtJyY.jpg')", "url('https://i.imgur.com/XeDZCfI.jpg')", "url('https://i.imgur.com/43TwICy.jpg')", "url('https://i.imgur.com/nSlnwVq.jpg')", "url('https://i.imgur.com/F8OWKA3.jpg')", "url('https://i.imgur.com/DFiqeQA.jpg')", "url('https://i.imgur.com/7r3W9OL.jpg')", "url('https://i.imgur.com/Oo08Ztz.jpg')", "url('https://i.imgur.com/VTvtpTA.jpg')", "url('https://i.imgur.com/UrENcG9.jpg')", "url('https://i.imgur.com/mnSKlVB.jpg')", "url('https://i.imgur.com/bmJwyHL.jpg')", "url('https://i.imgur.com/AEUv1py.jpg')", "url('https://i.imgur.com/j87HTzI.jpg')", "url('https://i.imgur.com/3bNAas2.jpg')", "url('https://i.imgur.com/3x3SWZv.jpg')", "url('https://i.imgur.com/85SDQ5r.jpg')", "url('https://i.imgur.com/fpH83xU.jpg')", "url('https://i.imgur.com/wDSuYqQ.jpg')", "url('https://i.imgur.com/dB8k4Jm.jpg')", "url('https://i.imgur.com/tiv2d2P.jpg')", "url('https://i.imgur.com/5WrC9mP.jpg')", "url('https://i.imgur.com/jtIEGdg.jpg')", "url('https://i.imgur.com/kbTAruJ.jpg')", "url('https://i.imgur.com/VMLUpo6.jpg')", "url('https://i.imgur.com/sWLRegz.jpg')", "url('https://i.imgur.com/9vPFlnC.jpg')", "url('https://i.imgur.com/jtzKAIV.jpg')", "url('https://i.imgur.com/NTaG80X.jpg')", "url('https://i.imgur.com/xwOwYO7.jpg')", "url('https://i.imgur.com/BoY7i70.jpg')", "url('https://i.imgur.com/jaPTmT2.jpg')", "url('https://i.imgur.com/x6O40FN.jpg')", "url('https://i.imgur.com/n959I9t.jpg')", "url('https://i.imgur.com/zkiYGYs.jpg')", "url('https://i.imgur.com/vKpSYbV.jpg')", "url('https://i.imgur.com/uIikqkC.jpg')", "url('https://i.imgur.com/KtrTbBM.jpg')", "url('https://i.imgur.com/85CiCmr.jpg')", "url('https://i.imgur.com/VFI0hqg.jpg')", "url('https://i.imgur.com/heBXiOh.jpg')", "url('https://i.imgur.com/r6pFNjM.jpg')", "url('https://i.imgur.com/dJDGS0C.jpg')", "url('https://i.imgur.com/DquKKpN.jpg')", "url('https://i.imgur.com/qPr7foQ.jpg')", "url('https://i.imgur.com/6cKugRO.jpg')", "url('https://i.imgur.com/4mK8hJb.jpg')", "url('https://i.imgur.com/UqDtcDI.jpg')", "url('https://i.imgur.com/uxl4jvJ.jpg')", "url('https://i.imgur.com/odloEoN.jpg')", "url('https://i.imgur.com/4SkSnHf.jpg')", "url('https://i.imgur.com/e8oZnIY.jpg')", "url('https://i.imgur.com/EMkw2Zi.jpg')", "url('https://i.imgur.com/Jgm2vPF.jpg')", "url('https://i.imgur.com/Zvc4t9u.jpg')", "url('https://i.imgur.com/BljcdOY.jpg')", "url('https://i.imgur.com/LaTviPn.jpg')", "url('https://i.imgur.com/Kfd5OXr.jpg')", "url('https://i.imgur.com/C7nKHMY.jpg')", "url('https://i.imgur.com/RO2BGFh.jpg')", "url('https://i.imgur.com/EpyjjhH.jpg')", "url('https://i.imgur.com/GcXkNrp.jpg')", "url('https://i.imgur.com/jfm2pcT.jpg')", "url('https://i.imgur.com/WrIYkxw.jpg')", "url('https://i.imgur.com/pDpHf8O.jpg')", "url('https://i.imgur.com/JojQ1be.jpg')", "url('https://i.imgur.com/MIspX7t.jpg')", "url('https://i.imgur.com/EfAFLI8.jpg')", "url('https://i.imgur.com/UEPPa3g.jpg')", "url('https://i.imgur.com/kBpsoqz.jpg')", "url('https://i.imgur.com/KN3vM6W.jpg')", "url('https://i.imgur.com/e860SS3.jpg')", "url('https://i.imgur.com/LMiX8F5.jpg')", "url('https://i.imgur.com/eiNY0MY.jpg')"];

export function handleChangeBackground(skipBackground = false){
  var preventChangeBackground = JSON.parse(localStorage.getItem('preventChangeBackground'))
  if (!preventChangeBackground | skipBackground){
    var backgroundImageIndex;
    
    // check for previous image
    if (JSON.parse(localStorage.getItem('backgroundImageIndex'))){backgroundImageIndex = JSON.parse(localStorage.getItem('backgroundImageIndex'))}
    else {backgroundImageIndex = 0}
  
    if (skipBackground === "last"){
      if (backgroundImageIndex === 0) {backgroundImageIndex = imageUrls.length - 1}
      else {backgroundImageIndex--}
    }
      
    else {
      if (backgroundImageIndex === imageUrls.length - 1) {backgroundImageIndex = 0}
      else {backgroundImageIndex++}
    }
  
    // save image url
    localStorage.setItem('backgroundImageIndex', JSON.stringify(backgroundImageIndex))
    document.body.style.backgroundImage = imageUrls[backgroundImageIndex]
  }
}

export function toggleAllowedBackgroundChanges(){
  var preventChangeBackground;
  if (JSON.parse(localStorage.getItem('preventChangeBackground'))){preventChangeBackground = !JSON.parse(localStorage.getItem('preventChangeBackground'))}
  else {preventChangeBackground = true}
  this.setState({preventChangeBackground})
  return localStorage.setItem('preventChangeBackground', JSON.stringify(preventChangeBackground))
}