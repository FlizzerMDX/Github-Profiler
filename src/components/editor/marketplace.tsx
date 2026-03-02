import { getModules } from "@/services/marketplace";
import { User } from "@/types";
import { Modules } from "@/types/modules";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ComponantColorPicker from "../marketplace/color-picker";

const MarketPlace = ({...props}) =>{

    const { data: session } = useSession();
    const [user, setUser] = useState<User>(session?.user as User);
    const [modules, setModules] = useState<Modules>();

    const call = async() => {
        const content = await getModules();
        setModules(content);
    };
    useEffect(() => {
        call();
    }, []);

    return(
        <div {...props}>
            MarketPlace - Coming Soon
            {modules?.modules?.map(
                (module) => {
                    return(
                        <div key={module.key}>
                            <span>
                                {module?.name}
                            </span>
                            <img
                                alt={module?.description}
                                src={`${module?.link}?${module.params[0].key}=${user.username}`}
                            />
                            <ComponantColorPicker/>
                        </div>
                    )
                })}
        </div>
    )
};

export default MarketPlace;