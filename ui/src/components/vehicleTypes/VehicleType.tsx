import * as React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useQueryClient} from 'react-query';
import {useDeleteItem, useGetItem} from '../../hooks';
import {useStores} from "../../stores/store";
import { format } from 'date-fns';
import {VehicleType} from "../../models/vehicleType";
import {Button} from '../controls/Button';
import {Header} from "../controls/Header";
import {Confirm} from "../controls/Confirm";
import styles from '../../styles/Item.module.scss';

interface IProps {
    readonly className?: string;
}

const VehicleTypeItemInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const vehicleType = useGetItem(id, VehicleType);
    const deleteVehicleType = useDeleteItem(VehicleType);
    const queryClient = useQueryClient();

    const [showModal, setShowModal] = React.useState(false);

    const {networkStore} = useStores();

    React.useEffect(() => {
        networkStore.setLoading(vehicleType.isLoading);
    }, [vehicleType.isLoading]);

    const handleClickOnDelete = () => {
        setShowModal(true);
    };

    const handleClickOnCancel = () => {
        setShowModal(false);
    };

    const onConfirmDelete = (id: number | undefined) => {
        if (typeof (id) !== 'undefined') {
            deleteVehicleType.delete(id, {
                onSuccess: () => {
                    setShowModal(false);
                    queryClient.removeQueries();
                    history.push('/routeVehicleTypes/');
                }
            });
        }
    }

    if (!vehicleType.item) {
        return null;
    }

    return (
        <div ref={ref} className={props.className}>
            <div ref={ref} className={styles.item}>
                <Header title={vehicleType.item?.name}/>
                <div className={styles.container}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Идентификтор</td>
                            <td>{vehicleType.item.id}</td>
                        </tr>
                        <tr>
                            <td>Название</td>
                            <td>{vehicleType.item.name}</td>
                        </tr>
                        <tr>
                            <td>Стоимость</td>
                            <td>{vehicleType.item.price}</td>
                        </tr>
                        <tr>
                            <td>Дата создания</td>
                            <td>{format(new Date(vehicleType.item.createdAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        <tr>
                            <td>Дата обновления</td>
                            <td>{format(new Date(vehicleType.item.updatedAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={styles.buttons}>
                        <Button state='primary' onClick={() => history.push(`/vehicleTypes/update/${vehicleType.item?.id}`)}>
                            Изменить
                        </Button>
                        <Button state='secondary' onClick={handleClickOnDelete}>
                            Удалить
                        </Button>
                    </div>
                    <Confirm showModal={showModal}
                             message='Удалить?'
                             onCancelClick={handleClickOnCancel}
                             onConfirmClick={() => onConfirmDelete(vehicleType.item?.id)}/>
                </div>
            </div>
        </div>
    );
}

export const VehicleTypeItem = React.forwardRef(VehicleTypeItemInner);
