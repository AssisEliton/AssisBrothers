import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }: { component: React.FC }) => {
    const location = useLocation();
    const [canAcess, setCanAcess] = useState(true);

    useEffect(() => {
        const permissions = new Map()
            .set("admin", 1)
            .set("mechanic", 2)
            .set("washer", 3)
            .set("user", 4)
            .set("master", 5)
            .set("conference", 6)
            .set("finance", 7);

        const modulesPermission = new Map()
            .set("/conferencia/checklist", [6, 5])
            .set("/conferencia/itens", [5]);

        const fetchRole = async () => {


            // const obj = await permissionService.getUSerPermissions({ user: user[0].Id })

            //  const roles = [...obj].map(data => (data?.role || null));

            //   for (let role of roles) {

            //     if (!role)
            //       continue;

            //     const permission = permissions.get(role);
            //     const HasRole = modulesPermission.get(location.pathname)

            //     //se nao for rota protegida
            //     if(!HasRole){
            //       setCanAcess(true)
            //       break;
            //     }

            //     //se  for rota protegida
            //     if ([...HasRole].some(cod => cod === permission) ){
            //       setCanAcess(true)
            //       break;
            //     }
            //     setCanAcess(false) 
            //   }
        }


        fetchRole();
    }, [location])

    function redirect() {
        // if (!user)
        //  return (<Navigate to="/login" state={{ from: location }} replace />)

        if (canAcess)
            return (<Component />)
        else
            return <Navigate to="/403" />

    }



    return redirect()

};

export default ProtectedRoute;
