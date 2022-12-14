import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useGetItem, useUpdateItem} from '../../hooks';
import {useStores} from "../../stores/store";
import {Stop} from '../../models/stop';
import {Route} from '../../models/route';
import {Header} from '../controls/Header';
import {InputField} from '../controls/InputField';
import {SelectItems} from '../controls/SelectItems';
import {SectionHeader} from '../controls/SectionHeader';
import {Confirm} from "../controls/Confirm";
import styles from '../../index.module.scss';
import {format} from "date-fns";

type ErrorState = {
    name?: string,
    routeId?: string
}

const StopUpdateInner: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const getStop = useGetItem(id, Stop);
    const updateStop = useUpdateItem(Stop, id);

    const [stop, setStop] = React.useState(getStop.item);

    useEffect(() => {
        setStop(getStop.item);
    }, [getStop.item]);

    const [isValid, setValid] = useState(false);

    const [errors, setErrors] = useState<ErrorState>({
        name: undefined,
        routeId: undefined
    });

    const [serverError, setServerError] = useState('');

    const [showModal, setShowModal] = useState(false);

    const {networkStore} = useStores();

    useEffect(() => {
        networkStore.setLoading(updateStop.isLoading);
    }, [updateStop.isLoading]);

    useEffect(() => {
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')) {
            setValid(false);
            setShowModal(false);
        }
    }, [errors]);

    if (!stop) {
        return null;
    }

    const handleClickOnCancel = () => {
        setShowModal(false);
        setValid(false);
        setServerError('');
    };

    const handleSaveButtonClick = () => {
        Object.entries(stop).forEach(([key, value]) => {
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

        const createDate = format(new Date(stop.createdAt), 'yyyy-MM-dd hh:mm:ss');
        const updateDate = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        stop.createdAt = createDate;
        stop.updatedAt = updateDate;
        delete stop.route;

        updateStop.update(stop,
            {
                onSuccess: () => {
                    setShowModal(false);
                    history.push(`/stops/info/${id}`);
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

        setStop({...stop, [name]: value});
        setErrors(errors => ({...errors, [name]: undefined}));
        validate(name, value);
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
                setErrors(errors => ({...errors, [key]: '???????? ???? ?????????? ???????? ????????????...'}));
                setValid(false);
            }
        }
    };

    return (
        <div ref={ref} className={styles.container}>
            <Header title='????????????????'/>
            <div className={styles.card}>
                <form className={styles['form-layout']} onSubmit={event => onSubmit(event)}>
                    <SectionHeader className={styles.section} title='?????????? ????????????'/>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <InputField
                                onChange={onChange}
                                field={{key: 'name', text: '????????????????'}}
                                value={stop?.name}
                                required={true}
                                errorMessage={errors['name']}/>
                            <InputField
                                onChange={onChange}
                                field={{key: 'latitude', text: '????????????', type: 'number'}}
                                value={stop?.latitude}/>
                        </div>
                        <div className={styles.column}>
                            <SelectItems
                                label='????????????????'
                                onChange={id => onSelectChange('routeId', id)}
                                searchKey='name'
                                value={{id: stop.routeId, value: stop.route?.name ?? ''}}
                                required={true}
                                errorMessage={errors['routeId']}
                                model={Route}/>
                            <InputField
                                onChange={onChange}
                                field={{key: 'longitude', text: '??????????????', type: 'number'}}
                                value={stop?.longitude}/>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSaveButtonClick}>??????????????????</button>
                    </div>
                    <Confirm showModal={showModal}
                             message='??????????????????????' errorMessage={serverError}
                             onCancelClick={handleClickOnCancel} onConfirmClick={onConfirmButtonClick}/>
                </form>
            </div>
        </div>
    )
}

export const StopUpdate = React.forwardRef(StopUpdateInner);
