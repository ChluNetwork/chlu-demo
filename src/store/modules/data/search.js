import { createAction, handleActions } from 'redux-actions'
import { searchProfiles } from 'helpers/profileProvider'
import { isEqual } from 'lodash';

const SEARCH_LOADING = 'search/LOADING'
const SEARCH_SUCCESS = 'search/SUCCESS'
const SEARCH_ERROR = 'search/ERROR'
const SEARCH_CLEAR = 'search/CLEAR'
const NEXT_PAGE = 'search/PAGE_NEXT'
const PREV_PAGE = 'search/PAGE_PREV'
const SET_QUERY = 'search/SET_QUERY'
const SET_PAGE = 'search/SET_PAGE'
export const ITEMS_PER_PAGE = 5

const searchLoading = createAction(SEARCH_LOADING)
const searchSuccess = createAction(SEARCH_SUCCESS)
const searchError = createAction(SEARCH_ERROR)
export const setQuery = createAction(SET_QUERY)
export const setPage = createAction(SET_PAGE)
export const clearSearch = createAction(SEARCH_CLEAR)

function getInitialState() {
  return {
    loading: false,
    query: null,
    error: null,
    results: null,
    page: 0
  }
}

export function search() {
  return async (dispatch, getState) => {
    try {
      const state = getState().data.search
      const query = state.query || {}
      console.log(query)
      dispatch(searchLoading(query))
      const page = state.page
      const limit = ITEMS_PER_PAGE
      const offset = page * ITEMS_PER_PAGE
      const results = await searchProfiles(query, limit, offset)
      console.log(results)
      dispatch(searchSuccess(results))
    } catch (error) {
      console.log(error)
      dispatch(searchError(error.message || error))
    }
  }
}


export default handleActions({
  [SET_QUERY]: (state, { payload: query }) => ({ ...state, query }),
  [SET_PAGE]: (state, { payload: page }) => ({ ...state, page }),
  [SEARCH_LOADING]: (state, { payload: query }) => {
    let page = state.page
    if (!isEqual(state.query, query)) page = 0
    return { ...state, page, loading: true, query, error: null }
  },
  [SEARCH_SUCCESS]: (state, { payload: results }) => {
    return { ...state, pages: Math.floor(results.count/ITEMS_PER_PAGE), loading: false, error: null, results }
  },
  [SEARCH_ERROR]: (state, { payload: error }) => ({ ...state, loading: false, error }),
  [SEARCH_CLEAR]: getInitialState,
  [NEXT_PAGE]: state => ({ ...state, page: state.page + 1 }), // Check total pages
  [PREV_PAGE]: state => ({ ...state, page: state.page - 1 }) // Check total pages
}, getInitialState())