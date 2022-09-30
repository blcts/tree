import React from 'react';
import { Tree } from '../../types/Tree';

interface Props {
  branchId: string,
  numberOfKids: number,
  onSetIsEditorOpen: (v:boolean) => void,
  isEditorOpen: boolean,
  onSetIsCMenuOpen: (v:boolean) => void,
  isCMenuOpen: boolean,
  onSetBranches: (v: Tree[]) => void,
  branches: Tree[],
}

export const ContextMenu: React.FC<Props> = (props) => {
  const { 
    branchId,
    numberOfKids,
    onSetIsEditorOpen,
    onSetIsCMenuOpen,
    branches,
    onSetBranches,
  } = props;

  const selectedBranch = branches.find(branch => branch.id === branchId) as Tree;

  const deleteBranch = (id: string) => {
    const findedBranch = branches.find(branch => branch.id === id);

    if (findedBranch !== undefined) {
      findedBranch.childId.length > 0 
        ? findedBranch.childId.map( childByID => deleteBranch(childByID))
        : onSetBranches(branches.filter(branch => branch.id !== id))
    }
  };

  const handleOnRename = () => {
    onSetIsCMenuOpen(false)
    onSetIsEditorOpen(true)
  };

  const handleOnAdd = () => {
    onSetIsCMenuOpen(false)
    const newBranch = {
      id: `${branchId}-${numberOfKids + 1}`,
      name: `cat-${numberOfKids + 1}`,
      parentId: `${branchId}`,
      childId: []
    };

    selectedBranch.childId = [...selectedBranch.childId, newBranch.id]
    onSetBranches([...branches, newBranch])
  };

  const handleOnDelete = () => {
    onSetIsCMenuOpen(false)
    deleteBranch(selectedBranch.id)
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <ul className="menu-list">
          <li>
            <button
              type="button"
              data-cy="RenameBranchName"
              onClick={() => (handleOnRename())}
            >
              Rename
            </button>
          </li>

          <li>
            <button
              type="button"
              data-cy="AddBranchSubcategory"
              onClick={() => (handleOnAdd())}
            >
              Add
            </button>
          </li>

          <li>
            <button
              type="button"
              data-cy="DeleteBranch"
              onClick={() => (handleOnDelete())}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}