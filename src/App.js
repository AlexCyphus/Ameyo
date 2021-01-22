import React, {Component} from 'react';
import './App.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { DragDropContext } from 'react-beautiful-dnd';
import states from './states';

// components
import Settings from './Settings';
import Information from './Information';
import Statistics from './Statistics';
import Column from "./Column.js"
import NewScreen from './components/NewScreen/NewScreen';

// functions 
import checkTime from './functions/checkTime';
import {onDragEnd, onDragStart} from './functions/dragLogic';
import {uncheckHabits, checkItem, addItem} from './functions/itemLogic'
import {queryLocalStorage} from './functions/queryLogic'
import {handleChangeBackground} from './functions/imageLogic'

var imageUrls = ["url('https://i.imgur.com/Je4AcTJ.jpg')", "url('https://i.imgur.com/BE5O37v.jpg')", "url('https://i.imgur.com/E2B4bQD.jpg')", "url('https://i.imgur.com/Ctvtv8m.jpg')", "url('https://i.imgur.com/CdbozMj.jpg')", "url('https://i.imgur.com/DnggAu8.jpg')", "url('https://i.imgur.com/GnUHweL.jpg')", "url('https://i.imgur.com/yMOBRmd.jpg')", "url('https://i.imgur.com/Z6lre2i.jpg')", "url('https://i.imgur.com/wvMRgtj.jpg')", "url('https://i.imgur.com/9jISKj9.jpg')", "url('https://i.imgur.com/1tGU7aI.jpg')", "url('https://i.imgur.com/NddJsrf.jpg')", "url('https://i.imgur.com/zFMgJwa.jpg')", "url('https://i.imgur.com/thmhlb1.jpg')", "url('https://i.imgur.com/ErjHCsw.jpg')", "url('https://i.imgur.com/zlqdIJ8.jpg')", "url('https://i.imgur.com/aLwVsKr.jpg')", "url('https://i.imgur.com/YsZsAV8.jpg')", "url('https://i.imgur.com/N4ZNsAB.jpg')", "url('https://i.imgur.com/VdYh0lg.jpg')", "url('https://i.imgur.com/H10607q.jpg')", "url('https://i.imgur.com/TN6fXJ6.jpg')", "url('https://i.imgur.com/KYRTrCz.jpg')", "url('https://i.imgur.com/R9CJW6R.jpg')", "url('https://i.imgur.com/cjkks54.jpg')", "url('https://i.imgur.com/DiZEY5I.jpg')", "url('https://i.imgur.com/qe0bALG.jpg')", "url('https://i.imgur.com/KEJtJyY.jpg')", "url('https://i.imgur.com/XeDZCfI.jpg')", "url('https://i.imgur.com/43TwICy.jpg')", "url('https://i.imgur.com/nSlnwVq.jpg')", "url('https://i.imgur.com/F8OWKA3.jpg')", "url('https://i.imgur.com/DFiqeQA.jpg')", "url('https://i.imgur.com/7r3W9OL.jpg')", "url('https://i.imgur.com/Oo08Ztz.jpg')", "url('https://i.imgur.com/VTvtpTA.jpg')", "url('https://i.imgur.com/UrENcG9.jpg')", "url('https://i.imgur.com/mnSKlVB.jpg')", "url('https://i.imgur.com/bmJwyHL.jpg')", "url('https://i.imgur.com/AEUv1py.jpg')", "url('https://i.imgur.com/j87HTzI.jpg')", "url('https://i.imgur.com/3bNAas2.jpg')", "url('https://i.imgur.com/3x3SWZv.jpg')", "url('https://i.imgur.com/85SDQ5r.jpg')", "url('https://i.imgur.com/fpH83xU.jpg')", "url('https://i.imgur.com/wDSuYqQ.jpg')", "url('https://i.imgur.com/dB8k4Jm.jpg')", "url('https://i.imgur.com/tiv2d2P.jpg')", "url('https://i.imgur.com/5WrC9mP.jpg')", "url('https://i.imgur.com/jtIEGdg.jpg')", "url('https://i.imgur.com/kbTAruJ.jpg')", "url('https://i.imgur.com/VMLUpo6.jpg')", "url('https://i.imgur.com/sWLRegz.jpg')", "url('https://i.imgur.com/9vPFlnC.jpg')", "url('https://i.imgur.com/jtzKAIV.jpg')", "url('https://i.imgur.com/NTaG80X.jpg')", "url('https://i.imgur.com/xwOwYO7.jpg')", "url('https://i.imgur.com/BoY7i70.jpg')", "url('https://i.imgur.com/jaPTmT2.jpg')", "url('https://i.imgur.com/x6O40FN.jpg')", "url('https://i.imgur.com/n959I9t.jpg')", "url('https://i.imgur.com/zkiYGYs.jpg')", "url('https://i.imgur.com/vKpSYbV.jpg')", "url('https://i.imgur.com/uIikqkC.jpg')", "url('https://i.imgur.com/KtrTbBM.jpg')", "url('https://i.imgur.com/85CiCmr.jpg')", "url('https://i.imgur.com/VFI0hqg.jpg')", "url('https://i.imgur.com/heBXiOh.jpg')", "url('https://i.imgur.com/r6pFNjM.jpg')", "url('https://i.imgur.com/dJDGS0C.jpg')", "url('https://i.imgur.com/DquKKpN.jpg')", "url('https://i.imgur.com/qPr7foQ.jpg')", "url('https://i.imgur.com/6cKugRO.jpg')", "url('https://i.imgur.com/4mK8hJb.jpg')", "url('https://i.imgur.com/UqDtcDI.jpg')", "url('https://i.imgur.com/uxl4jvJ.jpg')", "url('https://i.imgur.com/odloEoN.jpg')", "url('https://i.imgur.com/4SkSnHf.jpg')", "url('https://i.imgur.com/e8oZnIY.jpg')", "url('https://i.imgur.com/EMkw2Zi.jpg')", "url('https://i.imgur.com/Jgm2vPF.jpg')", "url('https://i.imgur.com/Zvc4t9u.jpg')", "url('https://i.imgur.com/BljcdOY.jpg')", "url('https://i.imgur.com/LaTviPn.jpg')", "url('https://i.imgur.com/Kfd5OXr.jpg')", "url('https://i.imgur.com/C7nKHMY.jpg')", "url('https://i.imgur.com/RO2BGFh.jpg')", "url('https://i.imgur.com/EpyjjhH.jpg')", "url('https://i.imgur.com/GcXkNrp.jpg')", "url('https://i.imgur.com/jfm2pcT.jpg')", "url('https://i.imgur.com/WrIYkxw.jpg')", "url('https://i.imgur.com/pDpHf8O.jpg')", "url('https://i.imgur.com/JojQ1be.jpg')", "url('https://i.imgur.com/MIspX7t.jpg')", "url('https://i.imgur.com/EfAFLI8.jpg')", "url('https://i.imgur.com/UEPPa3g.jpg')", "url('https://i.imgur.com/kBpsoqz.jpg')", "url('https://i.imgur.com/KN3vM6W.jpg')", "url('https://i.imgur.com/e860SS3.jpg')", "url('https://i.imgur.com/LMiX8F5.jpg')", "url('https://i.imgur.com/eiNY0MY.jpg')"];

