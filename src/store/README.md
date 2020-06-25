# SessionsStore
* uses `useReducer` to setup the sessions store 
* use in place of redux for when we want to export `sessionsComponent` as a standalone component

### Usage in actions
* Import the `dispatch` from either:
    * `SVStore` - dynamically gets the dispatch from redux store or sessions store based on context
        * `import { dispatch } from 'SVStore'`
    * `/store/sessionsStore` - pulls straight from sessionsStore
        * `import { dispatch } from '../../store/sessionsStore'`