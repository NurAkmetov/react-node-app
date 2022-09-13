import * as React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useQueryClient} from 'react-query';
import {useDeleteItem, useGetItem} from '../../hooks';
import {useStores} from "../../stores/store";
import { format } from 'date-fns';
import {RouteCategory} from "../../models/routeCategory";
import {Button} from '../controls/Button';
import {Header} from "../controls/Header";
import {Confirm} from "../controls/Confirm";
import styles from '../../styles/Item.module.scss';

interface IProps {
    readonly className?: string;
}

const RouteCategoryItemInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const routeCategory = useGetItem(id, RouteCategory);
    const deleteRouteCategory = useDeleteItem(RouteCategory);
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = React.useState(false);

    const {networkStore} = useStores();

    React.useEffect(() => {
        networkStore.setLoading(routeCategory.isLoading);
    }, [routeCategory.isLoading]);

    const handleClickOnDelete = () => {
        setShowModal(true);
    };

    const handleClickOnCancel = () => {
        setShowModal(false);
    };

    const onConfirmDelete = (id: number | undefined) => {
        if (typeof (id) !== 'undefined') {
            deleteRouteCategory.delete(id, {
                onSuccess: () => {
                    setShowModal(false);
                    queryClient.removeQueries();
                    history.push('/routeCategories/');
                }
            });
        }
    }

    if (!routeCategory.item) {
        return null;
    }

    return (
        <div ref={ref} className={props.className}>
            <div ref={ref} className={styles.item}>
                <Header title={routeCategory.item?.name}/>
                <div className={styles.container}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Идентификтор</td>
                            <td>{routeCategory.item.id}</td>
                        </tr>
                        <tr>
                            <td>Название</td>
                            <td>{routeCategory.item.name}</td>
                        </tr>
                        <tr>
                            <td>Дата создания</td>
                            <td>{format(new Date(routeCategory.item.createdAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        <tr>
                            <td>Дата обновления</td>
                            <td>{format(new Date(routeCategory.item.updatedAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={styles.buttons}>
                        <Button state='primary' onClick={() => history.push(`/routeCategories/update/${routeCategory.item?.id}`)}>
                            Изменить
                        </Button>
                        <Button state='secondary' onClick={handleClickOnDelete}>
                            Удалить
                        </Button>
                    </div>
                    <Confirm showModal={showModal}
                             message='Удалить?'
                             onCancelClick={handleClickOnCancel}
                             onConfirmClick={() => onConfirmDelete(routeCategory.item?.id)}/>
                </div>
            </div>
        </div>
    );
}

export const RouteCategoryItem = React.forwardRef(RouteCategoryItemInner);
