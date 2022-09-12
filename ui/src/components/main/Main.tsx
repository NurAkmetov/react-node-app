import React from 'react';
import classNames from 'classnames';
import {Route, Switch} from "react-router-dom";
import {AgencyList} from '../agencies/AgencyList';
import {AgencyItem} from '../agencies/Agency';
import {AgencyUpdate} from '../agencies/AgencyUpdate';
import {AgencyCreate} from '../agencies/AgencyCreate';
import styles from './Main.module.scss';

interface IProps {
    readonly className?: string;
}

const MainInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props) => {
    return (
        <main className={classNames(styles['main'], props.className)}>
            <Switch>
                <Route exact path='/agencies' component={AgencyList}/>
                <Route exact path='/agencies/info/:id' component={AgencyItem}/>
                <Route exact path='/agencies/create' component={AgencyCreate}/>
                <Route exact path='/agencies/update/:id' component={AgencyUpdate}/>
            </Switch>
        </main>
    );
}

export const Main = MainInner;
