export default function reducer(state, action){
    switch (action.type) {
        case 'IDK':
            return {
                state
            }
        case 'CHANGE_PAGE':
            console.log(action.payload)
            return {
                ...state,
                currentPage: action.payload,
            }
        default:
            return state
    }
}