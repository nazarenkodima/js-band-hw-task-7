
// Actions
import { types } from './types';

// eslint-disable-next-line import/prefer-default-export
export const filtersActions = {
    updateTaskFilter: (text) => {
        return {
            type:    types.UPDATE_SEARCH_FILTER,
            payload: text,
        };
    },
}
;
