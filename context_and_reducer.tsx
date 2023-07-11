import { ChangeEvent, Children, ReactElement, createContext, 
  useCallback, useContext, useReducer 
} from "react"

//============= INITIAL STATE ==============
type StateType = {
  counter: number;
  text: string;
}
const initialState = {
  counter : 0,
  text : ''
}

//============= REDUCER ==============
type ReducerAction = {
  type: number, // REDUCER_ACTION_TYPE,
  payload?: string 
}

function reducer(state: StateType, action: ReducerAction): StateType {
  switch(action.type) {
    case 1 : //REDUCER_ACTION_TYPE.INCREMENT :
      return {...state, counter : state.counter++}
    case 2 : //REDUCER_ACTION_TYPE.DECREMENT : 
      return {...state, counter : state.counter--}
    case 3 : //REDUCER_ACTION_TYPE.RESET :
      return {...state, text : '', counter: 0}
    case 4 : //REDUCER_ACTION_TYPE.INPUT : 
      return {...state, text : action.payload || ''}
    default :
      throw new Error('Just an error =)')
  }
}

//============= HOOKS ==============
function useCounterContext (initState: StateType) {
  const [state, dispatch] = useReducer(reducer, initState)

  const increment = useCallback(() => {
    dispatch({type: 1})
  }, [])

  const decrement = useCallback(() => {
    dispatch({type: 2})
  }, [])
  const reset = useCallback(() => {
    dispatch({type: 3})
  }, [])
  const input = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({type: 4, payload : e.target.value})
  }, [])

  return {state, increment, decrement, reset, input}
}

type CounterType = {
  counter : number
}
type UseCounterHookType = Pick<ReturnType <typeof useCounterContext>, 'decrement' | 'increment'>

function useCounter(): UseCounterHookType & CounterType{
  const {state : {counter}, increment, decrement} = useContext(CounterContext)
  return { counter, increment, decrement }
}

type TextType = {
  text : string
}
type UseTextHookType = Pick<ReturnType <typeof useCounterContext>, 'input' | 'reset'>

function useCounterText(): UseTextHookType & TextType{
  const {state : {text}, input, reset} = useContext(CounterContext)
  return { text, input, reset}
}

//============= CONTEXT ==============
type CounterContextType = ReturnType<typeof useCounterContext>
const initContextState = {
  state: initialState,
  increment: () => { },
  decrement: () => { },
  reset: () => { },
  input: (e: ChangeEvent<HTMLInputElement>) => { },
}
type Children = {
  children : ReactElement | ReactElement[] | undefined
}
const CounterContext = createContext<CounterContextType>(initContextState)

const CounterProvider = ({children}: Children): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initialState)}>
      {children}
    </CounterContext.Provider>
  )
}

//======== COMPONENT ==========
const CounterText = () =>{
  const { text, input, reset } = useCounterText()

  return (
    <div className="text">
      <button onClick={reset}></button>
      <input type="text" onChange={input} />
      <output>{text}</output>
    </div>
  );
}
const CounterCount = () =>{
  const { counter, increment, decrement } = useCounter()

  return (
    <div className="counter">
      <h1>{counter}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

function Counter() {
  return (
    <div className="wrapper">
      <CounterCount />
      <CounterText />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </div>
  );
}

export default App