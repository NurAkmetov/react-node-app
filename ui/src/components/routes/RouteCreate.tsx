import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {useCreateItem} from '../../hooks';
import {useStores} from "../../stores/store";
import {Route as Line} from '../../models/route';
import {Agency} from '../../models/agency';
import {VehicleType} from '../../models/vehicleType';
import {RouteCategory} from '../../models/routeCategory';
import {InputField} from '../controls/InputField';
import {SelectItems} from '../controls/SelectItems';
import {Header} from '../controls/Header';
import {SectionHeader} from '../controls/SectionHeader';
import {Confirm} from "../controls/Confirm";
import classNames from 'classnames';
import styles from '../../styles/Form.module.scss';

type ErrorState = {
    name?: string,
    routeCategoryId?: string,
    vehicleTypeId?: string,
    agencyId?: string
}

const RouteAddInner: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
    const history = useHistory();
    const createRoute = useCreateItem(Line);

    const [route, setRoute] = useState<Line>(new Line());

    const [isValid, setValid] = useState(false);

    const [errors, setErrors] = useState<ErrorState>({
        name: undefined,
        routeCategoryId: undefined,
        vehicleTypeId: undefined,
        agencyId: undefined
    });

    const [serverError, setServerError] = useState('');

    const [showModal, setShowModal] = useState(false);

    const {networkStore} = useStores();

    useEffect(() => {
        networkStore.setLoading(createRoute.isLoading);
    }, [createRoute.isLoading]);

    useEffect(() => {
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')) {
            setValid(false);
            setShowModal(false);
        }
    }, [errors]);

    const handleClickOnSave = () => {
        Object.entries(route).forEach(([key, value]) => {
            validate(key, value);
        })
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')
            || Object.values(route).every(value => typeof (value) === 'undefined')) {
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

        createRoute.add(route,
            {
                onSuccess: () => {
                    setShowModal(false);
                    history.push('/routes');
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

        setRoute({...route, [name]: value});

        if (Object.keys(errors).includes(name)) {
            setErrors(errors => ({...errors, [name]: undefined}));
            validate(name, value);
        }
    }

    const onSelectChange = (key: string, id?: number) => {
        setRoute({...route, [key]: id});
        setErrors(errors => ({...errors, [key]: undefined}));
        validate(key, id);
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
                        <div className={styles.column}>
                            <InputField
                                onChange={onChange}
                                field={{key: 'name', text: 'Название'}}
                                value={route?.name}
                                required={true}
                                errorMessage={errors['name']}/>
                            <InputField
                                onChange={onChange}
                                field={{key: 'direction', text: 'Направление'}}
                                value={route?.direction}/>
                            <SelectItems
                                label={'Категории'}
                                onChange={id => onSelectChange('routeCategoryId', id)}
                                searchKey='name'
                                required={true}
                                errorMessage={errors['routeCategoryId']}
                                model={RouteCategory}/>
                        </div>
                        <div className={styles.column}>
                            <SelectItems
                                label={'Типы ПЕ'}
                                onChange={id => onSelectChange('vehicleTypeId', id)}
                                searchKey='name'
                                required={true}
                                errorMessage={errors['vehicleTypeId']}
                                model={VehicleType}/>
                            <InputField
                                onChange={onChange}
                                field={{key: 'distance', text: 'Расстояние'}}
                                value={route?.distance}/>
                            <SelectItems
                                label={'Перевозчики'}
                                onChange={id => onSelectChange('agencyId', id)}
                                searchKey='name'
                                required={true}
                                errorMessage={errors['agencyId']}
                                model={Agency}/>
                        </div>
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

export const RouteCreate = React.forwardRef(RouteAddInner);
