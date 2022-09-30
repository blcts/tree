import React, { useState } from 'react';
import { ModalCreating } from './components/ModalCreating/ModalCreating';
import { TreesMain } from './components/TreesMain';
import { Tree } from './types/Tree';


export const App: React.FC = () => {
  const [mainTrees, setMainTrees] = useState<Tree[]>([]);
  const [branches, setBranches] = useState<Tree[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return ( 
    <div className="treesapp">
      <h1 className="treesapp__title"> Trees </h1>

      <button 
        className="button is-warning"
        onClick={() => setIsModalOpen(true)}
      > 
        Create new tree
      </button>

      {isModalOpen
      ? < ModalCreating 
          mainTrees={mainTrees} 
          onSetMainTrees={setMainTrees}
          onSetIsModalOpen={setIsModalOpen}
        />
      : <div className="treesapp__content">
          {mainTrees
            ? < TreesMain 
                mainTrees={mainTrees}
                branches={branches}
                onSetBranches={setBranches}
              />
            : <h2 className="treesapp__description"> No trees </h2>
          }
        </div>
      }
    </div>
  );
};
