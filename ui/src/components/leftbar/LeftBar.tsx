import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LeftBarButton } from './LeftBarButton';
import classNames from 'classnames';
import styles from './LeftBar.module.scss';

interface IProps {
    readonly className?: string;
}

const LeftBarInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    const menuRef = React.createRef<HTMLDivElement>();

    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;

    const agenciesPath = '/agencies';
    const routeCategoryPath = '/routeCategoryPath';
    const vehicleTypesPath = '/vehicleTypes';
    const stopsPath = '/stops';
    const routePath = '/routes';

    return (
        <div ref={ref} className={classNames(styles['left-bar'], props.className)}>
            <div ref={menuRef} className={styles.menu}>
                <div className={styles.header}>
                    <div className={styles['menu-text']}>Меню</div>
                </div>
                <LeftBarButton onClick={() => history.push(agenciesPath)} isSelected={pathname === agenciesPath}>
                    Перевозчики
                </LeftBarButton>
                <LeftBarButton onClick={() => history.push(routePath)} isSelected={pathname === routePath}>
                    Маршруты
                </LeftBarButton>
                <LeftBarButton onClick={() => history.push(routeCategoryPath)} isSelected={pathname === routeCategoryPath}>
                    Категории
                </LeftBarButton>
                <LeftBarButton onClick={() => history.push(vehicleTypesPath)} isSelected={pathname === vehicleTypesPath}>
                    Типы ПЕ
                </LeftBarButton>
                <LeftBarButton onClick={() => history.push(stopsPath)} isSelected={pathname === stopsPath}>
                    Остановки
                </LeftBarButton>
            </div>
        </div>
    );
}

export const LeftBar = React.forwardRef(LeftBarInner);

