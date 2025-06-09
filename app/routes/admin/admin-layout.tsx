import React from 'react'
import { Outlet } from 'react-router'

const AdminLayout = () => {
    return (
        <div className='admin-layout'>admin-layout

            <aside className='children'>
                <Outlet />
            </aside>

        </div>
    )
}

export default AdminLayout