import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useGetItem, useUpdateItem} from '../../hooks';
import {useStores} from "../../stores/store";
import {VehicleType} from '../../models/vehicleType';
import {Header} from '../controls/Header';
import {InputField} from '../controls/InputField';
import {SectionHeader} from '../controls/SectionHeader';
import {Confirm} from "../controls/Confirm";
import styles from '../../index.module.scss';
import {format} from "date-fns";

type ErrorState = {
    name?: string,
}

const VehicleTypeUpdateInner: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const getVehicleType = useGetItem(id, VehicleType);
    const updateVehicleType = useUpdateItem(VehicleType, id);

    const [vehicleType, setVehicleType] = React.useState(getVehicleType.item);

    const {networkStore} = useStores();

    useEffect(() => {
        networkStore.setLoading(updateVehicleType.isLoading);
    }, [updateVehicleType.isLoading]);

    useEffect(() => {
        setVehicleType(getVehicleType.item);
    }, [getVehicleType.item]);

    const [isValid, setValid] = useState(false);

    const [errors, setErrors] = useState<ErrorState>({
        name: undefined,
    });

    const [serverError, setServerError] = useState('');

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')) {
            setValid(false);
            setShowModal(false);
        }
    }, [errors]);

    if (!vehicleType) {
        return null;
    }

    const handleClickOnCancel = () => {
        setShowModal(false);
        setValid(false);
        setServerError('');
    };

    const handleSaveButtonClick = () => {
        Object.entries(vehicleType).forEach(([key, value]) => {
            validate(key, value);
        })

        if (Object.values(errors).some(value => typeof (value) !== 'undefined')) {
            setValid(false);
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValid || !id) {
            return;
        }

        const createDate = format(new Date(vehicleType.createdAt), 'yyyy-MM-dd hh:mm:ss');
        const updateDate = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        vehicleType.createdAt = createDate;
        vehicleType.updatedAt = updateDate;

        updateVehicleType.update(vehicleType,
            {
                onSuccess: () => {
                    setShowModal(false);
                    history.push(`/vehicleTypes/info/${id}`);
                },
                onError: error => {
                    const fetchError = error as any;
                    setServerError(fetchError.response.data.message);
                    setValid(false);
                }
            });
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        setVehicleType({...vehicleType, [name]: value});
        setErrors(errors => ({...errors, [name]: undefined}));
        validate(name, value);
    }

    const onConfirmButtonClick = () => {
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')) {
            setValid(false);
        } else {
            setValid(true);
        }
    }

    const validate = (key: string, value: any) => {
        if (Object.keys(errors).includes(key)) {
            if (!value) {
                setErrors(errors => ({...errors, [key]: 'Поле не может быть пустым...'}));
                setValid(false);
            }
        }
    };

    return (
        <div ref={ref} className={styles.container}>
            <Header title='Изменить'/>
            <div className={styles.card}>
                <form className={styles['form-layout']} onSubmit={event => onSubmit(event)}>
                    <SectionHeader className={styles.section} title='Общие данные'/>
                    <div className={styles.row}>
                        <InputField
                            onChange={onChange}
                            field={{key: 'name', text: 'Название'}}
                            value={vehicleType?.name}
                            required={true}
                            errorMessage={errors['name']}/>
                        <InputField
                            onChange={onChange}
                            field={{key: 'price', text: 'Стоимость'}}
                            value={vehicleType.price}/>
                    </div>
                    <div>
                        <button onClick={handleSaveButtonClick}>Сохранить</button>
                    </div>
                    <Confirm showModal={showModal}
                             message='Подтвердить' errorMessage={serverError}
                             onCancelClick={handleClickOnCancel} onConfirmClick={onConfirmButtonClick}/>
                </form>
            </div>
        </div>
    )
}

export const VehicleTypeUpdate = React.forwardRef(VehicleTypeUpdateInner);
