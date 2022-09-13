import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {useCreateItem} from '../../hooks';
import {useStores} from "../../stores/store";
import {VehicleType} from '../../models/vehicleType';
import {InputField} from '../controls/InputField';
import {Header} from '../controls/Header';
import {SectionHeader} from '../controls/SectionHeader';
import {Confirm} from "../controls/Confirm";
import classNames from 'classnames';
import styles from '../../styles/Form.module.scss';

type ErrorState = {
    name?: string,
    stopId?: string
}

const VehicleTypeAddInner: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
    const history = useHistory();
    const createVehicleType = useCreateItem(VehicleType);

    const [vehicleType, setVehicleType] = useState<VehicleType>(new VehicleType());

    const [isValid, setValid] = useState(false);

    const [errors, setErrors] = useState<ErrorState>({
        name: undefined,
    });

    const [serverError, setServerError] = useState('');

    const [showModal, setShowModal] = useState(false);

    const {networkStore} = useStores();

    useEffect(() => {
        networkStore.setLoading(createVehicleType.isLoading);
    }, [createVehicleType.isLoading]);

    useEffect(() => {
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')) {
            setValid(false);
            setShowModal(false);
        }
    }, [errors]);

    const handleClickOnSave = () => {
        Object.entries(VehicleType).forEach(([key, value]) => {
            validate(key, value);
        })
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')
            || Object.values(VehicleType).every(value => typeof (value) === 'undefined')) {
            setValid(false);
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    };

    const handleClickOnCancel = () => {
        setShowModal(false);
        setValid(false);
        setServerError('');
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValid) {
            return;
        }

        createVehicleType.add(vehicleType,
            {
                onSuccess: () => {
                    setShowModal(false);
                    history.push('/vehicleTypes');
                },
                onError: error => {
                    const fetchError = error as any;
                    setServerError(fetchError.response.data.message);
                    setValid(false);
                }
            });
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = event.currentTarget.name;
        const inputEvent = event as React.ChangeEvent<HTMLInputElement>;
        const value = event.currentTarget.type === 'checkbox'
            ? inputEvent.target.checked
            : event.currentTarget.value;

        setVehicleType({...vehicleType, [name]: value});

        if (Object.keys(errors).includes(name)) {
            setErrors(errors => ({...errors, [name]: undefined}));
            validate(name, value);
        }
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
            <Header title='Добавить'/>
            <div className={styles.card}>
                <form className={classNames(styles['form-layout'])} onSubmit={event => onSubmit(event)}
                      autoComplete='off'>
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
                            value={vehicleType?.price}/>
                    </div>
                    <div>
                        <button onClick={handleClickOnSave}>Сохранить</button>
                    </div>
                    <Confirm showModal={showModal}
                             message='Подтвердить' errorMessage={serverError}
                             onCancelClick={handleClickOnCancel} onConfirmClick={onConfirmButtonClick}/>
                </form>
            </div>
        </div>
    )
}

export const VehicleTypeCreate = React.forwardRef(VehicleTypeAddInner);
