import * as React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useQueryClient} from 'react-query';
import {useDeleteItem, useGetItem} from '../../hooks';
import {useStores} from "../../stores/store";
import {format} from 'date-fns';
import {Agency} from "../../models/agency";
import {Button} from '../controls/Button';
import {Header} from "../controls/Header";
import {Confirm} from "../controls/Confirm";
import styles from '../../styles/Item.module.scss';

interface IProps {
    readonly className?: string;
}

const AgencyItemInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const agency = useGetItem(id, Agency);
    const deleteAgency = useDeleteItem(Agency);
    const queryClient = useQueryClient();

    const {networkStore} = useStores();

    React.useEffect(() => {
        networkStore.setLoading(agency.isLoading);
    }, [agency.isLoading]);

    const [showModal, setShowModal] = React.useState(false);

    const handleClickOnDelete = () => {
        setShowModal(true);
    };

    const handleClickOnCancel = () => {
        setShowModal(false);
    };

    const onConfirmDelete = (id: number | undefined) => {
        if (typeof (id) !== 'undefined') {
            deleteAgency.delete(id, {
                onSuccess: () => {
                    setShowModal(false);
                    queryClient.removeQueries();
                    history.push('/agencies/');
                }
            });
        }
    }

    if (!agency.item) {
        return null;
    }

    return (
        <div ref={ref} className={props.className}>
            <div ref={ref} className={styles.item}>
                <Header title={agency.item?.name}/>
                <div className={styles.container}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Идентификтор</td>
                            <td>{agency.item.id}</td>
                        </tr>
                        <tr>
                            <td>Название</td>
                            <td>{agency.item.name}</td>
                        </tr>
                        <tr>
                            <td>Регион</td>
                            <td>{agency.item.region}</td>
                        </tr>
                        <tr>
                            <td>Дата создания</td>
                            <td>{format(new Date(agency.item.createdAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        <tr>
                            <td>Дата обновления</td>
                            <td>{format(new Date(agency.item.updatedAt), 'dd.MM.yyyy hh:mm:ss')}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className={styles.buttons}>
                        <Button state='primary'
                                onClick={() => history.push(`/agencies/update/${agency.item?.id}`)}>
                            Изменить
                        </Button>
                        <Button state='secondary' onClick={handleClickOnDelete}>
                            Удалить
                        </Button>
                    </div>
                    <Confirm showModal={showModal}
                             message='Удалить?'
                             onCancelClick={handleClickOnCancel}
                             onConfirmClick={() => onConfirmDelete(agency.item?.id)}/>
                </div>
            </div>
        </div>
    )
}

export const AgencyItem = React.forwardRef(AgencyItemInner);
