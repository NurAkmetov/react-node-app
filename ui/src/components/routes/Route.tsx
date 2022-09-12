import * as React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useQueryClient} from 'react-query';
import {useDeleteItem, useGetItem} from '../../hooks';
import { format } from 'date-fns';
import {Route} from "../../models/route";
import {Button} from '../controls/Button';
import {Header} from "../controls/Header";
import {Confirm} from "../controls/Confirm";
import styles from '../../styles/Item.module.scss';

interface IProps {
    readonly className?: string;
}

const RouteItemInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const route = useGetItem(id, Route);
    const deleteRoute = useDeleteItem(Route);
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = React.useState(false);

    const handleClickOnDelete = () => {
        setShowModal(true);
    };

    const handleClickOnCancel = () => {
        setShowModal(false);
    };

    const onConfirmDelete = (id: number | undefined) => {
        if (typeof (id) !== 'undefined') {
            deleteRoute.delete(id, {
                onSuccess: () => {
                    setShowModal(false);
                    queryClient.removeQueries();
                    history.push('/routes/');
                }
            });
        }
    }

    if (!route.item) {
        return null;
    }

    return (
        <div ref={ref} className={props.className}>
            <div ref={ref} className={styles.item}>
                <Header title={route.item?.name}/>
                <div className={styles.container}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Идентификтор</td>
                            <td>{route.item.id}</td>
                        </tr>
                        <tr>
                            <td>Название</td>
                            <td>{route.item.name}</td>
                        </tr>
                        <tr>
                            <td>Расстояние</td>
                            <td>{route.item.distance}</td>
                        </tr>
                        <tr>
                            <td>Направление</td>
                            <td>{route.item.direction}</td>
                        </tr>
                        <tr>
                            <td>Тип ПЕ</td>
                            <td>{route.item.vehicleType?.name ? route.item.vehicleType.name : ''}</td>
                        </tr>
                        <tr>
                            <td>Перевозчик</td>
                            <td>{route.item.agency?.name ? route.item.agency.name : ''}</td>
                        </tr>
                        <tr>
                            <td>Категория</td>
                            <td>{route.item.routeCategory?.name ? route.item.routeCategory.name : ''}</td>
                        </tr>
                        <tr>
                            <td>Дата создания</td>
                            <td>{format(new Date(route.item.createdAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        <tr>
                            <td>Дата обновления</td>
                            <td>{format(new Date(route.item.updatedAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={styles.buttons}>
                        <Button state='primary' onClick={() => history.push(`/routes/update/${route.item?.id}`)}>
                            Изменить
                        </Button>
                        <Button state='secondary' onClick={handleClickOnDelete}>
                            Удалить
                        </Button>
                    </div>
                    <Confirm showModal={showModal}
                             message='Удалить?'
                             onCancelClick={handleClickOnCancel}
                             onConfirmClick={() => onConfirmDelete(route.item?.id)}/>
                </div>
            </div>
        </div>
    );
}

export const RouteItem = React.forwardRef(RouteItemInner);
