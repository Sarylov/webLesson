// import data from "../../content/theme1.json";

let initialState = {
  themes: {},
  stateTest: {
    checkAsk: [],
    checkedId: [],
    quantityQsn: 0,
    btnFinishTest: true,
    testResult: '',
    ask: '',
    isShowBigImg: false
  },
  pathImg: 'img/1.jpg',
  preloaderStatus: ''
}

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_ASK':
      state.stateTest.ask = action.ask

      if (state.stateTest.ask.includes('<s>'))
        state.stateTest.checkAsk[action.name.replace('ask', '')] = true
      else state.stateTest.checkAsk[action.name.replace('ask', '')] = false

      state.stateTest.checkedId[action.name.replace('ask', '')] = action.id

      state.stateTest.quantityQsn = action.qty

      return state

    case 'GIVE_RESULT_TEST':
      let trueAsk = 0

      state.stateTest.btnFinishTest = false

      state.stateTest.checkAsk.forEach(ask => {
        if (ask === true) trueAsk++
      })

      state.stateTest.testResult =
        'правильных ответов: ' + trueAsk + ' из ' + state.stateTest.quantityQsn

      state.stateTest.ask = ''
      state.stateTest.checkedId = []

      return state

    case 'RESTART_TEST':
      state.stateTest.testResult = ''
      state.stateTest.checkAsk = []
      state.stateTest.btnFinishTest = true
      state.stateTest.checkedId = []

      return state

    case 'IMG_INCREASE_DISABLE':
      state.isShowBigImg = false
      return state

    case 'IMG_INCREASE_SHOW':
      state.isShowBigImg = true
      state.pathImg = action.src
      return state

    case 'FILL_CONTENT':
      function isEmptyObject(obj) {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            return false
          }
        }
        return true
      }

      // if (isEmptyObject(state.themes)) {
      state.themes = action.content
      console.log('hello')
      // }
      return state

    default:
      return state
  }
}

export default contentReducer
