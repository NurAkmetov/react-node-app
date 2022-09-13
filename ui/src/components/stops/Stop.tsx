import * as React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useQueryClient} from 'react-query';
import {useDeleteItem, useGetItem} from '../../hooks';
import {useStores} from "../../stores/store";
import { format } from 'date-fns';
import {Stop} from "../../models/stop";
import {Button} from '../controls/Button';
import {Header} from "../controls/Header";
import {Confirm} from "../controls/Confirm";
import styles from '../../styles/Item.module.scss';

interface IProps {
    readonly className?: string;
}

const StopItemInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const stop = useGetItem(id, Stop);
    const deleteStop = useDeleteItem(Stop);
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = React.useState(false);

    const {networkStore} = useStores();

    React.useEffect(() => {
        networkStore.setLoading(stop.isLoading);
    }, [stop.isLoading]);

    const handleClickOnDelete = () => {
        setShowModal(true);
    };

    const handleClickOnCancel = () => {
        setShowModal(false);
    };

    const onConfirmDelete = (id: number | undefined) => {
        if (typeof (id) !== 'undefined') {
            deleteStop.delete(id, {
                onSuccess: () => {
                    setShowModal(false);
                    queryClient.removeQueries();
                    history.push('/stops/');
                }
            });
        }
    }

    if (!stop.item) {
        return null;
    }

    return (
        <div ref={ref} className={props.className}>
            <div ref={ref} className={styles.item}>
                <Header title={stop.item?.name}/>
                <div className={styles.container}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Идентификтор</td>
                            <td>{stop.item.id}</td>
                        </tr>
                        <tr>
                            <td>Название</td>
                            <td>{stop.item.name}</td>
                        </tr>
                        <tr>
                            <td>Маршрут</td>
                            <td>{stop.item.route?.name ? stop.item.route.name : ''}</td>
                        </tr>
                        <tr>
                            <td>Дата создания</td>
                            <td>{format(new Date(stop.item.createdAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        <tr>
                            <td>Дата обновления</td>
                            <td>{format(new Date(stop.item.updatedAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={styles.buttons}>
                        <Button state='primary' onClick={() => history.push(`/stops/update/${stop.item?.id}`)}>
                            Изменить
                        </Button>
                        <Button state='secondary' onClick={handleClickOnDelete}>
                            Удалить
                        </Button>
                    </div>
                    <Confirm showModal={showModal}
                             message='Удалить?'
                             onCancelClick={handleClickOnCancel}
                             onConfirmClick={() => onConfirmDelete(stop.item?.id)}/>
                </div>
            </div>
        </div>
    );
}

export const StopItem = React.forwardRef(StopItemInner);
