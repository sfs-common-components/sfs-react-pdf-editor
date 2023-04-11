import { useReducer, useCallback } from 'react';
var ActionType;
(function (ActionType) {
  ActionType['RESET'] = 'RESET';
  ActionType['ADD_ATTACHMENT'] = 'ADD_ATTACHMENT';
  ActionType['REMOVE_ATTACHMENT'] = 'REMOVE_ATTACHMENT';
  ActionType['UPDATE_ATTACHMENT'] = 'UPDATE_ATTACHMENT';
  ActionType['UPDATE_PAGE_INDEX'] = 'UPDATE_PAGE_INDEX';
})(ActionType || (ActionType = {}));
const initialState = {
  pageIndex: -1,
  allPageAttachments: [],
  pageAttachments: [],
};
const reducer = (state, action) => {
  const { pageIndex, allPageAttachments, pageAttachments } = state;
  switch (action.type) {
    case ActionType.ADD_ATTACHMENT: {
      const newAllPageAttachmentsAdd = allPageAttachments.map(
        (attachments, index) =>
          pageIndex === index
            ? [...attachments, action.attachment]
            : attachments
      );
      return {
        ...state,
        allPageAttachments: newAllPageAttachmentsAdd,
        pageAttachments: newAllPageAttachmentsAdd[pageIndex],
      };
    }
    case ActionType.REMOVE_ATTACHMENT: {
      const newAllPageAttachmentsRemove = allPageAttachments.map(
        (otherPageAttachments, index) =>
          pageIndex === index
            ? pageAttachments.filter(
                (_, _attachmentIndex) =>
                  _attachmentIndex !== action.attachmentIndex
              )
            : otherPageAttachments
      );
      return {
        ...state,
        allPageAttachments: newAllPageAttachmentsRemove,
        pageAttachments: newAllPageAttachmentsRemove[pageIndex],
      };
    }
    case ActionType.UPDATE_ATTACHMENT: {
      debugger;
      if (pageIndex === -1) {
        return state;
      }
      const newAllPageAttachmentsUpdate = allPageAttachments.map(
        (otherPageAttachments, index) =>
          pageIndex === index
            ? pageAttachments.map((oldAttachment, _attachmentIndex) =>
                _attachmentIndex === action.attachmentIndex
                  ? { ...oldAttachment, ...action.attachment }
                  : oldAttachment
              )
            : otherPageAttachments
      );
      return {
        ...state,
        allPageAttachments: newAllPageAttachmentsUpdate,
        pageAttachments: newAllPageAttachmentsUpdate[pageIndex],
      };
    }
    case ActionType.UPDATE_PAGE_INDEX: {
      debugger;
      return {
        ...state,
        pageIndex: action.pageIndex,
        pageAttachments: allPageAttachments[action.pageIndex],
      };
    }
    case ActionType.RESET: {
      return {
        pageIndex: 0,
        pageAttachments: [],
        allPageAttachments: Array(action.numberOfPages).fill([]),
      };
    }
    default: {
      return state;
    }
  }
};
export const useAttachments = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { allPageAttachments, pageAttachments } = state;
  const add = (newAttachment) =>
    dispatch({ type: ActionType.ADD_ATTACHMENT, attachment: newAttachment });
  const remove = (attachmentIndex) =>
    dispatch({ type: ActionType.REMOVE_ATTACHMENT, attachmentIndex });
  const update = (attachmentIndex, attachment) =>
    dispatch({
      type: ActionType.UPDATE_ATTACHMENT,
      attachmentIndex,
      attachment,
    });
  const reset = (numberOfPages) =>
    dispatch({ type: ActionType.RESET, numberOfPages });
  const setPageIndex = useCallback(
    (index) =>
      dispatch({ type: ActionType.UPDATE_PAGE_INDEX, pageIndex: index }),
    [dispatch]
  );
  return {
    add,
    reset,
    remove,
    update,
    setPageIndex,
    pageAttachments,
    allPageAttachments,
  };
};
