import React, { FormEvent, useState } from 'react';
import { Tree } from '../../types/Tree';

interface Props {
  mainTrees: Tree[],
  onSetMainTrees: (v: Tree[]) => void;
  onSetIsModalOpen: (v: boolean) => void;
  branches:Tree[],
  setBranches: (v:Tree[]) => void
}

export const ModalCreating: React.FC<Props> = (props) => {
  const { 
    mainTrees,
    onSetMainTrees,
    onSetIsModalOpen,
    branches, 
    setBranches,
  } = props;

  const [name, setName] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    const id = mainTrees.length > 0 
    ? `cat-${mainTrees.length + 1}`
    : 'cat-1'

    const newMainTree: Tree = {
      id: id,
      name: name || id,
      childId: []
    };

    const newMain: Tree = {
      id: '1',
      name: `name`,
      childId: []
    };
    
    onSetMainTrees([...mainTrees, newMainTree]);
    setBranches([...branches, newMain]);
    onSetIsModalOpen(false);
    setName('');
  };

  return (
    <div className="modal" style={{display: 'flex'}}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <form
          onSubmit={handleSubmit}
        >
          <input
            data-cy="NewTreeField"
            type="text"
            className="input is-rounded treeapp__new-tree"
            placeholder="How do you want to call it?"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button 
            type="submit"
            className="button is-success mt-5 ml-3 mr-4"
          >
            Create
          </button>

          <button 
            className="button mt-5"
            type="button"
            onClick={() => onSetIsModalOpen(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}