import React, {  FC } from 'react';
import { Tree } from '../types/Tree';
import { Branch } from './branch';

interface Props {
  mainTrees: Tree[],
  branches: Tree[],
  setBranches: React.Dispatch<React.SetStateAction<Tree[]>>,
}
export const TreesMain: FC <Props> = (props) => {
  const { branches, setBranches, mainTrees } = props;

  return (
    <section className="menu" data-cy="TreeList">
      <div className="content menu-list">
        <ul className='menu'>
          {mainTrees.map(tree => (
            <div key={tree.id}>
              <li className='menu-list'>
                <Branch 
                  branch={tree} 
                  mainTree={mainTrees}
                  branches={branches}
                  onSetBranches={setBranches}
                />
              </li>
            </div>
          ))}
        </ul>
      </div>
    </section>
  )
};
