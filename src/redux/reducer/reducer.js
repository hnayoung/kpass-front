// 리듀서 함수
let initialState = {
    searchList: []
};

function searchReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SEARCH_LIST':  // 예시 액션 타입
            return {
                ...state,
                searchList: action.payload
            };
        default:
            return state;
    }
}

export default searchReducer;
