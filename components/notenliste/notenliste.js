import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {getNotenApiData} from "../../services/notenservice";
import Loader from "../loader";
import NotenlisteTableHeader from "./notenlistetableheader";
import NotenlisteTableBodyItem from "./notenlistetablebodyitem";


const Notenliste = () => {
    const {data: session} = useSession()
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleSubmit = async () => {
            setApiData(await getNotenApiData(session).then(setLoading(false)))
        }
        handleSubmit()
    }, [session])


    return (loading ? <Loader/> :
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <NotenlisteTableHeader/>
                                <tbody>
                                {apiData.map((item, index) => {
                                    return (
                                        <NotenlisteTableBodyItem
                                            key={item.lehrveranstaltung}
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

export default Notenliste;