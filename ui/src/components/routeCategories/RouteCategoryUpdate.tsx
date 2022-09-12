import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useGetItem, useUpdateItem} from '../../hooks';
import {RouteCategory} from '../../models/routeCategory';
import {Header} from '../controls/Header';
import {InputField} from '../controls/InputField';
import {SectionHeader} from '../controls/SectionHeader';
import {Confirm} from "../controls/Confirm";
import {format} from "date-fns";
import styles from '../../index.module.scss';

type ErrorState = {
    name?: string,
}

const RouteCategoryUpdateInner: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const getRouteCategory = useGetItem(id, RouteCategory);
    const updateRouteCategory = useUpdateItem(RouteCategory, id);

    const [routeCategory, setAgency] = React.useState(getRouteCategory.item);

    useEffect(() => {
        setAgency(getRouteCategory.item);
    }, [getRouteCategory.item]);

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

    if (!routeCategory) {
        return null;
    }

    const handleClickOnCancel = () => {
        setShowModal(false);
        setValid(false);
        setServerError('');
    };

    const handleSaveButtonClick = () => {
        Object.entries(routeCategory).forEach(([key, value]) => {
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

        const createdDate = format(new Date(routeCategory.createdAt), 'yyyy-MM-dd hh:mm:ss');
        const updatedDate = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        routeCategory.createdAt = createdDate;
        routeCategory.updatedAt = updatedDate;

        updateRouteCategory.update(routeCategory,
            {
                onSuccess: () => {
                    setShowModal(false);
                    history.push(`/routeCategories/info/${id}`);
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

        setAgency({...routeCategory, [name]: value});
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
                            value={routeCategory?.name}
                            required={true}
                            errorMessage={errors['name']}/>
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

export const RouteCategoryUpdate = React.forwardRef(RouteCategoryUpdateInner);
