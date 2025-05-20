type Props ={
        title: string
    onClickHandler?: () => void
    filterClassName?: string
}

export const Button = ({title, onClickHandler, filterClassName}:Props) => {
    return (
        <button className={filterClassName} onClick={onClickHandler}>{title}</button>
    );
};

