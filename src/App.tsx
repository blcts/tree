import React, { useState } from 'react';
import { ModalCreating } from './components/ModalCreating/ModalCreating';
import { TreesMain } from './components/TreesMain';
import { Tree } from './types/Tree';


export const App: React.FC = () => {
  const [mainTrees, setMainTrees] = useState<Tree[]>([]);
  const [branches, setBranches] = useState<Tree[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return ( 
    <div className="
      is-flex
      is-justify-content-center
      is-flex-direction-column
    ">
      <h1 className="
        is-flex
        is-justify-content-center
        is-size-1
        my-4
      "> 
        Trees
      </h1>

      <button 
        className="
          button 
          is-warning
          has-background-primary-light
          is-size-4
        "
        type="button"
        onClick={() => setIsModalOpen(true)}
      > 
        Click here to create a new tree
      </button>

      {isModalOpen
      ? < ModalCreating 
          mainTrees={mainTrees} 
          onSetMainTrees={setMainTrees}
          branches={branches}
          setBranches={setBranches}
          onSetIsModalOpen={setIsModalOpen}
        />
      : <div >
          {branches
            ? < TreesMain 
                branches={branches}
                setBranches={setBranches}
                mainTrees={mainTrees}
              />
            : <h2> No trees </h2>
          }
        </div>
      }
    </div>
  );
};
