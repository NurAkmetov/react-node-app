import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {useCreateItem} from '../../hooks';
import {RouteCategory} from '../../models/routeCategory';
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

const RouteCategoryAddInner: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
    const history = useHistory();
    const createRouteCategory = useCreateItem(RouteCategory);

    const [routeCategory, setRouteCategory] = useState<RouteCategory>(new RouteCategory());

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

    const handleClickOnSave = () => {
        Object.entries(routeCategory).forEach(([key, value]) => {
            validate(key, value);
        })
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')
            || Object.values(routeCategory).every(value => typeof (value) === 'undefined')) {
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

        createRouteCategory.add(routeCategory,
            {
                onSuccess: () => {
                    setShowModal(false);
                    history.push('/routeCategories');
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

        setRouteCategory({...routeCategory, [name]: value});

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
                            value={routeCategory?.name}
                            required={true}
                            errorMessage={errors['name']}/>
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

export const RouteCategoryCreate = React.forwardRef(RouteCategoryAddInner);
