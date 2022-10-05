import React from 'react';
import { Tree } from '../../types/Tree';

interface Props {
  tree: Tree,
  onSetIsEditorOpen: (v:boolean) => void,
  isEditorOpen: boolean,
  onSetIsCMenuOpen: (v:boolean) => void,
  onSetBranches: React.Dispatch<React.SetStateAction<Tree[]>>
  branches: Tree[],
}

export const ContextMenu: React.FC<Props> = (props) => {
  const { 
    tree,
    onSetIsEditorOpen,
    onSetIsCMenuOpen,
    onSetBranches,
    branches,
  } = props;
  
  const selectedBranch = branches.filter(branch => branch.id === tree.id)[0];
  
  const deleteChildBranches = (id: string) => {
    const findedBranch = branches.find(branch => branch.id === id);
    
    if (findedBranch && findedBranch.childId.length > 0) {
      findedBranch.childId.forEach(branchById => deleteChildBranches(branchById))
    };
    onSetBranches((prev) => prev.filter(branch => branch.id !== findedBranch?.id));
  };

  const handleOnRename = () => {
    onSetIsCMenuOpen(false);
    onSetIsEditorOpen(true);
  };

  const handleOnAdd = () => {
    onSetIsCMenuOpen(false);

    const newBranch = {
      id: `${tree.id}-${tree.childId.length + 1}`,
      name: `${tree.id}-${tree.childId.length + 1}`,
      childId: []
    };    
  
    tree.childId = [...tree.childId, newBranch.id];
    onSetBranches([...branches, newBranch]);
  };

  const handleOnDelete = () => {
    onSetIsCMenuOpen(false);
    onSetBranches(branches.filter(branch => branch.id !== selectedBranch.id));
    deleteChildBranches(selectedBranch.id);
  };

  return (
    <div className="buttons has-addons ml-3"
      style={{
        listStyle: 'none',
      }}
    >
      <button
        type="button"
        className='button is-success is-light mr-2'
        data-cy="RenameBranchName"
        onClick={() => (handleOnRename())}
      >
        Rename
      </button>

      <button
        type="button"
        className='button is-success is-light mr-2'
        data-cy="AddBranchSubcategory"
        onClick={() => (handleOnAdd())}
      >
        Add
      </button>

      <button
        type="button"
        className='button is-success is-light mr-2'
        data-cy="DeleteBranch"
        onClick={() => (handleOnDelete())}
      >
        Delete
      </button>
    </div>
  );
};