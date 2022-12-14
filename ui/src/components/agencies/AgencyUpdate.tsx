import * as React from 'react';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useGetItem, useUpdateItem} from '../../hooks';
import {Agency} from '../../models/agency';
import {Header} from '../controls/Header';
import {InputField} from '../controls/InputField';
import {SectionHeader} from '../controls/SectionHeader';
import {Confirm} from "../controls/Confirm";
import {format} from "date-fns";
import {useStores} from "../../stores/store";
import styles from '../../index.module.scss';

type ErrorState = {
    name?: string,
}

const AgencyUpdateInner: React.ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {
    const history = useHistory();
    const {id} = useParams<any>();
    const getAgency = useGetItem(id, Agency);
    const updateAgency = useUpdateItem(Agency, id);

    const [agency, setAgency] = React.useState(getAgency.item);

    useEffect(() => {
        setAgency(getAgency.item);
    }, [getAgency.item]);

    const [isValid, setValid] = useState(false);

    const [errors, setErrors] = useState<ErrorState>({
        name: undefined,
    });

    const [serverError, setServerError] = useState('');

    const [showModal, setShowModal] = useState(false);

    const {networkStore} = useStores();

    useEffect(() => {
        networkStore.setLoading(updateAgency.isLoading);
    }, [updateAgency.isLoading]);

    useEffect(() => {
        if (Object.values(errors).some(value => typeof (value) !== 'undefined')) {
            setValid(false);
            setShowModal(false);
        }
    }, [errors]);

    if (!agency) {
        return null;
    }

    const handleClickOnCancel = () => {
        setShowModal(false);
        setValid(false);
        setServerError('');
    };

    const handleSaveButtonClick = () => {
        Object.entries(agency).forEach(([key, value]) => {
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

        const createdDate = format(new Date(agency.createdAt), 'yyyy-MM-dd hh:mm:ss');
        const updatedDate = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        agency.createdAt = createdDate;
        agency.updatedAt = updatedDate;

        updateAgency.update(agency,
            {
                onSuccess: () => {
                    setShowModal(false);
                    history.push(`/agencies/info/${id}`);
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

        setAgency({...agency, [name]: value});
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
                        <InputField
                            onChange={onChange}
                            field={{key: 'name', text: '????????????????'}}
                            value={agency?.name}
                            required={true}
                            errorMessage={errors['name']}/>
                        <InputField
                            onChange={onChange}
                            field={{key: 'region', text: '????????????'}}
                            value={agency?.region}/>
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

export const AgencyUpdate = React.forwardRef(AgencyUpdateInner);
