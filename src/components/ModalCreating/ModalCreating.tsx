import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import { Tree } from '../../types/Tree';

interface Props {
  mainTrees: Tree[],
  onSetMainTrees: (v: Tree[]) => void;
  onSetIsModalOpen: (v: boolean) => void;
}

export const ModalCreating: React.FC<Props> = (props) => {
  const { mainTrees, onSetMainTrees, onSetIsModalOpen } = props;
  const [name, setName] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const id = mainTrees.length > 0 
    ? `${mainTrees.length + 1}`
    : '1'

    const newMainTree: Tree = {
      id: id,
      name,
      childId: []
    };

    onSetMainTrees([...mainTrees, newMainTree])
    onSetIsModalOpen(false);
    setName('');
  }

  return (
    <div className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <form
          onSubmit={handleSubmit}
        >
          <input
            data-cy="NewTreeField"
            type="text"
            // ref={newTreeField}
            className="input is-rounded treeapp__new-tree"
            placeholder="How do you want to call it?"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button 
            type="submit"
            className="button is-success"
          >
            Create
          </button>

          <button className="button">Cancel</button>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
}