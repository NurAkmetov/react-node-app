import React from 'react';
import classNames from 'classnames';
import {Route, Switch} from "react-router-dom";
import {AgencyList} from '../agencies/AgencyList';
import {AgencyItem} from '../agencies/Agency';
import {AgencyUpdate} from '../agencies/AgencyUpdate';
import {AgencyCreate} from '../agencies/AgencyCreate';
import {RouteCategoryCreate} from "../routeCategories/RouteCategoryCreate";
import {RouteCategoryItem} from "../routeCategories/RouteCategory";
import {RouteCategoryList} from "../routeCategories/RouteCategoryList";
import {RouteCategoryUpdate} from "../routeCategories/RouteCategoryUpdate";
import {StopUpdate} from "../stops/StopUpdate";
import {StopList} from "../stops/StopList";
import {StopItem} from "../stops/Stop";
import {StopCreate} from "../stops/StopCreate";
import {VehicleTypeList} from "../vehicleTypes/VehicleTypeList";
import {VehicleTypeItem} from "../vehicleTypes/VehicleType";
import {VehicleTypeCreate} from "../vehicleTypes/VehicleTypeCreate";
import {VehicleTypeUpdate} from "../vehicleTypes/VehicleTypeUpdate";
import {RouteItem} from "../routes/Route";
import {RouteList} from "../routes/RouteList";
import {RouteCreate} from "../routes/RouteCreate";
import {RouteUpdate} from "../routes/RouteUpdate";
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
                <Route exact path='/routeCategories' component={RouteCategoryList}/>
                <Route exact path='/routeCategories/info/:id' component={RouteCategoryItem}/>
                <Route exact path='/routeCategories/create' component={RouteCategoryCreate}/>
                <Route exact path='/routeCategories/update/:id' component={RouteCategoryUpdate}/>
                <Route exact path='/stops' component={StopList}/>
                <Route exact path='/stops/info/:id' component={StopItem}/>
                <Route exact path='/stops/create' component={StopCreate}/>
                <Route exact path='/stops/update/:id' component={StopUpdate}/>
                <Route exact path='/vehicleTypes' component={VehicleTypeList}/>
                <Route exact path='/vehicleTypes/info/:id' component={VehicleTypeItem}/>
                <Route exact path='/vehicleTypes/create' component={VehicleTypeCreate}/>
                <Route exact path='/vehicleTypes/update/:id' component={VehicleTypeUpdate}/>
                <Route exact path='/routes' component={RouteList}/>
                <Route exact path='/routes/info/:id' component={RouteItem}/>
                <Route exact path='/routes/create' component={RouteCreate}/>
                <Route exact path='/routes/update/:id' component={RouteUpdate}/>
            </Switch>
        </main>
    );
}

export const Main = MainInner;
