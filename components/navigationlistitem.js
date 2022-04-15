const NavigationListItem = (props) => {
    return (
        <li>
            <a href="#"
               className="flex items-center space-x-3 ">
                <span>{props.itemname}</span>
            </a>
        </li>
    );
}

export default NavigationListItem;