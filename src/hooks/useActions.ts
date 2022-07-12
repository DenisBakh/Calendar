import {useAppDispatch} from "./useTypeSelectorDispatch";
import {bindActionCreators} from "redux";
import {allActionsCreators} from "../store/reducers/action-creators";

export const useActions = () => {
    const dispatch = useAppDispatch()
    return bindActionCreators(allActionsCreators, dispatch)
}