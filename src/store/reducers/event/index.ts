import {EventAction, EventActionEnum, IEventState} from "./types";

const initialState: IEventState = {
    guests: [],
    events: [],
    isLoading: false,
    error: ''
}

export default function eventReducer(state = initialState, action: EventAction): IEventState {
    switch (action.type) {
        case EventActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
            break
        case EventActionEnum.SET_EVENTS:
            return {...state, events: action.payload}
            break
        case EventActionEnum.SET_GUESTS:
            return {...state, guests: action.payload}
            break
        case EventActionEnum.SET_LOADING:
            return {...state, isLoading: false}
        default:
            return state
    }
}