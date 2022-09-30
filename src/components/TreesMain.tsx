import React, {  FC, useState, FormEvent, useRef, useEffect } from 'react';
import { Tree } from '../types/Tree';
import { Branch } from './branch';
import { EditComponent } from './EditComponent';

interface Props {
  mainTrees: Tree[],
  onSetBranches: (v: Tree[]) => void,
  branches: Tree[],
}
export const TreesMain: FC <Props> = (props) => {
  const { mainTrees, onSetBranches, branches } = props;
  const [isShowKids, setIsShowKids] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editedBranchId, setEditedBranchId] = useState('');
  const [editedName, setEditedName] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }

    if (editedBranchId !== null) {
      const editedTree = mainTrees.filter(tree => tree.id === editedBranchId)[0];
      setEditedName(editedTree.name)
    }
  }, []);

  const editHandler = (event: FormEvent) => {
    event.preventDefault();

    const renamedBranch = branches.find(branch => branch.id === editedBranchId)

    if (renamedBranch !== undefined) {
        renamedBranch.name === editedName
          ? renamedBranch
          : renamedBranch.name = editedName
    }
    setIsEditorOpen(false);
  };

  return (
    <section className="treeapp__main" data-cy="TreeList">
      <div className="content">
        <ul>
          {mainTrees.map(tree => (
            <>
              <button
                type="button"
                className="tree__show"
                data-cy="TreeTogglerButton"
                onClick={() => (setIsShowKids(false))}
              >
                {isShowKids
                  ? '-'
                  : '+'
                }
              </button>

              <div
                data-cy="Tree"
                key={tree.id}
              >
                { isEditorOpen 
                  ? <EditComponent 
                      editHandler={editHandler} 
                      ref={ref} 
                      editedName={editedName} 
                      onSetEditedName={setEditedName}
                    />
                  : isShowKids && 
                    <li>
                      <Branch branch={tree} branches={branches}/>
                    </li>
                }
              </div>
            </>
          ))}
        </ul>
      </div>
    </section>
          // {/* {isLoading && todo.id === openedTodoId && <Loader />} */}
  )
};