// change this to display new feature
const newestFeature = 'labels'

export default class App extends Component {
  state = states

  constructor(props) {
    super(props)
    this.checkTime = checkTime.bind(this)
    this.onDragEnd = onDragEnd.bind(this)
    this.onDragStart = onDragStart.bind(this)
    this.itemInputChange = this.itemInputChange.bind(this)
    this.addItem = addItem.bind(this)
    this.checkItem = checkItem.bind(this)
    this.uncheckHabits = uncheckHabits.bind(this)
    this.settingsOpen = this.settingsOpen.bind(this)
    this.settingsClose = this.settingsClose.bind(this)
    this.statisticsOpen = this.statisticsOpen.bind(this)
    this.statisticsClose = this.statisticsClose.bind(this)
    this.handleChangeInfoPage = this.handleChangeInfoPage.bind(this)
    this.queryLocalStorage = queryLocalStorage.bind(this)
    this.handleChangeBackground = handleChangeBackground.bind(this)
    this.toggleInformation = this.toggleInformation.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.claimColor = this.claimColor.bind(this)
    this.closeNewFeature = this.closeNewFeature.bind(this)
  }

  // i dont know why i didnt just write one toggle function
  settingsOpen(){this.setState({settings: true})}
  settingsClose(){this.setState({settings:false})}
  statisticsOpen(){this.setState({statistics: true})}
  statisticsClose(){this.setState({statistics:false})}
  
  toggleInformation(){
    // if first time using Ameyo and closed
    if (JSON.parse(localStorage.getItem("showIntroduction")) == null){
      localStorage.setItem("showIntroduction", JSON.stringify(false))
      localStorage.setItem("newestFeature", newestFeature)
    }
    
    // if not first time and accessing info from settings
    this.setState({
      information: !this.state.information,
      settings: false,
      informationPage: 1
    })
  }

  componentDidMount() {    
    // update clock + time logic once in a while 
    this.intervalID = setInterval(() => this.checkTime(), 30000);
    setTimeout(() => this.checkTime(), 0)
    document.addEventListener("keydown", this.handleKeyDown)
    this.queryLocalStorage(() => {
      // set background image after checking localStorage
      if (window.navigator.onLine){
        document.body.style.backgroundImage = imageUrls[this.state.backgroundImageIndex]
      } else {
        document.body.style.backgroundImage = "url('./default.jpg')"
      }
    })
  }

