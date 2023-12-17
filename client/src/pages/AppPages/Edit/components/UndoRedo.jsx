import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';

const UndoRedo = () => {
	const dispatch = useDispatch();

    const { past, future } = useSelector((state) => state.map);

    const canUndo = past.length > 0;
    const canRedo = future.length > 0;

    return [
        <button key={'undo'} disabled={!canUndo} className="px-1 disabled:opacity-20 hover:bg-gray-200 rounded-full w-6" onClick={() => dispatch(ActionCreators.undo())}>
            <i className="fa-solid fa-rotate-left"></i>
        </button>,
        <button  key={'redo'} disabled={!canRedo} className="px-1 disabled:opacity-20 hover:bg-gray-200 rounded-full w-6" onClick={() => dispatch(ActionCreators.redo())}>
            <i className="fa-solid fa-rotate-right"></i>
        </button>,
    ];
};

export default UndoRedo;
