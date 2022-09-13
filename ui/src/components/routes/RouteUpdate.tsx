import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useGetItem, useUpdateItem} from '../../hooks';
import {useStores} from "../../stores/store";
import {Route as Line} from '../../models/route';
import {Agency} from '../../models/agency';
import {VehicleType} from '../../models/vehicleType';
import {RouteCategory} from '../../models/routeCategory';
import {Header} from '../controls/Header';
import {InputField} from '../controls/InputField';
import {SelectItems} from '../controls/SelectItems';
import {SectionHeader} from '../controls/SectionHeader';
import {Confirm} from "../controls/Confirm";
import styles from '../../index.module.scss';
import {format} from "date-fns";

type ErrorState = {
    name?: string,
    routeCategoryId?: string,
    vehicleTypeId?: string,
    agencyId?: string
}

const RouteUpdateInner: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const getRoute = useGetItem(id, Line);
    const updateRoute = useUpdateItem(Line, id);

    const [route, setRoute] = React.useState(getRoute.item);

    const {networkStore} = useStores();

    useEffect(() => {
        networkStore.setLoading(updateRoute.isLoading);
    }, [updateRoute.isLoading]);

    useEffect(() => {
        setRoute(getRoute.item);
    }, [getRoute.item]);

    const [isValid, setValid] = useState(false);

    const [errors, setErrors] = useState<ErrorState>({
        name: undefined,
        routeCategoryId: undefined,
        vehicleTypeId: undefined,
        agencyId: undefined
    });

    const [serverError, setServerError] = useState('');

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')) {
            setValid(false);
            setShowModal(false);
        }
    }, [errors]);

    if (!route) {
        return null;
    }

    const handleClickOnCancel = () => {
        setShowModal(false);
        setValid(false);
        setServerError('');
    };

    const handleSaveButtonClick = () => {
        Object.entries(route).forEach(([key, value]) => {
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

        const createDate = format(new Date(route.createdAt), 'yyyy-MM-dd hh:mm:ss');
        const updateDate = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        route.createdAt = createDate;
        route.updatedAt = updateDate;
        delete route.routeCategory;
        delete route.agency;
        delete route.vehicleType;

        updateRoute.update(route,
            {
                onSuccess: () => {
                    setShowModal(false);
                    history.push(`/routes/info/${id}`);
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

        setRoute({...route, [name]: value});
        setErrors(errors => ({...errors, [name]: undefined}));
        validate(name, value);
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
            <Header title='Изменить'/>
            <div className={styles.card}>
                <form className={styles['form-layout']} onSubmit={event => onSubmit(event)}>
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
                                value={{id: route.routeCategoryId, value: route.routeCategory?.name ?? ''}}
                                errorMessage={errors['routeCategoryId']}
                                model={RouteCategory}/>
                        </div>
                        <div className={styles.column}>
                            <SelectItems
                                label={'Типы ПЕ'}
                                onChange={id => onSelectChange('vehicleTypeId', id)}
                                searchKey='name'
                                required={true}
                                value={{id: route.vehicleTypeId, value: route.vehicleType?.name ?? ''}}
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
                                value={{id: route.agencyId, value: route.agency?.name ?? ''}}
                                errorMessage={errors['agencyId']}
                                model={Agency}/>
                        </div>
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

export const RouteUpdate = React.forwardRef(RouteUpdateInner);