  claimColor(color, name) {
    const newState = {
      ...this.state,
      colors: {
        ...this.state.colors,
        [color]: name,
      }
    }
    this.setState(newState, localStorage.setItem("colors", JSON.stringify(newState.colors)))
  }

  // keyboard shortcuts
  handleKeyDown(e) {
    if (document.activeElement.id.split("-")[0] === 'item'){
      if (e.keyCode === 13){
        this.checkItem(e)
      }
    }
    const setFocus = (el) => {
      document.getElementById(el).children[0].children[0].focus() 
      e.preventDefault()
    }
    // escape
    if (e.keyCode === 27){
      document.activeElement.blur()
      this.setState({
        settings: false,
        statistics: false
      })
    }
    if (document.activeElement.id === 'body'){
      switch(e.keyCode) {
        case 72: 
          setFocus('habits')
          break;
        case 84: 
          setFocus('today')
          break;
        case 66: 
          setFocus('backlog')
          break;
        case 89: 
          setFocus('yesterday')
          break;
        default: 
          break
      }
    }
  }

  // update state when form data changed
  itemInputChange(e){
    const newInputs = {
      ...this.state.inputs,
      [e.target.id.split("-")[0]]: e.target.value
    }
    this.setState({inputs: newInputs})
  }

  handleChangeInfoPage(next) {
    if (next === true){this.setState({informationPage: this.state.informationPage + 1})}
    else {this.setState({informationPage: this.state.informationPage - 1})}
  }

  closeNewFeature(){
    this.setState({newestFeature: newestFeature})
    localStorage.setItem('newestFeature', newestFeature)
  }

  render() {

    // set up for the countdown (this isn't working)
    let minutesLeft = 59 - this.state.date.getMinutes();
    let hoursLeft = 23 - this.state.date.getHours();

    let plurals = ['','']
    if (hoursLeft > 1) {plurals[0] = 's'}
    if (minutesLeft > 1) {plurals[1] = 's'}

    // show newest feature if state is not like newestFeature 

    const columnVisibility = ((this.state.settings || this.state.statistics || this.state.information || this.state.newestFeature !== newestFeature) ? 'd-none' : 'd-flex')
    
    return (
      <>
        { // conditionally render new feature screen
        (this.state.newestFeature !== newestFeature && this.state.information === false) 
          && <NewScreen handleClose={this.closeNewFeature} newestFeature={newestFeature}/>
        }
        
        { // conditionally render settings
          this.state.settings && <Settings settingsClose={this.settingsClose} onClick={this.settingsOpen} toggleInformation={this.toggleInformation}/>
        } 
        
        { // conditionally render information
          this.state.information && <Information 
            informationState={this.state.information}
            toggleInformation={this.toggleInformation}
            handleChangeInfoPage={this.handleChangeInfoPage}
            page={this.state.informationPage}
            avoidNewFeature={this.closeNewFeature}
          />
        }

        { // conditionally render statistics
          this.state.statistics && <Statistics 
            statisticsClose={this.statisticsClose}
            onClick={this.statisticsOpen}
            monthlyHabitsCount={this.state.monthlyHabitsCount}
          />
        }

        <DragDropContext onDragEnd={this.onDragEnd} onBeforeCapture={this.onDragStart}>
          <div className={"columns " + columnVisibility}>
            <div className="inner-container">
            {this.state.columnOrder.map((columnId) => {
              const column = this.state.columns[columnId];
              const items = column.itemIds.map(itemId => this.state.items[itemId])
              return <Column 
                        key={column.id}
                        column={column} 
                        items={items} 
                        checkItem={this.checkItem} 
                        itemInputChange={this.itemInputChange} 
                        addItem={this.addItem} 
                        inputs={this.state.inputs} 
                        deletable={this.state.deletable} 
                        type={column.type ? column.type : 'none'}
                        hover={this.state.hover}
                        colors={this.state.colors}
                        claimColor={this.claimColor}
                      />
            })}
            </div>
            <div className="outer-footer d-flex text-center">
              <div className="col footer-item clickable" onClick={this.settingsOpen}><p><span role="img" aria-label="gear">⚙️</span> Settings</p></div>
              <div className="col-auto m-auto" id="countdown"><p>{hoursLeft} {"hour" + plurals[0]} {minutesLeft} {"minute" + plurals[1]} remaining</p></div>
              <div className="col footer-item clickable" onClick={this.statisticsOpen}><p><span role="img" aria-label="chart">📈</span> Statistics</p></div>
            </div>
          </div>
        </DragDropContext>
      </>
    );
  }
}