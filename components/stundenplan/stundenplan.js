import moment from 'moment';
import 'moment/locale/de';
import React, {useEffect, useState} from 'react';
import {getStundenplanApiData} from "../../services/stundenplanservice";
import Loader from "../loader";
import StundenplanTableHeader from "./stundenplantableheader";
import StundenplanTableBodyItem from "./stundenplantablebodyitem";




const Stundenplan = () => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        moment.locale('de');
        const handleSubmit = async () => {
            setApiData(await getStundenplanApiData().then(setLoading(false)))
        }
        handleSubmit()
    }, [])


    return (loading ? <Loader/> :
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <StundenplanTableHeader/>
                                <tbody>
                                {apiData.map((item, index) => {
                                    return (
                                        <StundenplanTableBodyItem
                                            key={index}
                                            index={index}
                                            item={item}/>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    );

}

export default Stundenplan;