import * as React from 'react';
//import { useSelector } from 'react-redux';
//import { IAppState } from '../../state';
import classNames from 'classnames';
import styles from './ProgressBar.module.scss';

interface IProps {
    readonly className?: string;
}

//const ProgressBarInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
 //   const network = useSelector((state: IAppState) => state.network);

 //   return (
 //       network?.isLoading
 //           ? <div ref={ref} className={classNames(styles['progress-bar'], props.className)}></div>
 //           : null
 //   );
//}

//export const ProgressBar = React.forwardRef(ProgressBarInner);
