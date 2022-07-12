import {EventActionEnum, SetErrorAction, SetEventsAction, SetGuestsAction, SetLoadingAction} from "./types";
import {IEvent} from "../../../models/IEvent";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
    setEvents: (events: IEvent[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload: events}),
    setGuests: (guests: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload: guests}),
    setLoading: (isLoading: boolean): SetLoadingAction => ({type: EventActionEnum.SET_LOADING, payload: isLoading}),
    setError: (error: string): SetErrorAction => ({type: EventActionEnum.SET_ERROR, payload: error}),
    getGuests: (): any  => (dispatch: AppDispatch) => {
        try {
            dispatch(EventActionCreators.setLoading(true))
            setTimeout(async () => {
                const response = await UserService.getUsers()
                const guests = response.data

                dispatch(EventActionCreators.setGuests(guests))
                dispatch(EventActionCreators.setLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(EventActionCreators.setError('Не удалось загрузить гостей'))
        }
    },
    createEvent: (event: IEvent, username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvents = json.filter(event => event.author === username || event.guest === username)
            currentUserEvents.push(event)

            dispatch(EventActionCreators.setEvents(currentUserEvents))
            localStorage.setItem("events", JSON.stringify(currentUserEvents))
        } catch (e) {
            console.log(e)
        }
    },
    getEvents: (username: string): any => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventActionCreators.setLoading(true))
            setTimeout(async () => {
                const events = localStorage.getItem("events") || '[]'
                const json = JSON.parse(events) as IEvent[]
                const currentUserEvents = json.filter(event => event.author === username || event.guest === username)

                dispatch(EventActionCreators.setEvents(currentUserEvents))
                dispatch(EventActionCreators.setLoading(false))
            }, 1000)
        } catch (e) {
            console.log(e)
        }
    }
}