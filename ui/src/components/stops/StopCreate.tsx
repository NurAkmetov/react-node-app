import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {useCreateItem} from '../../hooks';
import {useStores} from "../../stores/store";
import {Stop} from '../../models/stop';
import {Route} from '../../models/route';
import {InputField} from '../controls/InputField';
import {SelectItems} from '../controls/SelectItems';
import {Header} from '../controls/Header';
import {SectionHeader} from '../controls/SectionHeader';
import {Confirm} from "../controls/Confirm";
import classNames from 'classnames';
import styles from '../../styles/Form.module.scss';

type ErrorState = {
    name?: string,
    routeId?: string
}

const StopAddInner: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
    const history = useHistory();
    const createStop = useCreateItem(Stop);

    const [stop, setStop] = useState<Stop>(new Stop());

    const [isValid, setValid] = useState(false);

    const [errors, setErrors] = useState<ErrorState>({
        name: undefined,
        routeId: undefined
    });

    const [serverError, setServerError] = useState('');

    const [showModal, setShowModal] = useState(false);

    const {networkStore} = useStores();

    useEffect(() => {
        networkStore.setLoading(createStop.isLoading);
    }, [createStop.isLoading]);

    useEffect(() => {
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')) {
            setValid(false);
            setShowModal(false);
        }
    }, [errors]);

    const handleClickOnSave = () => {
        Object.entries(stop).forEach(([key, value]) => {
            validate(key, value);
        })
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')
            || Object.values(stop).every(value => typeof (value) === 'undefined')) {
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

        createStop.add(stop,
            {
                onSuccess: () => {
                    setShowModal(false);
                    history.push('/stops');
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

        setStop({...stop, [name]: value});

        if (Object.keys(errors).includes(name)) {
            setErrors(errors => ({...errors, [name]: undefined}));
            validate(name, value);
        }
    }

    const onSelectChange = (key: string, id?: number) => {
        setStop({...stop, [key]: id});
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
                                value={stop?.name}
                                required={true}
                                errorMessage={errors['name']}/>
                            <InputField
                                onChange={onChange}
                                field={{key: 'latitude', text: 'Широта', type: 'number'}}
                                value={stop?.latitude}/>
                        </div>
                        <div className={styles.column}>
                            <SelectItems
                                label={'Маршруты'}
                                onChange={id => onSelectChange('routeId', id)}
                                searchKey='name'
                                required={true}
                                errorMessage={errors['routeId']}
                                model={Route}/>
                            <InputField
                                onChange={onChange}
                                field={{key: 'longitude', text: 'Долгота', type: 'number'}}
                                value={stop?.longitude}/>
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

export const StopCreate = React.forwardRef(StopAddInner);
