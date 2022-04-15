const NavigationListItem = (props) => {
    return (
        <li>
            <a href="#"
               className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline">
                <span>{props.itemname}</span>
            </a>
        </li>
    );
}

export default NavigationListItem;