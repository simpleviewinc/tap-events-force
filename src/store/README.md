# SessionsStore
* uses `useReducer` to setup the sessions store 
* use in place of redux for when we want to export `sessionsComponent` as a standalone component

### Usage in actions
* Import the `dispatch` from `'store/sessionsStore'` instead of `SVStore`
```Javascript
// import { dispatch } from 'SVStore'
import { dispatch } from '../../store/sessionsStore'
```
* **Note:**
    * This will later be updated so that SVStore will automatically point to `store/sessionsStore` on a component export 